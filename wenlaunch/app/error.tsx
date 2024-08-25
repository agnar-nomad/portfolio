'use client'

import Divider from "@/src/components/common/Divider"
import ErrorPageComponent from "@/src/components/common/ErrorPageComponent"
import { ErrorPageProps } from "@/src/models/typings"

export default function Error({ error, reset }: ErrorPageProps) {

  return (
    <main className="p-2 md:py-8 xl:px-0">
      <h2 className="font-semibold text-2xl">Sorry! Something went wrong.</h2>
      <Divider />
      <ErrorPageComponent error={error} reset={reset} />
    </main>
  )
}