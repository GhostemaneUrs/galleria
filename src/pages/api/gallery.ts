import galleries from '@/db/galleria.json'
import type { NextApiRequest, NextApiResponse } from 'next'

const galleryApi = async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  const { id } = req.query

  if (id !== null && id !== '') {
    const obj = galleries.find(gallery => gallery.id === Number(id))
    if (obj !== null) {
      res.status(200).json(obj)
    } else {
      res.status(404).json({ message: `Gallery with id: ${id} not found.` })
    }
  }
}

export default galleryApi
