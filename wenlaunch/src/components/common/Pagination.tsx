import { useMemo } from "react"


interface Props {
  lastPage?: number
  currentPage?: number
  onClick: (page: string) => void
}

export default function Pagination({
  lastPage = 2,
  currentPage = 1,
  onClick,
}: Props) {


  const pages = useMemo(() => Array.from({ length: lastPage ? lastPage : 1 }, (_, i) => i + 1), [lastPage])

  const clickHandler = (page: string) => () => onClick(page)

  return (
    <>
      <div className="max-w-sm overflow-auto">
        <div className={`join`}>
          {pages.map((page, i) => (
            <button key={page}
              className={`join-item flex-1 btn btn-square ${page === currentPage ? 'btn-active' : ''}`}
              onClick={clickHandler(page.toString())}
            >{page}</button>
          ))}
        </div>
      </div>
    </>
  )
}