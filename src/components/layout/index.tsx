import { PropsWithChildren } from 'react'
import { Header } from '@/component/header'

interface LayoutProps {
  children: PropsWithChildren<React.ReactNode>
}
export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className='flex flex-col min-h-screen'>
      <Header />
      <main className='flex-1-auto w-full max-w-[1440px] m-auto px-4'>
        {children}
      </main>
    </div>
  )
}
