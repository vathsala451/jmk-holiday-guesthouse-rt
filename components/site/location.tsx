import { CalendarDays, MapPin, MessageCircle, Navigation, Phone } from 'lucide-react'
import { ADDRESS, MAPS_URL, PHONE_DISPLAY, PHONE_TEL, WHATSAPP_URL } from '@/lib/site'
import { SectionHeading } from './section-heading'

export function Location() {
  return (
    <section id="location" aria-labelledby="location-title" className="relative z-10 mx-auto max-w-6xl px-4 py-20 sm:px-6">
      <SectionHeading id="location-title" eyebrow="Location" title="Find us near Eco Park, Sohra" />
      <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_1.6fr]">
        <address className="flex flex-col gap-6 rounded-[2rem] border border-border bg-card p-8 not-italic">
          <div className="flex gap-3">
            <MapPin className="mt-1 size-5 shrink-0 text-lantern" aria-hidden="true" />
            <div>
              <p className="font-serif text-xl text-moss">JMK Holiday Guest House</p>
              <p className="mt-1 leading-relaxed text-muted-foreground">{ADDRESS}</p>
            </div>
          </div>
          <a href={PHONE_TEL} className="flex items-center gap-3 font-medium text-moss hover:underline">
            <Phone className="size-5 text-lantern" aria-hidden="true" />
            {PHONE_DISPLAY}
          </a>
          <a
            href={MAPS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-auto inline-flex w-fit items-center gap-2 rounded-full bg-lantern px-6 py-3 font-medium text-moss focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-moss"
          >
            <Navigation className="size-4" aria-hidden="true" />
            Get Directions
          </a>
        </address>
        <div className="overflow-hidden rounded-[2rem] border border-border">
          <iframe
            title="Map showing JMK Holiday Guest House"
            src="https://maps.google.com/maps?q=JMK%20Holiday%20Guest%20House%2C%20Mawsmai%2C%20Sohra%2C%20Meghalaya%20793108&z=15&output=embed"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="h-80 w-full lg:h-full lg:min-h-96"
          />
        </div>
      </div>
    </section>
  )
}

export function SiteFooter() {
  return (
    <footer className="relative z-10 bg-moss pb-28 text-mist md:pb-0">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-12 sm:px-6 md:flex-row md:items-end md:justify-between">
        <div className="flex flex-col gap-2">
          <p className="font-serif text-2xl">JMK Holiday Guest House</p>
          <p className="max-w-sm text-sm leading-relaxed text-mist/75">{ADDRESS}</p>
          <a href={PHONE_TEL} className="w-fit text-sm font-medium text-lantern hover:underline">
            {PHONE_DISPLAY}
          </a>
        </div>
        <p className="text-xs text-mist/60">© 2026 JMK Holiday Guest House · Made with care in Sohra</p>
      </div>
    </footer>
  )
}

export function MobileActions() {
  const base =
    'flex flex-1 flex-col items-center justify-center gap-1 py-2.5 text-xs font-medium focus-visible:outline-2 focus-visible:outline-lantern'
  return (
    <nav
      aria-label="Quick actions"
      className="fixed inset-x-3 bottom-3 z-50 flex overflow-hidden rounded-2xl bg-moss text-mist shadow-2xl md:hidden"
    >
      <a href={PHONE_TEL} className={base}>
        <Phone className="size-5" aria-hidden="true" />
        Call
      </a>
      <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className={`${base} border-x border-mist/15`}>
        <MessageCircle className="size-5" aria-hidden="true" />
        WhatsApp
      </a>
      <a href="#book" className={`${base} bg-lantern text-moss`}>
        <CalendarDays className="size-5" aria-hidden="true" />
        Book Stay
      </a>
    </nav>
  )
}
