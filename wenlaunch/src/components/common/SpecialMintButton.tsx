import Link from 'next/link'
import React from 'react'



interface Props {
  href: string
  text?: string
  className?: string
}

export default function SpecialMintButton({ href, text = 'Mint', className }: Props) {

  return (

    <Link href={href} referrerPolicy='no-referrer' className={"btn relative items-center justify-center w-20 sm:w-32 p-1 sm:px-4 overflow-hidden group hover:no-underline " + className} >
      <span className="absolute top-0 left-0 w-40 h-40 -mt-14 -ml-3 bg-accent rounded-full blur-md ease-in-out"></span>
      <span className="absolute inset-0 w-full h-full animate-[spin_20s_ease-out_infinite_alternate]">
        <span className="absolute bottom-0 left-0 w-32 h-32 -ml-10 bg-primary rounded-full blur-md"></span>
        <span className="absolute bottom-0 right-0 w-32 h-32 -mr-10 bg-secondary rounded-full blur-md"></span>
      </span>
      <span className="relative text-white font-extrabold opacity-70 transition-opacity group-hover:opacity-100">{text}</span>
    </Link>
  )
}
