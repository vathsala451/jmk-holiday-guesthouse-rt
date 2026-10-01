import { SiteHeader } from '@/components/site/site-header'
import { Hero } from '@/components/site/hero'
import { About, Highlights } from '@/components/site/about'
import { Amenities } from '@/components/site/amenities'
import { Rooms, StayTimeline } from '@/components/site/rooms'
import { Gallery } from '@/components/site/gallery'
import { Reviews } from '@/components/site/reviews'
import { Location, MobileActions, SiteFooter } from '@/components/site/location'
import { BookingForm } from '@/components/site/booking-form'
import { HillDivider } from '@/components/site/section-heading'

export default function Page() {
  return (
    <>
      <SiteHeader />
      <main className="relative">
        <Hero />
        <Highlights />
        <About />
        <HillDivider />
        <Amenities />
        <HillDivider flip />
        <Rooms />
        <StayTimeline />
        <Gallery />
        <HillDivider />
        <Reviews />
        <HillDivider flip />
        <Location />
        <BookingForm />
      </main>
      <SiteFooter />
      <MobileActions />
    </>
  )
}
