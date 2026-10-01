import Image from 'next/image'
import { Car, Flame, Users, UtensilsCrossed } from 'lucide-react'
import { SectionHeading } from './section-heading'

const highlights = [
  { label: 'Hot water', icon: Flame },
  { label: 'Kitchen access', icon: UtensilsCrossed },
  { label: 'Parking', icon: Car },
  { label: 'Family & group rooms', icon: Users },
]

export function Highlights() {
  return (
    <section aria-label="Highlights" className="relative z-10 bg-moss text-mist">
      <ul className="mx-auto grid max-w-6xl grid-cols-2 gap-y-6 px-4 py-8 sm:px-6 md:grid-cols-4">
        {highlights.map(({ label, icon: Icon }) => (
          <li key={label} className="flex items-center gap-3">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-lantern/15 text-lantern">
              <Icon className="size-5" aria-hidden="true" />
            </span>
            <span className="text-sm font-medium">{label}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}

export function About() {
  return (
    <section aria-labelledby="about-title" className="relative z-10 mx-auto max-w-6xl px-4 py-20 sm:px-6">
      <div className="grid items-center gap-10 md:grid-cols-2">
        <div className="relative aspect-[3/2] overflow-hidden rounded-[2rem]">
          <Image
            src="/images/entrance.png"
            alt="Red wooden double doors open onto the guest house hallway"
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
        <div className="flex flex-col gap-6">
          <SectionHeading id="about-title" eyebrow="About the stay" title="A simple, warm base in the Khasi Hills" />
          <p className="leading-relaxed text-muted-foreground">
            JMK Holiday Guest House is in Mawsmai, Nongthymmai, close to Eco Park in Sohra. It is a straightforward,
            homely place to sleep, cook and rest between days out in the hills.
          </p>
          <p className="leading-relaxed text-muted-foreground">
            Rooms come with geysers for hot water, there is a kitchen that families and groups can use, and you can
            park right outside. Call or message us on WhatsApp to check availability for your dates.
          </p>
          <ul className="flex flex-wrap gap-2" aria-label="Nearby places">
            {['Near Eco Park', 'Near Mawsmai Cave', 'Near Seven Sisters Falls'].map((place) => (
              <li key={place} className="rounded-full border border-moss/20 px-3 py-1 text-sm text-moss">
                {place}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
