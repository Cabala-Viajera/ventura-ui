const MainBlogListSkeleton = ({ count = 6 }: { count?: number }) => {
  return (
    <div className='flex flex-wrap gap-6 justify-center lg:justify-start m-10'>
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className='w-[350px] h-[250px] bg-orange-100 animate-pulse rounded-2xl'
        ></div>
      ))}
    </div>
  )
}

export default MainBlogListSkeleton
