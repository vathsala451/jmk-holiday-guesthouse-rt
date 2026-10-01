'use client'

import { useState, type FormEvent } from 'react'
import { MessageCircle } from 'lucide-react'
import { WHATSAPP_NUMBER } from '@/lib/site'
import { cn } from '@/lib/utils'
import { SectionHeading } from './section-heading'

const fieldClass =
  'w-full rounded-xl border bg-mist px-4 py-3 text-moss placeholder:text-muted-foreground/70 focus:outline-2 focus:outline-offset-1 focus:outline-lantern'

type Errors = Partial<Record<'name' | 'phone' | 'checkIn' | 'checkOut' | 'guests', string>>

function todayISO() {
  const d = new Date()
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset())
  return d.toISOString().slice(0, 10)
}

export function BookingForm() {
  const [errors, setErrors] = useState<Errors>({})
  const [status, setStatus] = useState('')
  const today = todayISO()

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const data = Object.fromEntries(new FormData(e.currentTarget)) as Record<string, string>
    const next: Errors = {}
    const name = data.name.trim()
    const phone = data.phone.replace(/[\s-]/g, '').replace(/^(\+91|91)(?=\d{10}$)/, '')
    const guests = Number(data.guests)

    if (name.length < 2) next.name = 'Please enter your name.'
    if (!/^[6-9]\d{9}$/.test(phone)) next.phone = 'Enter a valid 10-digit mobile number.'
    if (!data.checkIn) next.checkIn = 'Choose a check-in date.'
    else if (data.checkIn < today) next.checkIn = 'Check-in cannot be in the past.'
    if (!data.checkOut) next.checkOut = 'Choose a check-out date.'
    else if (data.checkIn && data.checkOut <= data.checkIn) next.checkOut = 'Check-out must be after check-in.'
    if (!Number.isInteger(guests) || guests < 1 || guests > 30) next.guests = 'Guests must be between 1 and 30.'

    setErrors(next)
    if (Object.keys(next).length) {
      setStatus('')
      return
    }

    const message = [
      'Hi JMK Holiday Guest House, I would like to book a stay.',
      `Name: ${name}`,
      `Mobile: +91 ${phone}`,
      `Check-in: ${data.checkIn}`,
      `Check-out: ${data.checkOut}`,
      `Guests: ${guests}`,
      `Room: ${data.room}`,
      data.message?.trim() ? `Message: ${data.message.trim()}` : '',
    ]
      .filter(Boolean)
      .join('\n')

    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer')
    setStatus('Opening WhatsApp with your booking details. Just press send.')
  }

  const field = (key: keyof Errors) => ({
    'aria-invalid': Boolean(errors[key]) || undefined,
    'aria-describedby': errors[key] ? `inq-${key}-error` : undefined,
    className: cn(fieldClass, errors[key] ? 'border-destructive' : 'border-input'),
  })

  const error = (key: keyof Errors) =>
    errors[key] && (
      <p id={`inq-${key}-error`} className="text-sm text-destructive">
        {errors[key]}
      </p>
    )

  return (
    <section id="book" aria-labelledby="book-title" className="relative z-10 mx-auto max-w-3xl scroll-mt-28 px-4 py-20 sm:px-6">
      <SectionHeading
        id="book-title"
        eyebrow="Book / Stay"
        title="Book your stay"
        description="Share your dates and we will get back to you with availability."
      />
      <form
        noValidate
        onSubmit={onSubmit}
        className="mt-10 grid gap-5 rounded-[2rem] border border-border bg-card p-6 sm:grid-cols-2 sm:p-8"
      >
        <div className="flex flex-col gap-1.5 sm:col-span-2">
          <label htmlFor="inq-name" className="text-sm font-medium text-moss">
            Full name
          </label>
          <input id="inq-name" name="name" autoComplete="name" required maxLength={80} {...field('name')} />
          {error('name')}
        </div>
        <div className="flex flex-col gap-1.5 sm:col-span-2">
          <label htmlFor="inq-phone" className="text-sm font-medium text-moss">
            Mobile number <span className="font-normal text-muted-foreground">(10 digits, +91 optional)</span>
          </label>
          <input
            id="inq-phone"
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="98765 43210"
            required
            maxLength={16}
            {...field('phone')}
          />
          {error('phone')}
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="inq-checkIn" className="text-sm font-medium text-moss">
            Check-in
          </label>
          <input id="inq-checkIn" name="checkIn" type="date" min={today} required {...field('checkIn')} />
          {error('checkIn')}
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="inq-checkOut" className="text-sm font-medium text-moss">
            Check-out
          </label>
          <input id="inq-checkOut" name="checkOut" type="date" min={today} required {...field('checkOut')} />
          {error('checkOut')}
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="inq-guests" className="text-sm font-medium text-moss">
            Guests
          </label>
          <input
            id="inq-guests"
            name="guests"
            type="number"
            min={1}
            max={30}
            inputMode="numeric"
            defaultValue={2}
            required
            {...field('guests')}
          />
          {error('guests')}
        </div>
        <div className="flex flex-col gap-1.5">
          <label htmlFor="inq-room" className="text-sm font-medium text-moss">
            Room type
          </label>
          <select id="inq-room" name="room" defaultValue="Double Room" className={cn(fieldClass, 'border-input')}>
            <option value="Double Room">Double Room</option>
            <option value="Family Room">Family Room</option>
            <option value="Group Stay">Group Stay</option>
          </select>
        </div>
        <div className="flex flex-col gap-1.5 sm:col-span-2">
          <label htmlFor="inq-message" className="text-sm font-medium text-moss">
            Message (optional)
          </label>
          <textarea
            id="inq-message"
            name="message"
            rows={4}
            maxLength={500}
            className={cn(fieldClass, 'resize-y border-input')}
          />
        </div>
        <button
          type="submit"
          className="inline-flex items-center justify-center gap-2 rounded-full bg-moss px-6 py-3.5 font-medium text-mist transition-colors hover:bg-moss/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring sm:col-span-2"
        >
          <MessageCircle className="size-4" aria-hidden="true" />
          Send Booking Request on WhatsApp
        </button>
        <div role="status" aria-live="polite" className="text-sm text-moss sm:col-span-2 empty:hidden">
          {status}
        </div>
      </form>
    </section>
  )
}
