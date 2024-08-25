import { SkeletonProjectCard2 } from "../homepage/ProjectCard"




export function BannerLoader() {

  return (
    <>
      <article className='flex bg-base-100 gap-2 sm:gap-4 border-4 p-1 border-gray-500'>
        <section className='min-w-[144px] sm:min-w-[200px] pb-1'>
          <div className="skeleton w-32 h-32 sm:w-48 sm:h-48"></div>
          <div className='my-2 grid justify-items-center gap-2'>
            <p className='skeleton h-4 w-20'></p>
            <p className='skeleton h-4 w-32'></p>
          </div>
        </section>

        <section className='flex flex-col gap-2 p-1 sm:px-2 text-left grow'>
          <h2 className='skeleton h-6 sm:h-8 w-1/2 my-2'></h2>
          <span className="skeleton h-3 w-1/3"></span>
          <p className='mt-2 skeleton h-4'></p>
          <p className='mt-1 skeleton h-4'></p>
          <p className='mt-1 skeleton h-4 w-1/2'></p>

          <div className='flex gap-4 md:gap-16 flex-wrap sm:text-lg py-2'>
            <p className="skeleton h-4 w-20"></p>
            <p className="skeleton h-4 w-32"></p>
          </div>

          <div className='flex items-center justify-end gap-2 sm:gap-8 flex-wrap mt-auto sm:absolute right-8 bottom-4'>
            <span className="skeleton h-12 w-24"></span>
            <span className="skeleton h-12 w-24"></span>
          </div>
        </section>
      </article>
    </>
  )
}


export function ProjectListLoader() {

  return (
    <>
      <SkeletonProjectCard2 />
      <SkeletonProjectCard2 />
      <SkeletonProjectCard2 />
      <SkeletonProjectCard2 />
      <SkeletonProjectCard2 />
      <SkeletonProjectCard2 />
    </>
  )
}