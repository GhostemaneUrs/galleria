import Image from 'next/image'
import { useRouter } from 'next/router'
import { Gallery } from '@/type/galleria'
import { useGalleries } from '@/hook/useGalleries'

const Home = () => {
  const router = useRouter()
  const { galleries, loading } = useGalleries()

  return (
    <div className='columns-1 sm:columns-2 lg:columns-3 xl:columns-4 2xl:columns-4 sm:gap-5 mb-10'>
      {galleries?.data
        ?.filter((gallery: Gallery) => gallery.id !== 16)
        .map((item: Gallery) => {
          return (
            <div
              key={item?.id}
              className='w-full h-full break-inside-avoid mb-6 relative cursor-pointer hover:scale-105 transition-all duration-300'
              onClick={() => {
                router.push(`/show/${item?.id}`).catch(err => {
                  Error(err)
                })
              }}
            >
              <Image
                width={600}
                height={600}
                alt={item?.name}
                src={item?.gallery}
                className='w-full h-full object-contain object-center'
              />
              <div className='w-full h-full p-4 absolute inset-0 bg-gradient'>
                <div className='w-full h-full flex flex-col justify-end items-start xl:max-w-[240px]'>
                  <span className='text-white text-xl lg:text-2xl font-bold'>
                    {item?.name}
                  </span>
                  <span className='text-white opacity-70 text-sm'>
                    {item?.artist}
                  </span>
                </div>
              </div>
            </div>
          )
        })}
    </div>
  )
}

export default Home
