export default function Logo() {
  return (
    <div className="flex items-center gap-3">
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-8 w-8"
      >
        <defs>
          <radialGradient
            id="haloGradient"
            cx="50%"
            cy="50%"
            r="50%"
            fx="50%"
            fy="50%"
          >
            <stop offset="0%" stopColor="hsl(var(--primary) / 0.5)" />
            <stop offset="70%" stopColor="hsl(193 100% 50% / 0.3)" />
            <stop offset="100%" stopColor="hsl(193 100% 50% / 0)" />
          </radialGradient>
        </defs>
        <rect width="32" height="32" rx="8" fill="hsl(var(--primary) / 0.1)" />
        <circle cx="16" cy="16" r="14" fill="url(#haloGradient)" />
        <path
          d="M16 11C14.3431 11 13 12.3431 13 14C13 15.6569 14.3431 17 16 17C17.6569 17 19 15.6569 19 14C19 12.3431 17.6569 11 16 11Z"
          fill="hsl(var(--primary))"
        />
        <path
          d="M22 23C22 20.2386 19.3137 18 16 18C12.6863 18 10 20.2386 10 23"
          fill="hsl(var(--primary))"
          stroke="hsl(var(--primary))"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <rect width="32" height="32" rx="8" stroke="hsl(var(--border))" />
      </svg>
      <span className="text-xl font-bold tracking-tighter text-foreground">
        Aura
      </span>
    </div>
  );
}
