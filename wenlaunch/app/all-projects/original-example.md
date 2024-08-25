```jsx

 const createQueryString = useCallback(
    (name: string, value: string | boolean) => {
      const params = new URLSearchParams(searchParams)
      params.set(name, String(value))

      return params.toString()
    },
    [searchParams]
  )



<div className="my-2">
        <p>Sort By</p>

        {/* using useRouter */}
        <button className="btn"
          onClick={() => {
            // <pathname>?sort=asc
            router.push(pathname + '?' + createQueryString('sort', 'asc'))
          }} > ASC </button>
        {/* using <Link> */}
        <Link className="btn"
          href={
            // <pathname>?sort=desc
            pathname + '?' + createQueryString('sort', 'desc')
          } > DESC </Link>
      </div>


      ```