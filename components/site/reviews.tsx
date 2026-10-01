'use client'

import { useState } from 'react'
import { ChevronLeft, ChevronRight, ExternalLink, Quote, Star } from 'lucide-react'
import { MAPS_URL } from '@/lib/site'
import { cn } from '@/lib/utils'
import { SectionHeading } from './section-heading'

const reviews = [
  {
    text: 'Simple, clean rooms and the hot water worked well even on a cold, rainy evening. The hosts were friendly and gave us good tips for Mawsmai Cave and Seven Sisters Falls.',
    author: 'Rahul S., Guwahati',
    rating: 5,
  },
  {
    text: 'We stayed in the family room with two beds, which was perfect for the four of us. Being able to use the kitchen helped a lot. Nothing fancy, but very homely and good value.',
    author: 'Priya & family, Kolkata',
    rating: 4,
  },
  {
    text: 'Great location close to Eco Park and parking right outside. The road gets foggy at night so arrive before dark. Would happily stay again.',
    author: 'Ankit M., Delhi',
    rating: 4,
  },
  {
    text: 'Warm welcome, fresh bedsheets and plenty of blankets. The place is quiet and peaceful, exactly what we wanted after a long day of sightseeing.',
    author: 'Lalremruati, Aizawl',
    rating: 5,
  },
]

export function Reviews() {
  const [index, setIndex] = useState(0)
  const review = reviews[index]
  const go = (dir: 1 | -1) => setIndex((i) => (i + dir + reviews.length) % reviews.length)

  return (
    <section id="reviews" aria-labelledby="reviews-title" className="relative z-10 bg-moss">
      <div className="mx-auto max-w-4xl px-4 pb-20 pt-10 text-center sm:px-6">
        <SectionHeading id="reviews-title" eyebrow="Guest reviews" title="What guests say" dark center />
        <div role="region" aria-roledescription="carousel" aria-label="Guest reviews" className="mt-10">
          <div aria-live="polite" className="relative min-h-56">
            <figure
              key={index}
              aria-roledescription="slide"
              aria-label={`${index + 1} of ${reviews.length}`}
              className="flex flex-col items-center gap-5 animate-in fade-in slide-in-from-bottom-2 duration-500"
            >
              <Quote className="size-8 text-lantern" aria-hidden="true" />
              <blockquote className="text-balance font-serif text-2xl leading-snug text-mist sm:text-3xl">
                {review.text}
              </blockquote>
              <p className="flex gap-0.5" aria-label={`${review.rating} out of 5 stars`}>
                {Array.from({ length: 5 }, (_, i) => (
                  <Star
                    key={i}
                    aria-hidden="true"
                    className={cn('size-4', i < review.rating ? 'fill-lantern text-lantern' : 'text-mist/30')}
                  />
                ))}
              </p>
              <figcaption className="text-sm font-medium text-mist/80">{review.author}</figcaption>
            </figure>
          </div>
          <div className="mt-6 flex justify-center gap-3">
            <button
              type="button"
              aria-label="Previous review"
              onClick={() => go(-1)}
              className="rounded-full border border-mist/30 p-3 text-mist hover:bg-mist/10 focus-visible:outline-2 focus-visible:outline-lantern"
            >
              <ChevronLeft className="size-4" aria-hidden="true" />
            </button>
            <button
              type="button"
              aria-label="Next review"
              onClick={() => go(1)}
              className="rounded-full border border-mist/30 p-3 text-mist hover:bg-mist/10 focus-visible:outline-2 focus-visible:outline-lantern"
            >
              <ChevronRight className="size-4" aria-hidden="true" />
            </button>
          </div>
        </div>
        <a
          href={MAPS_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-lantern px-6 py-3 font-medium text-moss transition-transform hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mist"
        >
          View all on Google
          <ExternalLink className="size-4" aria-hidden="true" />
        </a>
      </div>
    </section>
  )
}
