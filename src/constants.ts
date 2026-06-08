import booksOnShelf from './assets/books-on-shelf.png'
import dessinPoupouille from './assets/dessin-poupouille.jpg'
import flowers from './assets/flowers.png'
import louisianaPoster from './assets/louisiana-poster.png'
import screenshotHinge from './assets/screenshot-hinge.png'

/** Change cette date pour l'anniversaire de Louisa */
export const BIRTHDAY_TARGET = new Date('2026-06-15T00:00:00')

export interface GalleryFrame {
  src: string
  alt: string
  caption?: string
  styles: {
    side: 'center' |'left' | 'right'
    variant: 'default' | 'framed' | 'pompon'
    rotation: string
    width: string
    aspectRatio: string
  }
}

export const GALLERY_FRAMES: GalleryFrame[] = [
  {
    src: louisianaPoster,
    alt: 'Affiche Louisiana',
    caption: '',
    styles: {
      side: 'center',
      variant: 'framed',
      rotation: '0deg',
      width: 'min(520px, 92vw)',
      aspectRatio: '862/1213',
    },
  },
  {
    src: screenshotHinge,
    alt: 'Capture d’écran Hinge',
    caption: 'Nos débuts 😍',
    styles: {
      side: 'right',
      variant: 'framed',
      rotation: '0deg',
      width: 'min(180px,35vw)',
      aspectRatio: '1170/2532',
    },
  },
  {
    src: dessinPoupouille,
    alt: 'Dessin de Poupouille',
    caption: 'Poupouille (dessiné par moi)',
    styles: {
      side: 'left',
      variant: 'pompon',
      rotation: '1.5deg',
      width: 'min(400px, 80vw)',
      aspectRatio: '9555/6738',
    },
  },
]

export interface ShelfItem {
  id: string
  /** Chemin vers le PNG — null affiche un placeholder */
  src: string | null
  alt: string
  label: string
  width: string
  /** Omis = hauteur naturelle de l'image, bas aligné sur l'étagère */
  height?: string
  /** Rapproche l'objet du précédent */
  marginLeft?: string
}

export const SHELF_ITEMS: ShelfItem[] = [
  {
    id: 'bouquet',
    src: flowers,
    alt: 'Bouquet de tournesols',
    label: 'Bouquet',
    width: 'min(200px, 58vw)',
  },
  {
    id: 'books',
    src: booksOnShelf,
    alt: 'Livres de droit',
    label: 'Livres de droit',
    width: 'min(110px, 32vw)',
    marginLeft: '-36px',
  },
]
