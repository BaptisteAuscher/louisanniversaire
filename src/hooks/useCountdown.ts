import { useEffect, useState } from 'react'

export interface TimeRemaining {
  days: number
  hours: number
  minutes: number
  seconds: number
  isComplete: boolean
}

const EMPTY: TimeRemaining = {
  days: 0,
  hours: 0,
  minutes: 0,
  seconds: 0,
  isComplete: true,
}

function calculateTimeRemaining(targetDate: Date): TimeRemaining {
  const difference = targetDate.getTime() - Date.now()

  if (difference <= 0) {
    return EMPTY
  }

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / (1000 * 60)) % 60),
    seconds: Math.floor((difference / 1000) % 60),
    isComplete: false,
  }
}

export function useCountdown(targetDate: Date): TimeRemaining {
  const [timeRemaining, setTimeRemaining] = useState<TimeRemaining>(() =>
    calculateTimeRemaining(targetDate),
  )

  useEffect(() => {
    const tick = () => setTimeRemaining(calculateTimeRemaining(targetDate))

    tick()
    const intervalId = window.setInterval(tick, 1000)

    return () => window.clearInterval(intervalId)
  }, [targetDate])

  return timeRemaining
}
