'use client'

import * as Sentry from '@sentry/nextjs'
import Divider from "@/src/components/common/Divider"
import ErrorPageComponent from "@/src/components/common/ErrorPageComponent"
import Footer from "@/src/components/common/Footer"
import Header from "@/src/components/common/Header"
import { ErrorPageProps } from "@/src/models/typings"
import { useEffect } from 'react'


export default function GlobalError({ error, reset }: ErrorPageProps) {

  console.log('Global Error Page Error component: ', { message: error.message, error })

  useEffect(() => {
    Sentry.captureException(error)
  }, [error])

  return (
    <html>
      <body>
        <Header />
        <main className="p-2 md:py-8 xl:px-0">
          <h2 className="font-semibold text-2xl">Something went wrong in the app!</h2>
          <Divider />
          <ErrorPageComponent error={error} reset={reset} />
          <Divider />
        </main>
        <Footer />
      </body>
    </html>
  )
}