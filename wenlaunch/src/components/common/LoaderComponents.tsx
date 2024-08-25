
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
      <SkeletonProjectCard />
      <SkeletonProjectCard />
      <SkeletonProjectCard />
      <SkeletonProjectCard />
      <SkeletonProjectCard />
      <SkeletonProjectCard />
    </>
  )
}


function SkeletonProjectCard() {
  return (
    <article className={`card card-compact h-[500] w-80 bg-base-100 text-base-content border-2 border-secondary`}>
      <section className="card-header relative flex gap-4 px-4 py-2">
        <div className="avatar">
          <div className="skeleton mask mask-squircle w-24"></div>
        </div>

        <div className='grid mt-4'>
          <div className="skeleton text-2xl leading-6 pb-1 pt-2 w-40 h-8"></div>
          <div className='skeleton h-4 w-44' />
        </div>
      </section>

      <section className="card-body">
        <div className='skeleton h-6' />
        <div className='skeleton my-1 h-24 text-base'></div>
        <div className='grid grid-flow-col-dense gap-4 text-base'>
          <div className='skeleton h-4 w-1/2'></div>
          <div className='skeleton h-4 w-1/2'></div>
        </div>

        <div className='skeleton h-8' />

        <div className="grid gap-2">
          <div className='skeleton h-4 w-56' />
          <div className='skeleton h-4 w-32' />
        </div>
      </section>

      <section className="card-footer flex items-center justify-end gap-4 p-4">
        <div className='skeleton btn w-28' />
        <div className='skeleton btn w-28' />
      </section>
    </article>
  )
}