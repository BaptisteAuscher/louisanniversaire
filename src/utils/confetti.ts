import confetti from 'canvas-confetti'

const CONFETTI_COLORS = [
  '#FF007A', // punchy pink
  '#FFD600', // vibrant yellow
  '#00F0FF', // electric cyan
  '#FF6A00', // bright orange
  '#00FF8A', // punchy green
  '#8D39FA', // vivid purple
]

function randomInRange(min: number, max: number): number {
  return Math.random() * (max - min) + min
}

export function fireBirthdayConfetti(): void {
  const duration = 5000
  const end = Date.now() + duration

  const starEmoji = confetti.shapeFromText('🌟')
  const yellowHeartEmoji = confetti.shapeFromText('💛');
  const pinkHeartEmoji = confetti.shapeFromText('💖');
  const purpleHeartEmoji = confetti.shapeFromText('💜');
  const partyPopperEmoji = confetti.shapeFromText('🎉');
  const balloonEmoji = confetti.shapeFromText('🎈');
  const birthdayCakeEmoji = confetti.shapeFromText('🎂');
  const birthdayHatEmoji = confetti.shapeFromText('🎩');
  const giftEmoji = confetti.shapeFromText('🎁');
  const textHeartEmoji = confetti.shapeFromText('<3');

  const shapes = [starEmoji, yellowHeartEmoji, pinkHeartEmoji, purpleHeartEmoji, partyPopperEmoji, balloonEmoji, birthdayCakeEmoji, birthdayHatEmoji, giftEmoji, textHeartEmoji];

  const baseScalar = 2.4
  const scalarRange = () => randomInRange(1.6, 3.4)

  confetti({
    shapes,
    particleCount: 80,
    spread: 120,
    startVelocity: 35,
    origin: { x: 0.5, y: 0 },
    colors: CONFETTI_COLORS,
    ticks: 500,
    gravity: 1.1,
    scalar: baseScalar,
    drift: randomInRange(-0.4, 0.4),
  })

  const frame = () => {
    confetti({
      shapes,
      particleCount: 5,
      angle: 90,
      spread: randomInRange(30, 60),
      startVelocity: randomInRange(8, 22),
      origin: { x: randomInRange(0, 1), y: randomInRange(-0.05, 0.05) },
      colors: CONFETTI_COLORS,
      ticks: randomInRange(400, 550),
      gravity: randomInRange(0.9, 1.3),
      scalar: scalarRange(),
      drift: randomInRange(-0.6, 0.6),
    })

    if (Date.now() < end) {
      requestAnimationFrame(frame)
    }
  }

  frame()

  const sideBurst = (x: number) => {
    confetti({
      shapes,
      particleCount: 35,
      angle: x === 0 ? 75 : 105,
      spread: 90,
      startVelocity: 30,
      origin: { x, y: 0 },
      colors: CONFETTI_COLORS,
      ticks: 500,
      gravity: 1.1,
      scalar: baseScalar,
      drift: x === 0 ? 0.5 : -0.5,
    })
  }

  sideBurst(0)
  sideBurst(1)
}
