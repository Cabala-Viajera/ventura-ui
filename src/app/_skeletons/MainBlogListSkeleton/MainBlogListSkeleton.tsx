const MainBlogListSkeleton = ({ count = 6 }: { count?: number }) => {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center my-10'>
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className='w-full max-w-[350px] h-[250px] bg-orange-100 animate-pulse rounded-2xl'
        ></div>
      ))}
    </div>
  )
}

export default MainBlogListSkeleton
