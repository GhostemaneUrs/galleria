import galleries from '@/db/galleria.json'
import { ResponseGallery } from '@/type/galleria'
import type { NextApiRequest, NextApiResponse } from 'next'

const galleriesApi = async (
  req: NextApiRequest,
  res: NextApiResponse<ResponseGallery>
): Promise<void> => {
  const { ...filters } = req.query

  const obj = {
    skip: Number(filters.skip ?? 1),
    limit: Number(filters.limit ?? galleries.length),
    totalRows: galleries.length,
    totalPages: Math.ceil(galleries.length / Number(filters.limit ?? 5)),
    data: galleries.map(gallery => ({
      id: gallery.id,
      name: gallery.name,
      artist: gallery.artist.name,
      gallery: gallery.images.gallery
    }))
  }
  res.status(200).json(obj)
}

export default galleriesApi
