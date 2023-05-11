export const Header = () => {
  return (
    <div className='w-full px-4 pt-10 m-auto max-w-[1440px]'>
      <header className='flex justify-between items-center mb-10'>
        <h1 className='text-black text-4xl font-bold'>galleria.</h1>
        <span className='text-sm font-bold text-gray-90 hover:text-black hover:underline cursor-pointer'>
          START SLIDESHOW
        </span>
      </header>
      <div className='border solid border-gray-80 mb-10' />
    </div>
  )
}
