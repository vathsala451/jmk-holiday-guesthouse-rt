import Image from 'next/image'
import { MessageCircle, Phone } from 'lucide-react'
import { PHONE_TEL, WHATSAPP_URL } from '@/lib/site'
import { MistOverlay } from './mist-overlay'
import { MoodToggle } from './mood-toggle'

export function Hero() {
  return (
    <section id="top" aria-labelledby="hero-title" className="relative z-10 overflow-hidden">
      <div aria-hidden="true" className="mood-layer mood-sunny absolute inset-0" />
      <div aria-hidden="true" className="mood-layer mood-rain absolute inset-0 overflow-hidden" />
      <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-4 pb-12 pt-10 sm:px-6 lg:grid-cols-[1fr_1.1fr] lg:pb-20 lg:pt-16">
        <div className="flex flex-col gap-6">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-slate">Mawsmai, Sohra · Meghalaya</p>
          <h1
            id="hero-title"
            className="text-balance font-serif text-5xl font-medium leading-[1.02] text-moss sm:text-6xl lg:text-7xl"
          >
            Wake up <em className="font-normal">above</em> the clouds
          </h1>
          <p className="max-w-md text-pretty text-lg leading-relaxed text-muted-foreground">
            A family-run guest house near Eco Park in Sohra, with warm rooms, hot water and a kitchen for groups.
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href={PHONE_TEL}
              className="inline-flex items-center gap-2 rounded-full bg-lantern px-6 py-3 font-medium text-moss shadow-[0_8px_30px_-8px_rgba(232,163,61,0.7)] transition-transform hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-moss"
            >
              <Phone className="size-4" aria-hidden="true" />
              Call Now
            </a>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-moss/25 bg-card px-6 py-3 font-medium text-moss transition-colors hover:bg-secondary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            >
              <MessageCircle className="size-4" aria-hidden="true" />
              WhatsApp Us
            </a>
          </div>
          <MoodToggle />
        </div>
        <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] shadow-2xl shadow-moss/20">
          <Image
            src="/images/lake-jetty.png"
            alt="Golden sun glinting over a calm lake near Sohra, with a guest leaning on a wooden railing at the viewpoint"
            fill
            priority
            sizes="(min-width: 1024px) 600px, 100vw"
            className="object-cover"
          />
          <div className="mood-mist absolute inset-0">
            <MistOverlay />
          </div>
        </div>
      </div>
    </section>
  )
}
