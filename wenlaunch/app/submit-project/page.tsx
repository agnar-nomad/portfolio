'use client'
import { SignInButton, SignOutButton, SignedIn, UserButton } from '@clerk/nextjs'
import React from 'react'

export default function SubmitProjectPage() {

  const Form = React.lazy(() => import('@/src/components/submit-project/SubmissionForm'))

  return (
    <>
      <section>
        <SignedIn>
          <div className='flex items-center gap-4 justify-end'>
            <UserButton />
            <span className='btn btn-primary btn-outline border btn-sm'>
              <SignOutButton />
            </span>
          </div>
        </SignedIn>
        <h2 className='text-3xl sm:text-5xl font-bold'>New submission to Wenlaunch</h2>


        <p className='py-2 opacity-80'>
          By submitting a new project, you are contributing to a wider community of web3 enthusiasts who are keen on following new events in the space.
          {/* NOTE: a temporary hidden sign-in on that word, for interns */}
          <span className=''>
            {" "}
            <SignInButton mode='modal' afterSignInUrl='/submit-project'>
              The web3 world.
            </SignInButton>
            {" "}
          </span>
          <span className='hidden md:inline'>
            You also broadcast this information to our network of partners who receive all the data through our Discord Bot <strong>(20+ servers)</strong>. New projects are also posted to <strong>our Twitter/X page</strong> and so are provided to an even larger audience.
          </span>
          <span className="md:hidden">
            This info is also broadcast to our Discord Bot sitting in <strong>(20+ servers)</strong> and <strong>our Twitter/X page</strong>.
          </span>
        </p>
      </section >


      <section>

        <React.Suspense fallback={<LoadingComponent />}>
          <Form />
        </React.Suspense>

      </section>
    </>
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