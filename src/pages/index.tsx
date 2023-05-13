import useSWR from 'swr'
import Image from 'next/image'
import { useState } from 'react'
import { Gallery } from '@/type/galleria'

const Home = () => {
  const [filters, setFilters] = useState({
    skip: 1,
    limit: 15
  })

  const { data } = useSWR(
    `/api/galleries?${new URLSearchParams(
      Object.entries(filters)
        .map(([key, value]) => `${key}=${String(value)}`)
        .join('&')
    ).toString()}`,
    async (url: string) => await fetch(url).then(async res => await res.json())
  )

  return (
    <div className='columns-1 sm:columns-2 xl:columns-3 2xl:columns-4 sm:gap-5 mb-10'>
      {data?.galleries.map((item: Gallery) => {
        return (
          <div
            key={item?.id}
            className='w-full h-full break-inside-avoid mb-6 relative cursor-pointer hover:scale-110 transition-all duration-300'
          >
            <Image
              width={600}
              height={600}
              alt={item?.name}
              src={item?.images.gallery}
              className='w-full h-full object-contain object-center'
            />
            <div className='w-full flex flex-col justify-end items-start p-4 absolute inset-0 bg-gradient'>
              <span className='text-white text-2xl font-bold'>
                {item?.name}
              </span>
              <span className='text-white opacity-70 text-sm'>
                {item?.artist.name}
              </span>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default Home
