'use client'

import { useRef, useState } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { SectionHeading } from './section-heading'

const photos: { src: string; alt: string; framed?: boolean }[] = [
  {
    src: '/images/exterior-night.png',
    alt: 'The guest house at night, its roofline lit with blue and warm fairy lights',
    framed: true,
  },
  { src: '/images/room-floral.png', alt: 'Two beds made up with blue floral sheets and warm blankets', framed: true },
  {
    src: '/images/home-meal.png',
    alt: 'A home-cooked meal of rice, dal, vegetable dishes and onion served on a wooden table',
    framed: true,
  },
  { src: '/images/room-twin.png', alt: 'Family room with two double beds and pink curtains' },
  { src: '/images/lake-sunset.png', alt: 'Sunset over a calm lake ringed by forested hills' },
  { src: '/images/entrance.png', alt: 'Red double doors opening into the guest house hallway' },
  { src: '/images/river-view.png', alt: 'View through tree branches over a wide river and sandbanks in the valley' },
  { src: '/images/lake-jetty.png', alt: 'A visitor on a lakeside jetty as the sun breaks through the clouds' },
]

export function Gallery() {
  const trackRef = useRef<HTMLUListElement>(null)
  const dialogRef = useRef<HTMLDialogElement>(null)
  const [active, setActive] = useState<number | null>(null)

  const scrollBy = (dir: 1 | -1) => {
    const track = trackRef.current
    if (!track) return
    track.scrollBy({ left: dir * track.clientWidth * 0.8, behavior: 'smooth' })
  }

  const open = (i: number) => {
    setActive(i)
    dialogRef.current?.showModal()
  }

  const step = (dir: 1 | -1) =>
    setActive((i) => (i === null ? i : (i + dir + photos.length) % photos.length))

  const current = active !== null ? photos[active] : null

  return (
    <section id="gallery" aria-labelledby="gallery-title" className="relative z-10 mx-auto max-w-6xl px-4 py-20 sm:px-6">
      <SectionHeading id="gallery-title" eyebrow="Gallery" title="The house and the hills around it" />
      <div className="relative mt-10">
        <ul
          ref={trackRef}
          aria-label="Photo carousel"
          className="flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth px-1 pb-2 [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)] [scrollbar-width:none] motion-reduce:scroll-auto [&::-webkit-scrollbar]:hidden"
        >
          {photos.map((photo, i) => (
            <li key={photo.src} className="w-[80%] shrink-0 snap-center sm:w-[calc(50%-10px)] lg:w-[calc(33.333%-14px)]">
              <button
                type="button"
                onClick={() => open(i)}
                className="group relative block aspect-[4/3] w-full overflow-hidden rounded-2xl bg-muted shadow-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-lantern"
              >
                <span className="sr-only">Open photo: {photo.alt}</span>
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="(min-width: 1024px) 360px, (min-width: 640px) 50vw, 80vw"
                  className={cn(
                    'object-cover transition-transform duration-700 motion-reduce:transition-none',
                    photo.framed ? 'scale-[1.06] group-hover:scale-110' : 'group-hover:scale-105',
                  )}
                />
              </button>
            </li>
          ))}
        </ul>
        <button
          type="button"
          aria-label="Scroll photos left"
          onClick={() => scrollBy(-1)}
          className="absolute left-0 top-1/2 z-10 grid size-11 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-card text-moss shadow-md transition-transform hover:scale-105 focus-visible:outline-2 focus-visible:outline-lantern"
        >
          <ChevronLeft className="size-5" aria-hidden="true" />
        </button>
        <button
          type="button"
          aria-label="Scroll photos right"
          onClick={() => scrollBy(1)}
          className="absolute right-0 top-1/2 z-10 grid size-11 -translate-y-1/2 translate-x-1/2 place-items-center rounded-full bg-card text-moss shadow-md transition-transform hover:scale-105 focus-visible:outline-2 focus-visible:outline-lantern"
        >
          <ChevronRight className="size-5" aria-hidden="true" />
        </button>
      </div>

      <dialog
        ref={dialogRef}
        aria-label="Photo viewer"
        onClose={() => setActive(null)}
        onClick={(e) => {
          if (e.target === e.currentTarget) dialogRef.current?.close()
        }}
        onKeyDown={(e) => {
          if (e.key === 'ArrowRight') step(1)
          if (e.key === 'ArrowLeft') step(-1)
        }}
        className="m-auto max-h-none max-w-none bg-transparent p-4 backdrop:bg-moss/90 backdrop:backdrop-blur-sm"
      >
        {current && (
          <figure className="flex flex-col items-center gap-4">
            <div className="relative h-[75vh] w-[90vw] max-w-5xl">
              <Image src={current.src} alt={current.alt} fill sizes="90vw" className="rounded-2xl object-contain" />
            </div>
            <figcaption className="max-w-xl text-center text-sm text-mist/90">{current.alt}</figcaption>
            <div className="flex gap-3">
              <button
                type="button"
                aria-label="Previous photo"
                onClick={() => step(-1)}
                className="rounded-full border border-mist/30 p-3 text-mist hover:bg-mist/10 focus-visible:outline-2 focus-visible:outline-lantern"
              >
                <ChevronLeft className="size-5" aria-hidden="true" />
              </button>
              <button
                type="button"
                aria-label="Close photo viewer"
                onClick={() => dialogRef.current?.close()}
                className="rounded-full bg-lantern p-3 text-moss focus-visible:outline-2 focus-visible:outline-mist"
              >
                <X className="size-5" aria-hidden="true" />
              </button>
              <button
                type="button"
                aria-label="Next photo"
                onClick={() => step(1)}
                className="rounded-full border border-mist/30 p-3 text-mist hover:bg-mist/10 focus-visible:outline-2 focus-visible:outline-lantern"
              >
                <ChevronRight className="size-5" aria-hidden="true" />
              </button>
            </div>
          </figure>
        )}
      </dialog>
    </section>
  )
}
