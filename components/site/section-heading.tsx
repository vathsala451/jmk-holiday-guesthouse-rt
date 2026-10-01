import { cn } from '@/lib/utils'

export function SectionHeading({
  id,
  eyebrow,
  title,
  description,
  dark = false,
  center = false,
}: {
  id: string
  eyebrow: string
  title: string
  description?: string
  dark?: boolean
  center?: boolean
}) {
  return (
    <div className={cn('flex max-w-2xl flex-col gap-3', center && 'mx-auto items-center')}>
      <p className={cn('text-xs font-semibold uppercase tracking-[0.2em]', dark ? 'text-lantern' : 'text-slate')}>
        {eyebrow}
      </p>
      <h2
        id={id}
        className={cn(
          'text-balance font-serif text-4xl font-medium leading-tight sm:text-5xl',
          dark ? 'text-mist' : 'text-moss',
        )}
      >
        {title}
      </h2>
      {description && (
        <p className={cn('text-pretty leading-relaxed', dark ? 'text-mist/80' : 'text-muted-foreground')}>
          {description}
        </p>
      )}
    </div>
  )
}

export function HillDivider({ flip = false }: { flip?: boolean }) {
  return (
    <div aria-hidden="true" className={cn('relative z-10 h-20 w-full overflow-hidden sm:h-28', flip && 'rotate-180')}>
      <svg viewBox="0 0 1440 120" preserveAspectRatio="none" className="absolute inset-x-0 bottom-0 h-full w-full -translate-y-3">
        <path
          d="M0 80 C 180 30 320 60 480 45 C 660 28 800 70 980 50 C 1160 30 1300 55 1440 40 L1440 120 L0 120 Z"
          fill="#5b7083"
          fillOpacity="0.18"
        />
      </svg>
      <svg viewBox="0 0 1440 120" preserveAspectRatio="none" className="absolute inset-x-0 bottom-0 h-full w-full -translate-y-1.5">
        <path
          d="M0 95 C 220 60 360 90 560 70 C 760 50 900 95 1100 78 C 1260 64 1360 80 1440 72 L1440 120 L0 120 Z"
          fill="#1f3d2f"
          fillOpacity="0.28"
        />
      </svg>
      <svg viewBox="0 0 1440 120" preserveAspectRatio="none" className="absolute inset-x-0 bottom-0 h-full w-full">
        <path
          d="M0 110 C 240 88 420 112 640 98 C 860 84 1020 112 1240 100 C 1340 94 1400 100 1440 98 L1440 120 L0 120 Z"
          fill="#1f3d2f"
        />
      </svg>
    </div>
  )
}
