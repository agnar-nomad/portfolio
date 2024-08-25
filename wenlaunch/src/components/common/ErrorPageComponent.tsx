
import errorImagePurple from '@/src/images/error-animation-purple.svg'
import errorImageYellow from '@/src/images/error-animation-yellow.svg'
import { ErrorPageProps } from "@/src/models/typings"
import Image from "next/image"
import { usePathname } from 'next/navigation'
import { useEffect } from "react"
import * as Sentry from '@sentry/nextjs'
import { useTheme } from '../../context/ThemeContext'


export default function ErrorPageComponent({ error, reset }: ErrorPageProps) {

  const pathname = usePathname()
  const { isDarkMode } = useTheme()

  useEffect(() => {
    const path = pathname;
    console.error('ErrorPageComponent: ', { error, digest: error?.digest });

    Sentry.captureException(error);
    Sentry.captureMessage(`Exception with digest no: ${error?.digest}; on this path: ${path}; and at this time: ${new Date().toISOString()}.`)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error.name])

  const source = isDarkMode ? errorImagePurple : errorImageYellow;

  return (
    <div className='flex flex-col items-center w-full justify-center'>
      <div className='text-center'>
        <p>You can try running the last action again using this button.</p>
        <button className="btn btn-primary opacity-60 hover:opacity-90 my-1" onClick={() => reset()}>Try again</button>
        <p>If that doesn&rsquo;t work, please contact us.</p>
      </div>
      <Image src={source}
        alt="Error animation"
        width={500}
        height={500}
        className="w-full max-w-3xl" />
    </div>
  )
}




{/* <a href="https://storyset.com/people">People illustrations by Storyset</a> */ }
