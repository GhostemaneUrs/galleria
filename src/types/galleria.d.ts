import { PropsWithChildren } from 'react'

export interface Gallery {
  id: number
  name: string
  artist: string
  gallery: string
}
export interface DetailGallery {
  id: number
  name: string
  year: number
  source: string
  artist: Artist
  images: Images
  description: string
}

type Hero = {
  small: string
  large: string
}

type Images = {
  hero: Hero
  gallery: string
  thumbnail: string
}

type Artist = {
  name: string
  image: string
}

export type ResponseGallery = {
  skip: number
  limit: number
  totalRows: number
  totalPages: number
  data: Gallery[]
}

export interface GalleryContextType {
  loading: boolean
  galleries: ResponseGallery
}

export interface GalleriesProviderType {
  children: PropsWithChildren<React.ReactNode>
}
