import Image from 'next/image'
import { useState } from 'react'
import { useRouter } from 'next/router'
import { IconContext } from 'react-icons'
import { DetailGallery } from '@/type/galleria'
import { useGalleries } from '@/hook/useGalleries'
import { URL_GATEWAY } from '@/constant/environment'
import { type GetServerSidePropsContext } from 'next'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FiSkipBack,
  FiPlayCircle,
  FiSkipForward,
  FiPauseCircle
} from 'react-icons/fi'

export async function getServerSideProps(
  context: GetServerSidePropsContext
): Promise<{ props: { gallery: DetailGallery } }> {
  const id = context.params?.id

  if (id === null) {
    throw new Error('Id not found in URL parameters')
  }

  const response = await fetch(`${URL_GATEWAY}/api/gallery?id=${String(id)}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })

  const data = await response.json()

  return {
    props: {
      gallery: data
    }
  }
}

const Show = ({ gallery }: { gallery: DetailGallery }) => {
  const router = useRouter()
  const { galleries } = useGalleries()
  const [isPlaying, setIsPlaying] = useState<boolean>(false)

  const handleNextPage = () => {
    const currentId = Number(router.query.id) || 1
    if (currentId === galleries?.totalRows) {
      router.push('/show/1')
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
    return (currentId / galleries?.totalRows) * 100
  }

  return (
    <div className='w-full flex flex-col h-[calc(100vh-94px)]'>
      <div className='flex-1-auto w-full mb-10 flex justify-center items-center h-full'>
        <AnimatePresence mode='wait'>
          <motion.div
            key={gallery?.id}
            exit={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            initial={{ opacity: 0, x: 100 }}
            className='w-full flex justify-between h-full items-center'
            transition={{ duration: 0.4, ease: 'easeInOut' }}
          >
            <div className='w-full flex relative max-w-[720px] h-full'>
              <Image
                priority
                width={500}
                height={540}
                alt={gallery?.name}
                src={gallery?.images?.hero?.large}
                className='w-full h-auto object-cover max-w-[480px]'
              />
              <div className='w-full max-w-[390px] bg-white absolute -right-[110px] pl-14 py-16 flex flex-col gap-3'>
                <span className='text-5xl text-black font-bold'>
                  {gallery?.name}
                </span>
                <span className='text-base text-[#7D7D7D]'>
                  {gallery?.artist?.name}
                </span>
              </div>
              <div className='flex w-full absolute -bottom-[30px] right-0 max-w-[220px]'>
                <Image
                  width={128}
                  height={128}
                  alt={gallery?.artist?.name}
                  src={gallery?.artist?.image}
                  className='w-full max-w-[128px] h-full max-h-[128px] object-cover'
                />
              </div>
            </div>
            <div className='w-full flex flex-col justify-center items-center relative max-w-[390px] xl:max-w-[500px] '>
              <div className='w-full text-start xl:text-right'>
                <span className='text-[160px] 2xl:text-[200px] text-[#F3F3F3] leading-none'>
                  {gallery?.year}
                </span>
              </div>
              <div className='w-full max-w-[450px] z-10 relative'>
                <p className='text-[#7D7D7D] text-base font-bold leading-7'>
                  {gallery?.description}
                </p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
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
            {isPlaying ? (
              <FiPauseCircle
                onClick={() => {
                  setIsPlaying(!isPlaying)
                }}
                className='text-[#D8D8D8] cursor-pointer'
              />
            ) : (
              <FiPlayCircle
                onClick={() => {
                  setIsPlaying(!isPlaying)
                }}
                className='hover:text-[#D8D8D8] cursor-pointer'
              />
            )}
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
