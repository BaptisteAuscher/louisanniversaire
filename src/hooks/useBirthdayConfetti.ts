import { useEffect, useRef } from 'react'
import { isBirthdayToday } from '../utils/birthday'
import { fireBirthdayConfetti } from '../utils/confetti'
import { useCountdown } from './useCountdown'

export function useBirthdayConfetti(targetDate: Date): void {
  const { isComplete } = useCountdown(targetDate)
  const wasCompleteRef = useRef(isComplete)

  useEffect(() => {
    if (isBirthdayToday(targetDate)) {
      fireBirthdayConfetti()
    }
  }, [targetDate])

  useEffect(() => {
    if (!wasCompleteRef.current && isComplete && isBirthdayToday(targetDate)) {
      fireBirthdayConfetti()
    }
    wasCompleteRef.current = isComplete
  }, [isComplete, targetDate])
}
