import { headers } from 'next/headers'
import Link from 'next/link'
import Image from 'next/image'
import errorImage404Purple from '@/src/images/404-error-robot-purple-amico.svg'
import errorImage404Yellow from '@/src/images/404-error-robot-yellow-cuate.svg'
import Divider from '@/src/components/common/Divider'


export default function NotFound() {

  const headerInstance = headers()
  const referrer = headerInstance.get('referer')
  const domain = headerInstance.get('host')
  let route = null;
  if (referrer && domain && referrer.includes(domain)) {
    route = referrer.substring(referrer.indexOf(domain) + domain.length)
  }
  const source = errorImage404Purple;

  return (
    <main className='flex flex-col items-center'>
      <Image src={source} alt='404 error illustration' />
      <Divider />
      <div className='text-center sm:font-semibold'>
        <p>Sorry, the requested link <span>{route ? `( ${route} )` : ''}</span> is not available on our server anymore. </p>
        <p>Try checking for a typo or go back.</p>
        <p>Return <Link href="/" className='text-accent hover:underline'>Home</Link></p>

      </div>

    </main>
  )
}




// attribution

// purple svg
// <a href="https://storyset.com/web">Web illustrations by Storyset</a>


// yellow svg
// <a href="https://storyset.com/internet">Internet illustrations by Storyset</a>