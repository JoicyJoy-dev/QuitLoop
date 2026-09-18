export function AmbientGlow() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute -top-32 left-1/4 h-[540px] w-[540px] rounded-full bg-primary/10 blur-[140px]" />
      <div className="absolute top-96 right-10 h-[420px] w-[420px] rounded-full bg-tertiary-container/10 blur-[130px]" />
      <div className="absolute top-[1600px] left-12 h-[600px] w-[600px] rounded-full bg-secondary-container/15 blur-[160px]" />
    </div>
  );
}
