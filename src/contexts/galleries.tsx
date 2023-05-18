import { ResponseGallery } from '@/type/galleria'
import { useState, createContext, useEffect } from 'react'

const initialState: ResponseGallery = {
  skip: 0,
  limit: 0,
  data: [],
  totalRows: 0,
  totalPages: 0
}

export const GalleryContext = createContext(initialState)

export const GalleryProvider = ({ children }: any): JSX.Element => {
  const [galleries, setGallery] = useState<ResponseGallery>(initialState)

  useEffect(() => {
    fetch('/api/galleries', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => {
      res.json().then(data => {
        setGallery(data)
      })
    })
  }, [])

  return (
    <GalleryContext.Provider value={galleries}>
      {children}
    </GalleryContext.Provider>
  )
}
