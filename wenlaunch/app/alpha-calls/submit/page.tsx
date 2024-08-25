'use client'
import React from 'react'

export default function SubmitAlphaCallPage() {

  const Form = React.lazy(() => import('@/src/components/alpha-calls/AlphaCallSubmissionForm'))

  return (
    <main className='grid mx-auto p-2 max-w-7xl'>
      <section>
        <h2 className='text-3xl sm:text-5xl font-bold'>New Alpha Call submission</h2>
        <div className="py-2 opacity-80 space-y-1">
          <p>
            By submitting an Alpha call, you are contributing to a community of hard-core web3 enthusiasts who follow the newest events in the space. This info will be also broadcast to our Discord Bot sitting in <strong>(20+ servers)</strong> and <strong>our Twitter/X page</strong>.
          </p>
          <p>
            <strong className='text-lg text-primary'>Warning!</strong>{" "} We take NO responsibility for any outcomes after using this information for trading purposes! These are HIGH risk, potentially high reward opportunities. Do not spam and only submit projects that you genuinly believe in.</p>
        </div>
      </section >

      <section>
        <React.Suspense fallback={<LoadingComponent />}>
          <Form />
        </React.Suspense>
      </section>
    </main>
  )
}

function LoadingComponent() {
  return (
    <div className='w-full text-center py-16'>
      <p className='loading loading-bars loading-lg bg-primary'></p>
      <p className='font-semibold text-xl'>Loading...</p>
    </div>
  )
}