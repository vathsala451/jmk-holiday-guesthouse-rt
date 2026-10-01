import { BedDouble, Check, Compass, DoorOpen, Moon, Sofa, Users } from 'lucide-react'
import { SectionHeading } from './section-heading'

const rooms = [
  {
    name: 'Double Room',
    description: 'A cosy, clean room for couples or solo travellers after a day of waterfalls and caves.',
    guests: '2 guests',
    beds: '1 double bed',
    features: ['Attached bathroom', 'Hot water', 'Fresh linen'],
  },
  {
    name: 'Family Room',
    description: 'More space for families or friends, with room to spread out and rest.',
    guests: 'Up to 4 guests',
    beds: '2 double beds',
    features: ['Attached bathroom', 'Hot water', 'Extra blankets'],
  },
  {
    name: 'Group Stay',
    description: 'Travelling as a larger group? Book several rooms together and we will arrange it.',
    guests: '5+ guests',
    beds: 'Multiple rooms',
    features: ['Parking for vehicles', 'Meals on request', 'Local tips from hosts'],
  },
]

export function Rooms() {
  return (
    <section id="rooms" aria-labelledby="rooms-title" className="relative z-10 mx-auto max-w-6xl px-4 py-20 sm:px-6">
      <SectionHeading
        id="rooms-title"
        eyebrow="Rooms"
        title="Choose your stay"
        description="Call or send a booking request for current rates and availability."
      />
      <ul className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {rooms.map((room) => (
          <li key={room.name} className="flex flex-col gap-5 rounded-[2rem] border border-border bg-card p-7 shadow-sm">
            <span className="flex size-14 items-center justify-center rounded-full bg-lantern/20 text-moss">
              <BedDouble className="size-6" aria-hidden="true" />
            </span>
            <div className="flex flex-col gap-2">
              <h3 className="font-serif text-2xl font-semibold text-moss">{room.name}</h3>
              <p className="leading-relaxed text-muted-foreground">{room.description}</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1.5 text-sm text-moss">
                <Users className="size-4" aria-hidden="true" />
                {room.guests}
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1.5 text-sm text-moss">
                <BedDouble className="size-4" aria-hidden="true" />
                {room.beds}
              </span>
            </div>
            <ul className="flex flex-col gap-2.5">
              {room.features.map((f) => (
                <li key={f} className="flex items-center gap-2.5 text-moss/90">
                  <Check className="size-4 text-lantern" aria-hidden="true" />
                  {f}
                </li>
              ))}
            </ul>
            <a
              href="#book"
              className="mt-auto inline-flex items-center justify-center rounded-full bg-moss px-6 py-3.5 font-semibold text-mist transition-colors hover:bg-moss/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            >
              Book this room
            </a>
          </li>
        ))}
      </ul>
    </section>
  )
}

const steps = [
  {
    title: 'Arrive',
    icon: DoorOpen,
    text: 'Head to Mawsmai, Nongthymmai in Sohra. We are near Eco Park, and you can call us for directions.',
  },
  {
    title: 'Settle in',
    icon: Sofa,
    text: 'Drop your bags, take a hot shower and make yourself something warm in the kitchen.',
  },
  {
    title: 'Explore nearby',
    icon: Compass,
    text: 'Eco Park is close by. Spend the day out in the hills and valleys around Sohra.',
  },
  { title: 'Rest', icon: Moon, text: 'Come back to a quiet room and let the mist roll in for the night.' },
]

export function StayTimeline() {
  return (
    <section aria-labelledby="timeline-title" className="relative z-10 mx-auto max-w-3xl px-4 py-20 sm:px-6">
      <SectionHeading id="timeline-title" eyebrow="Your stay" title="Your stay, step by step" />
      <ol className="relative mt-12 flex flex-col gap-10 pl-14">
        <span className="absolute bottom-2 left-5 top-2 w-px bg-border" aria-hidden="true" />
        {steps.map(({ title, icon: Icon, text }, i) => (
          <li key={title} className="relative">
            <span className="absolute -left-14 flex size-10 items-center justify-center rounded-full border border-border bg-card text-moss">
              <Icon className="size-4" aria-hidden="true" />
            </span>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate">Step {i + 1}</p>
            <h3 className="mt-1 font-serif text-2xl text-moss">{title}</h3>
            <p className="mt-2 leading-relaxed text-muted-foreground">{text}</p>
          </li>
        ))}
      </ol>
    </section>
  )
}
