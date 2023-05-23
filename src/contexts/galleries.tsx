import { useState, createContext, useEffect } from 'react'
import {
  ResponseGallery,
  GalleryContextType,
  GalleriesProviderType
} from '@/type/galleria'

const initialState: GalleryContextType = {
  loading: false,
  galleries: {} as ResponseGallery
}

export const GalleryContext = createContext(initialState)

export const GalleryProvider = ({
  children
}: GalleriesProviderType): JSX.Element => {
  const [loading, setLoading] = useState<boolean>(false)
  const [galleries, setGalleries] = useState<ResponseGallery>(
    initialState.galleries
  )

  useEffect(() => {
    setLoading(true)
    fetch('/api/galleries', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then((data: ResponseGallery) => {
        setGalleries(data)
        setLoading(false)
      })
      .catch(error => {
        setLoading(false)
      })
  }, [])

  return (
    <GalleryContext.Provider value={{ galleries, loading }}>
      {children}
    </GalleryContext.Provider>
  )
}
