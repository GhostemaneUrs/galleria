interface Gallery {
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

export type ResponsiveGallery = {
  skip: number
  limit: number
  totalRows: number
  totalPages: number
  galleries: Gallery[]
}
