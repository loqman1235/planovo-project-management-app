import { auth } from "@/auth";
import { redirect } from "next/navigation";

const Home = async () => {
  const session = await auth();

  if (!session?.user) redirect("/sign-in");

  return (
    <div>
      <h1>Homepage</h1>
      <div>Hello {session.user.name}</div>
    </div>
  );
};
export default Home;
