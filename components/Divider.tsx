export const Divider = () => {
  return (
    <div
      className="w-full h-px my-5"
      style={{
        background:
          "repeating-linear-gradient(to right, hsl(var(--border)), hsl(var(--border)) 4px, transparent 4px, transparent 8px);",
      }}
    />
  );
};
