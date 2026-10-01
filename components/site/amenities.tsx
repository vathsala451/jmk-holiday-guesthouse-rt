'use client'

import { useState } from 'react'
import { Car, Flame, RotateCw, Users, UtensilsCrossed } from 'lucide-react'
import { SectionHeading } from './section-heading'

const amenities = [
  { title: 'Hot water', icon: Flame, text: 'Geysers in the rooms, welcome after a cool, misty day in Sohra.' },
  {
    title: 'Kitchen access',
    icon: UtensilsCrossed,
    text: 'Kitchen facilities that families and groups can use during their stay.',
  },
  { title: 'Parking', icon: Car, text: 'Space to park your car right in front of the guest house.' },
  {
    title: 'Family & group rooms',
    icon: Users,
    text: 'Rooms with two double beds, so families and friends can stay together.',
  },
]

function AmenityCard({ title, text, icon: Icon }: (typeof amenities)[number]) {
  const [flipped, setFlipped] = useState(false)

  return (
    <li className="perspective">
      <button
        type="button"
        aria-pressed={flipped}
        aria-label={`${title}. Tap for details`}
        onClick={() => setFlipped((f) => !f)}
        className="group relative block h-56 w-full rounded-3xl text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-lantern"
      >
        <div
          className="preserve-3d relative h-full w-full transition-transform duration-700 motion-reduce:transition-none"
          style={{ transform: flipped ? 'rotateY(180deg)' : 'none' }}
        >
          <div className="backface-hidden absolute inset-0 flex flex-col justify-between rounded-3xl border border-mist/10 bg-mist/5 p-6 transition-shadow duration-500 group-hover:shadow-[0_0_60px_-10px_rgba(232,163,61,0.6)]">
            <span className="flex size-14 items-center justify-center rounded-full bg-lantern/15 text-lantern transition-all duration-500 group-hover:bg-lantern group-hover:text-moss group-hover:shadow-[0_0_30px_rgba(232,163,61,0.8)]">
              <Icon className="size-6" aria-hidden="true" />
            </span>
            <div className="flex items-end justify-between gap-2">
              <h3 className="font-serif text-2xl text-mist">{title}</h3>
              <RotateCw className="size-4 shrink-0 text-mist/50" aria-hidden="true" />
            </div>
          </div>
          <div className="backface-hidden absolute inset-0 flex flex-col justify-center gap-3 rounded-3xl bg-lantern p-6 text-moss [transform:rotateY(180deg)]">
            <h3 className="font-serif text-xl font-semibold">{title}</h3>
            <p className="leading-relaxed">{text}</p>
          </div>
        </div>
      </button>
    </li>
  )
}

export function Amenities() {
  return (
    <section id="amenities" aria-labelledby="amenities-title" className="relative z-10 bg-moss">
      <div className="mx-auto max-w-6xl px-4 pb-20 pt-10 sm:px-6">
        <SectionHeading
          id="amenities-title"
          eyebrow="Amenities"
          title="Small comforts for cool hill days"
          description="Tap a lantern to read more."
          dark
        />
        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {amenities.map((a) => (
            <AmenityCard key={a.title} {...a} />
          ))}
        </ul>
      </div>
    </section>
  )
}
