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
    <div className='w-full flex flex-col h-full lg:h-[calc(100vh-94px)] overflow-x-hidden'>
      <div className='flex-1-auto w-full mb-6 2xl:mb-10 flex justify-center items-center h-full'>
        <AnimatePresence mode='wait'>
          <motion.div
            key={gallery?.id}
            exit={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            initial={{ opacity: 0, x: 100 }}
            className='w-full h-full flex flex-col justify-center  gap-28 mg:gap-36 lg:gap-20 xl:flex-row xl:gap-0 xl:justify-between xl:items-center'
            transition={{ duration: 0.35, ease: 'easeInOut' }}
          >
            <div className='w-full flex flex-col lg:flex-row relative xl:max-w-[720px] h-auto'>
              <Image
                width={600}
                height={600}
                priority={false}
                alt={gallery?.name}
                src={gallery?.images?.hero?.large}
                className='w-full max-h-[500px] object-cover md:max-h-[700px] lg:object-cover lg:h-auto lg:max-w-[350px] xl:max-w-[425px] 2xl:max-w-[470px]'
              />
              <div className='flex bg-white w-full max-w-[300px] sm:max-w-[350px] md:max-w-[600px] gap-2 p-4 absolute bottom-[-80px] lg:hidden'>
                <div className='flex flex-col w-full'>
                  <span className='text-2xl md:text-5xl text-black font-bold'>
                    {gallery?.name}
                  </span>
                  <span className='text-sm md:text-base text-[#7D7D7D]'>
                    {gallery?.artist?.name}
                  </span>
                </div>
                <Image
                  width={80}
                  height={80}
                  alt={gallery?.artist?.name}
                  src={gallery?.artist?.image}
                  className='w-full max-w-[80px] h-full max-h-[80px] object-cover'
                />
              </div>
              <div
                className='bg-white w-full max-w-[500px] xl:max-w-[400px] hidden lg:flex flex-col pl-5 py-5 gap-3 absolute lg:right-[200px] xl:pl-14 xl:py-16
               xl:right-[-60px] 2xl:right-[-80px]'
              >
                <span className='text-5xl text-black font-bold'>
                  {gallery?.name}
                </span>
                <span className='text-base text-[#7D7D7D]'>
                  {gallery?.artist?.name}
                </span>
              </div>
              <div className='w-full z-10 hidden lg:flex xl:hidden absolute bottom-0 right-0 lg:max-w-[500px] xl:max-w-[400px] text-justify'>
                <p className='text-[#7D7D7D] text-base font-bold '>
                  {gallery?.description}
                </p>
              </div>
              <div className='w-full max-w-[128px] absolute hidden lg:flex right-0 xl:-bottom-[10px] 2xl:-bottom-[20px] xl:right-[150px] 2xl:right-[110px]'>
                <Image
                  width={128}
                  height={128}
                  alt={gallery?.artist?.name}
                  src={gallery?.artist?.image}
                  className='w-full max-w-[128px] h-full max-h-[128px] object-cover'
                />
              </div>
            </div>
            <div className='w-full flex lg:hidden xl:flex xl:flex-col justify-center items-start xl:max-w-[450px] xl:gap-8 '>
              <div className='w-full xl:text-end hidden xl:block'>
                <span className='text-[200px] xl:text-[200px] text-[#F3F3F3] leading-none'>
                  {gallery?.year}
                </span>
              </div>
              <div className='w-full z-10 text-justify'>
                <p className='text-[#7D7D7D] text-lg xl:text-base font-bold'>
                  {gallery?.description}
                </p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
      <footer className='flex w-full items-center justify-center border-t solid border-gray-80 py-2 2xl:py-4 relative'>
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
