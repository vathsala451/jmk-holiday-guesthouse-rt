'use client'

import { useState } from 'react'
import { CloudFog, CloudRain, Sun } from 'lucide-react'
import { cn } from '@/lib/utils'

const moods = [
  { id: 'misty', label: 'Misty', icon: CloudFog, tint: '#f4f7f500' },
  { id: 'sunny', label: 'Sunny', icon: Sun, tint: '#e8a33d1f' },
  { id: 'rainy', label: 'Rainy', icon: CloudRain, tint: '#5b708326' },
] as const

export function MoodToggle() {
  const [mood, setMood] = useState<(typeof moods)[number]['id']>('misty')

  return (
    <div role="radiogroup" aria-label="Set the mood" className="flex items-center gap-2 pt-2">
      <span className="text-xs font-medium text-muted-foreground">Set the mood</span>
      <div className="flex rounded-full border border-border bg-card/80 p-0.5 backdrop-blur">
        {moods.map(({ id, label, icon: Icon, tint }) => {
          const active = mood === id
          return (
            <button
              key={id}
              type="button"
              role="radio"
              aria-checked={active}
              onClick={() => {
                setMood(id)
                document.documentElement.dataset.mood = id
                document.documentElement.style.setProperty('--mood-tint', tint)
              }}
              className={cn(
                'flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring',
                active ? 'bg-moss text-mist' : 'text-moss hover:bg-secondary',
              )}
            >
              <Icon className="size-3.5" aria-hidden="true" />
              {label}
            </button>
          )
        })}
      </div>
    </div>
  )
}
