"use client"

import { useEffect, useMemo, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { ApiMetadata, Project } from "@/src/models/ApiModels";
import { BACKEND_URL, PAGINATION_SIZE } from "@/config";
import { getYesterdayDateString } from "@/src/lib/helpers";
import Divider from "@/src/components/common/Divider";
import Pagination from "@/src/components/common/Pagination";
import FiltersArea, { FilterFields } from "@/src/components/all-projects/FiltersArea";
import { useCreateQueryString } from "@/src/lib/hooks";
import ProjectCard, { SkeletonProjectCard, SkeletonProjectCard2 } from "@/src/components/homepage/ProjectCard";
import { TbFaceIdError } from "react-icons/tb";
import { fetchOptions } from "@/src/lib/fetchers";


// for RSC
// type SearchParamsType = {
//   [key: string]: string | string[] | undefined
// }

// interface Props {
//   searchParams: SearchParamsType
// }
// export default function AllProjectsPage({ searchParams }: Props) {



// for client components
export default function AllProjectsPage() {

  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const [loading, setLoading] = useState(true)
  const [renderData, setRenderData] = useState<Project[]>([])
  const [pagination, setPagination] = useState<ApiMetadata['pagination'] | null>(null)

  const mintEnded = useMemo(() => searchParams.get(FilterFields.MINT_ENDED) === "true" ? true : false, [searchParams])
  const currentFutureProjectsOnly = useMemo(() => {
    const val = searchParams.get(FilterFields.CURRENT_ONLY)
    if (val) {
      return val === "true" ? true : false
    } else {
      return true
    }
  }, [searchParams])

  const networksParams = useMemo(() => searchParams.getAll(FilterFields.NETWORK), [searchParams])
  const categoriesParams = useMemo(() => searchParams.getAll(FilterFields.CATEGORY), [searchParams])

  const paginationPage = useMemo(() => parseInt(searchParams.get(FilterFields.PAGE) || '1'), [searchParams])
  const titleParam = useMemo(() => searchParams.get(FilterFields.TITLE) || '', [searchParams])


  async function fetchData() {
    setLoading(true)

    const url = BACKEND_URL

    const yesterday = getYesterdayDateString()

    const filterFromDate = currentFutureProjectsOnly ? `&filters[project_launch_datetime][$gte]=${yesterday}` : '';
    const sortBy = `sort=project_launch_datetime:asc`
    const paginationOpt = `&pagination[pageSize]=${PAGINATION_SIZE}&pagination[page]=${paginationPage}`
    const networkOpt = networksParams.length > 0 ?
      networksParams.map(p => `&filters[networks][slug][$eq]=${p}`).join('')
      : ''
    const categoryOpt = categoriesParams.length > 0 ?
      categoriesParams.map(p => `&filters[categories][slug][$eq]=${p}`).join('')
      : ''
    const titleSearchQuery = titleParam ? `&filters[title][$containsi]=${titleParam}` : ''
    const postMintOnly = mintEnded ? `&filters[project_mint_ended][$eq]=${mintEnded}` : ''
    const queryString = `?${sortBy}${filterFromDate}${titleSearchQuery}${networkOpt}${categoryOpt}${postMintOnly}${paginationOpt}&populate=*`;

    const res = await fetch(`${url}/projects/${queryString}`, {
      ...fetchOptions,
      cache: "no-store",
    });
    if (res.ok) {
      const { data, meta }: { data: Project[], meta: ApiMetadata } = await res.json();

      setPagination(meta.pagination)
      setRenderData(data)
      setLoading(false)

    } else {
      console.error("Fetch Error", res)
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [paginationPage]
  )

  // a way to track prev values and then compare with current values 
  const prevParams = useRef<{ searchParams: URLSearchParams, pathname: string } | undefined>();

  useEffect(() => {
    // This block will run after every render
    // Compare prevParams.current and searchParams here
    if (prevParams.current?.searchParams && prevParams.current.searchParams.toString() !== '' && searchParams.toString() === '' && prevParams.current.pathname === pathname) {
      fetchData() // when searchParams are cleared (when you click /all while on /all with some searchParams), we need a new fetch
    } else return

    // Update the reference to the current searchParams for the next render
    prevParams.current = { searchParams, pathname };
  });

  const createQueryString = useCreateQueryString()

  const onPaginationClick = (page: string) => {
    if (parseInt(page) === paginationPage) return
    router.push(pathname + '?' + createQueryString('page', page))
  }

  const handleSubmit = () => {
    onPaginationClick('1')
    fetchData()
  }


  return (
    <main className="p-2 md:py-8 xl:px-0">

      <h2 className="font-semibold text-2xl pt-4">All Projects</h2>
      <Divider />

      <section className="grid gap-4 md:gap-8">
        <FiltersArea loading={loading} onSubmit={handleSubmit} className="mb-12" />

        <div className="flex flex-wrap gap-8 justify-center">
          {loading ?
            // <div className="loading loading-ring loading-lg mx-auto"></div>
            <LoadingPlaceholders />
            :
            <>
              {renderData.length === 0 ?
                <p className="font-semibold flex flex-col items-center justify-center gap-2">
                  <TbFaceIdError className="h-10 w-10" />
                  <span>Sorry, we have not found projects that match the given parameters.</span>
                </p> :
                renderData?.map((item, i) => (
                  <ProjectCard key={item.id} project={item} />
                ))}
            </>
          }
        </div>

        <div className="px-2 md:px-6 lg:px-12 text-right">
          <Pagination onClick={onPaginationClick} currentPage={paginationPage} lastPage={pagination?.pageCount} />
        </div>

      </section>
    </main>
  )
}


function LoadingPlaceholders({ noOfItems }: { noOfItems?: number }) {
  const array = useMemo(() => Array.from({ length: noOfItems ?? PAGINATION_SIZE }, (_, idx) => idx + 1), [noOfItems])

  return (<>
    {
      array.map((i) => (
        <SkeletonProjectCard key={i} />
      ))
    }
  </>)
}
