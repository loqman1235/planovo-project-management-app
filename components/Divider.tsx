export const Divider = () => {
  return (
    <div
      className="w-full h-px my-5"
      style={{
        background:
          "repeating-linear-gradient(to right, hsl(var(--border-light)), hsl(var(--border-light)) 2px, transparent 2px, transparent 4px);",
      }}
    />
  );
};
