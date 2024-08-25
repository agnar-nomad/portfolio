import React from 'react'
import Divider from '@/src/components/common/Divider'
import Link from 'next/link'
import { AlphaCardLoader } from '@/src/components/alpha-calls/AlphaCallCard'
import AlphaCallsList from '@/src/components/alpha-calls/AlphaCallsList'

export default function AlphaCallsPage() {

  return (
    <main className='grid mx-auto p-2 max-w-7xl'>
      <section className="flex items-center justify-between">
        <h2 className="text-bold text-2xl pt-4">Alpha Calls</h2>
        <Link href={"/alpha-calls/submit"} className='btn btn-secondary btn-sm max-w-fit self-end'>Submit Alpha</Link>
      </section>

      <Divider />

      <section className='opacity-90 space-y-1'>
        <p className='text-xl'><strong>HIGH RISK projects!</strong></p>
        <p>
          The following are user-submitted, risky &apos;degen&apos; plays. While they are subject to moderator approval, they are never guaranteed to be safe. Always DYOR and use temporary wallets. These are <strong>HIGH risk</strong>, potentially high reward opportunities.
        </p>
        <p>
          <strong className='text-lg text-primary'>Warning!</strong>{" "} We take NO responsibility for any outcomes after using this information for trading purposes! This is not financial advice!
        </p>
      </section>

      <React.Suspense fallback={<LoadingComponent />}>
        <AlphaCallsList />
      </React.Suspense>

    </main>
  )
}

function LoadingComponent() {
  return (
    <section className='space-y-6'>
      <AlphaCardLoader />
      <AlphaCardLoader />
      <AlphaCardLoader />
    </section>
  )
}