import { useMemo } from "react"


interface Props {
  lastPage?: number
  currentPage?: number
  onClick: (page: string) => void
  className?: string
}

export default function Pagination({
  lastPage = 2,
  currentPage = 1,
  onClick,
  className
}: Props) {


  const pages = useMemo(() => Array.from({ length: lastPage ? lastPage : 1 }, (_, i) => i + 1), [lastPage])

  const clickHandler = (page: string) => () => onClick(page)

  return (
    <>
      <div className={`join ${className ?? ''}`}>
        {pages.map((page, i) => (
          <button key={page}
            className={`join-item flex-1 btn btn-square ${page === currentPage ? 'btn-active' : ''}`}
            onClick={clickHandler(page.toString())}
          >{page}</button>
        ))}
      </div>
    </>
  )
}