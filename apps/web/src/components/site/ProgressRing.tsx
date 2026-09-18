export function ProgressRing({
  value,
  max,
  size = 192,
  label,
  caption,
}: {
  value: number;
  max: number;
  size?: number;
  label: string;
  caption: string;
}) {
  const radius = 50;
  const inner = 38;
  const circ = 2 * Math.PI * radius;
  const innerCirc = 2 * Math.PI * inner;
  const progress = Math.min(1, value / max);

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg className="h-full w-full -rotate-90" viewBox="0 0 120 120">
        <circle
          cx="60"
          cy="60"
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth="8"
          className="text-surface-container-highest opacity-40"
        />
        <circle
          cx="60"
          cy="60"
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={circ}
          strokeDashoffset={circ * (1 - progress)}
          className="text-primary"
        />
        <circle
          cx="60"
          cy="60"
          r={inner}
          fill="none"
          stroke="currentColor"
          strokeWidth="6"
          className="text-surface-container-highest opacity-30"
        />
        <circle
          cx="60"
          cy="60"
          r={inner}
          fill="none"
          stroke="currentColor"
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray={innerCirc}
          strokeDashoffset={innerCirc * 0.3}
          className="text-secondary"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <span className="font-display text-2xl font-bold text-on-surface">
          {value}
          <span className="text-sm font-normal text-on-surface-variant"> / {max}</span>
        </span>
        <span className="text-[11px] font-semibold text-primary">{caption}</span>
        <span className="sr-only">{label}</span>
      </div>
    </div>
  );
}
