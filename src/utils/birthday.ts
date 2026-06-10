export function isBirthdayToday(targetDate: Date): boolean {
  const now = new Date()
  return (
    now.getFullYear() === targetDate.getFullYear() &&
    now.getMonth() === targetDate.getMonth() &&
    now.getDate() === targetDate.getDate()
  )
}
