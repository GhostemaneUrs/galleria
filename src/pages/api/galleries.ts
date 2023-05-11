import galleries from '@/db/galleria.json'
import { ResponsiveGallery } from '@/type/galleria'
import type { NextApiRequest, NextApiResponse } from 'next'

const galleriesApi = async (
  req: NextApiRequest,
  res: NextApiResponse<ResponsiveGallery>
): Promise<void> => {
  const { ...filters } = req.query
  const obj = {
    skip: Number(filters.skip ?? 1),
    limit: Number(filters.limit ?? 5),
    totalRows: galleries.length,
    totalPages: Math.ceil(galleries.length / Number(filters.limit ?? 5)),
    galleries: galleries
      .slice(
        Number(filters.skip ?? 1) - 1,
        Number(filters.skip ?? 1) + Number(filters.limit ?? 5) - 1
      )
      .map(item => ({
        id: item?.id,
        name: item?.name,
        artist: item?.artist?.name,
        gallery: item?.images?.gallery
      }))
  }
  res.status(200).json(obj)
}

export default galleriesApi
