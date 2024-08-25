import React from 'react'
import acidWLInitialsLogo from '/public/wl__initials--acid.svg'
import Image from 'next/image'
import ContactWLIconsCollection from './WLContactIconsCollection'

const socialIconSize = 24

export default function Footer() {

  return (<>
    <footer className="footer grid-flow-row sm:grid-flow-col place-items-start bg-gradient-to-b from-base-100 via-base-200 via-40% to-base-300 text-base-content p-2 py-4 md:py-6 lg:py-10 " id="footer">
      <div className='order-last sm:order-first'>
        <Image src={acidWLInitialsLogo} height={socialIconSize * 4} width={socialIconSize * 4} alt="Alternative logo of Wenlaunch" />
        <span className="footer-title mb-0 mt-2">Wenlaunch</span>
        <p className='font-semibold'> The only source of crypto launches you will ever need</p>
        <p>© by Agnar 2023</p>
      </div>
      <div>
        <span className="footer-title">Wenlaunch Links</span>
        <ContactWLIconsCollection className='grid grid-flow-col gap-4 md:gap-6' size={socialIconSize} />
        <p>
          <a className='hover:text-[#41e607] hover:no-underline'
            href={"/terms-conditions-privacy#terms-conditions"}>
            Terms and Conditions
          </a>
        </p>
        <p>
          <a className='hover:text-[#41e607] hover:no-underline'
            href={"/terms-conditions-privacy#privacy-policy"}>
            Privacy policy
          </a>
        </p>
      </div>
    </footer>
  </>
  )
}


