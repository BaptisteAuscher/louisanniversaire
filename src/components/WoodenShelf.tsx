import type { CSSProperties } from 'react'
import { SHELF_ITEMS, type ShelfItem } from '../constants'

const WoodenShelf = () => {
  return (
    <div className="relative w-full max-w-[340px] px-2 sm:max-w-[380px]">
      <div className="relative z-10 flex items-end justify-center gap-0">
        {SHELF_ITEMS.map((item) => (
          <ShelfObject key={item.id} item={item} />
        ))}
      </div>

      <div className="relative -mt-px leading-[0]">
        <div
          className="shelf-plank h-1.5 w-full sm:h-2"
          aria-hidden="true"
        />
        <div
          className="shelf-edge absolute -bottom-0.5 left-0 right-0 h-0.5 sm:-bottom-1 sm:h-1"
          aria-hidden="true"
        />
      </div>
    </div>
  )
}

const ShelfObject = ({ item }: { item: ShelfItem }) => {
  const intrinsic = !item.height

  const style: CSSProperties = {
    width: item.width,
    marginLeft: item.marginLeft,
    ...(item.height ? { height: item.height } : {}),
  }

  return (
    <div
      className="relative shrink-0 leading-[0]"
      style={style}
    >
      {item.src ? (
        <img
          src={item.src}
          alt={item.alt}
          className={
            intrinsic
              ? 'block w-full drop-shadow-[0_4px_8px_rgba(0,0,0,0.15)]'
              : 'block h-full w-full object-contain object-bottom drop-shadow-[0_4px_8px_rgba(0,0,0,0.15)]'
          }
          loading="lazy"
          decoding="async"
        />
      ) : (
        <div
          className="flex h-full w-full flex-col items-center justify-end gap-1 rounded-sm border border-dashed border-gallery-800/20 bg-gallery-100/60 pb-1"
          aria-label={item.alt}
        >
          <span className="font-serif text-[0.55rem] italic text-gallery-800/35 sm:text-[0.65rem]">
            {item.label}
          </span>
        </div>
      )}
    </div>
  )
}

export default WoodenShelf
