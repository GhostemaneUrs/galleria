import { useContext } from 'react'
import { GalleryContext } from '@/context/galleries'

export const useGalleries = () => {
  const galleries = useContext(GalleryContext)
  return galleries
}
