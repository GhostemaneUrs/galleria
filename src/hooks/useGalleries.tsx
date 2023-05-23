import { useContext } from 'react'
import { GalleryContext } from '@/context/galleries'

export const useGalleries = () => {
  const { galleries, loading } = useContext(GalleryContext)
  return { galleries, loading }
}
