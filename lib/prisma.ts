import { PrismaClient } from "@prisma/client";
import { Pool, neonConfig } from "@neondatabase/serverless";
import { PrismaNeon } from "@prisma/adapter-neon";

// Skip WebSocket configuration during build
const isBuild = process.env.NEXT_PHASE === "phase-production-build";

if (!isBuild) {
  neonConfig.poolQueryViaFetch = true;
}

const prismaClientSingleton = () => {
  // During build, use standard Prisma client
  if (isBuild || !process.env.DATABASE_URL) {
    return new PrismaClient();
  }

  // In runtime, use Neon adapter
  try {
    const connectionString = process.env.DATABASE_URL;
    const pool = new Pool({ connectionString });
    const adapter = new PrismaNeon(pool);
    return new PrismaClient({ adapter });
  } catch (error) {
    console.error("Neon adapter error:", error);
    return new PrismaClient();
  }
};

declare const globalThis: {
  prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== "production") globalThis.prismaGlobal = prisma;
