import { useSearchParams } from "next/navigation"
import { useCallback } from "react"

type useCreateQueryValuesType = string | boolean | number | (string | number)[]

export function useCreateQueryString() {
  const searchParams = useSearchParams()

  return useCallback((name: string, values: useCreateQueryValuesType) => {
      const params = new URLSearchParams(searchParams)

      if (Array.isArray(values)) {
        params.delete(name)
        values.forEach(element => params.append(name, String(element))
        );
      } else {
        params.set(name, String(values))
      }
      return params.toString()
    },
    [searchParams]
  )
}