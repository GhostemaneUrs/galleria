import Link from 'next/link'
import { usePathname } from 'next/navigation'

export const Header = () => {
  const pathname = usePathname()
  return (
    <div className='w-full px-4 pt-5 m-auto max-w-[1440px] mb-[30px]'>
      <header className='flex justify-between items-center mb-5'>
        <h1 className='text-black text-4xl font-bold'>galleria.</h1>
        <Link
          href={pathname === '/' ? '/show/1' : '/'}
          className='text-sm font-bold text-gray-90 hover:text-black hover:underline cursor-pointer'
        >
          {pathname === '/' ? 'START SLIDESHOW' : 'STOP SLIDESHOW'}
        </Link>
      </header>
      <div className='border solid border-gray-80' />
    </div>
  )
}
