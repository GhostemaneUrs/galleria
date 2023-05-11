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
    <div className='columns-4 gap-5 mb-10'>
      {data?.galleries.map((item: Gallery) => {
        return (
          <div
            key={item?.id}
            className='w-full break-inside-avoid mb-5 relative'
          >
            <Image
              width={500}
              height={500}
              alt={item?.name}
              src={item?.gallery}
              className='w-full h-full object-contain'
            />
            <div className='w-full flex flex-col justify-end items-start p-4 max-w-[346px] absolute inset-0'>
              <span className='text-white text-2xl font-bold'>
                {item?.name}
              </span>
              <span className='text-white opacity-70 text-sm'>
                {item?.artist}
              </span>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default Home
