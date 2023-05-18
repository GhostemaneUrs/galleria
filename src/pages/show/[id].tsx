import { motion } from 'framer-motion'
import { useState } from 'react'
import { useRouter } from 'next/router'
import { IconContext } from 'react-icons'
import { DetailGallery } from '@/type/galleria'
import { useGalleries } from '@/hook/useGalleries'
import { type GetServerSidePropsContext } from 'next'
import { FiSkipBack, FiSkipForward } from 'react-icons/fi'

export async function getServerSideProps(
  context: GetServerSidePropsContext
): Promise<{ props: { gallery: DetailGallery } }> {
  const id = context.params?.id

  if (id === null) {
    throw new Error('Id not found in URL parameters')
  }

  const response = await fetch(
    `http://localhost:3000/api/gallery?id=${String(id)}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }
  )

  const data = await response.json()

  return {
    props: {
      gallery: data
    }
  }
}

const Show = ({ gallery }: any) => {
  const router = useRouter()
  const { totalRows } = useGalleries()

  const handleNextPage = () => {
    const currentId = Number(router.query.id) || 1
    if (currentId === totalRows) {
      router.push(`/show/1`)
    } else {
      router.push(`/show/${currentId + 1}`)
    }
  }

  const handlePreviosPage = () => {
    const currentId = Number(router.query.id) || 1
    if (currentId !== 1) router.push(`/show/${currentId - 1}`)
  }

  const calculateProgress = () => {
    const currentId = Number(router.query.id) || 1
    return (currentId / totalRows) * 100
  }

  return (
    <div className='flex flex-col h-[calc(100vh-98px)]'>
      <div className='flex-1-auto'>
        <h1>Página de Artículo</h1>
        <span>{gallery?.name}</span>
      </div>
      <footer className='flex w-full items-center justify-center border-t solid border-gray-80 py-4 relative'>
        <div className='w-full flex flex-col justify-center'>
          <span className='text-lg text-black'>{gallery?.name}</span>
          <span className='text-sm text-black opacity-75'>
            {gallery?.artist.name}
          </span>
        </div>
        <div className='w-full flex justify-end gap-6 items-center'>
          <IconContext.Provider value={{ size: '2rem' }}>
            <FiSkipBack
              onClick={handlePreviosPage}
              className={`${
                Number(router.query.id) !== 1
                  ? 'text-black hover:text-[#D8D8D8]'
                  : 'text-[#D8D8D8]'
              } hover:text-[#D8D8D8] cursor-pointer`}
            />
          </IconContext.Provider>
          <IconContext.Provider value={{ size: '2rem' }}>
            <FiSkipForward
              onClick={handleNextPage}
              className='hover:text-[#D8D8D8] cursor-pointer'
            />
          </IconContext.Provider>
        </div>
        <div
          className='absolute top-0 left-0 w-full h-[1px] bg-black'
          style={{ width: `${calculateProgress()}%` }}
        />
      </footer>
    </div>
  )
}

export default Show
