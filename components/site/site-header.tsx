import { BedDouble, CalendarCheck, Images, MapPin, Phone, Sparkles, Star } from 'lucide-react'
import { PHONE_TEL } from '@/lib/site'

const links = [
  { href: '#amenities', label: 'Amenities', icon: Sparkles },
  { href: '#rooms', label: 'Rooms', icon: BedDouble },
  { href: '#gallery', label: 'Gallery', icon: Images },
  { href: '#reviews', label: 'Reviews', icon: Star },
  { href: '#location', label: 'Location', icon: MapPin },
  { href: '#book', label: 'Book Stay', icon: CalendarCheck },
]

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-mist/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <a href="#top" className="font-serif text-lg font-semibold leading-tight text-moss">
          JMK <span className="font-normal italic">Holiday Guest House</span>
        </a>
        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-5 text-sm font-medium text-moss/80">
            {links.map(({ href, label, icon: Icon }) => (
              <li key={href}>
                <a
                  href={href}
                  className="inline-flex items-center gap-1.5 transition-colors hover:text-moss focus-visible:underline"
                >
                  <Icon className="size-4" aria-hidden="true" />
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <a
          href={PHONE_TEL}
          className="inline-flex items-center gap-2 rounded-full bg-moss px-4 py-2 text-sm font-medium text-mist transition-colors hover:bg-moss/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
        >
          <Phone className="size-4" aria-hidden="true" />
          Call
        </a>
      </div>
      <nav aria-label="Sections" className="border-t border-border/60 lg:hidden">
        <ul className="flex gap-2 overflow-x-auto px-4 py-2 text-sm font-medium text-moss/80 [scrollbar-width:none]">
          {links.map(({ href, label, icon: Icon }) => (
            <li key={href} className="shrink-0">
              <a href={href} className="inline-flex items-center gap-1.5 rounded-full bg-card px-3 py-1.5">
                <Icon className="size-3.5" aria-hidden="true" />
                {label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
