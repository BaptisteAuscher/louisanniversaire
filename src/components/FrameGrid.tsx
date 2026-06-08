import type { ReactNode } from 'react'
import { GALLERY_FRAMES, type GalleryFrame } from '../constants'
import { PomponBorder } from './PomponBorder'

const FRAME_ANIMATION_DELAYS = [
  'animate-fade-up-delay-3',
  'animate-fade-up-delay-4',
  'animate-fade-up-delay-5',
] as const

const FrameGrid = () => {
  return (
    <div className="flex w-[70%] flex-col items-center justify-center gap-8 px-4 pb-12 pt-10 sm:gap-10 sm:pb-16">
      {GALLERY_FRAMES.map((frame, index) => (
        <Frame
          key={frame.src}
          frame={frame}
          index={index}
          animationClass={
            FRAME_ANIMATION_DELAYS[index] ?? 'animate-fade-up-delay-5'
          }
        />
      ))}
    </div>
  )
}

const FramePhoto = ({
  frame,
}: {
  frame: GalleryFrame
}) => (
  <div
    className="overflow-hidden bg-gallery-200"
    style={{ aspectRatio: frame.styles.aspectRatio }}
  >
    <img
      src={frame.src}
      alt={frame.alt}
      className="h-full w-full object-cover"
      loading="lazy"
      decoding="async"
    />
  </div>
)

const FramedMat = ({
  children,
  className = '',
}: {
  children: ReactNode
  className?: string
}) => (
  <div
    className={`rounded-sm bg-[#d4cfc6] p-[5px] shadow-[4px_6px_18px_rgba(0,0,0,0.12),1px_2px_4px_rgba(0,0,0,0.06)] sm:p-1.5 md:p-2 ${className}`}
  >
    <div className="bg-[#faf9f7] p-1.5 sm:p-2 md:p-3">{children}</div>
  </div>
)

const Frame = ({
  frame,
  index,
  animationClass,
}: {
  frame: GalleryFrame
  index: number
  animationClass: string
}) => {
  const { side, width, rotation, variant } = frame.styles

  const photo = <FramePhoto frame={frame} />

  let content: ReactNode
  switch (variant) {
    case 'default':
      content = photo
      break
    case 'framed':
      content = <FramedMat>{photo}</FramedMat>
      break
    case 'pompon':
      content = (
        <div className="relative overflow-visible">
          {photo}
          <PomponBorder seed={index * 997 + 131} />
        </div>
      )
      break
  }

  const captionRotation = side === 'left' ? '-4deg' : '3deg'

  return (
    <div
      className={`${animationClass} ${
        side === 'left'
          ? 'self-start'
          : side === 'center'
            ? 'self-center'
            : 'self-end'
      }`}
    >
      <div
        className={`relative flex items-end gap-4 pb-6 sm:gap-12 sm:pb-8 md:gap-16 ${
          side === 'left'
            ? 'flex-row'
            : side === 'center'
              ? 'flex-row'
              : 'flex-row-reverse'
        }`}
        style={{ transform: `rotate(${rotation})` }}
      >
        <div className="shrink-0" style={{ width }}>
          {content}
        </div>
        {frame.caption && (
          <p
            className="mb-4 max-w-[8rem] shrink-0 self-end font-handwriting text-lg leading-tight text-gallery-800/55 sm:mb-6 sm:max-w-[9rem] sm:text-xl md:text-2xl"
            style={{ transform: `rotate(${captionRotation})` }}
          >
            {frame.caption}
          </p>
        )}
      </div>
    </div>
  )
}

export default FrameGrid
