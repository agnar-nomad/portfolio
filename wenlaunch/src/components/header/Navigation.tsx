import React, { useState } from "react"
import Link from "next/link"
import ContactWLIconsCollection from "../common/WLContactIconsCollection"

const CommonNavItems = () => {
  return (<>
    <Link key={'homeLink'} href={'/'}>HOME</Link>
    <a className="hidden sm:inline" key={'socials'} href={'#footer'}>Contact Us</a>
    <Link key={'Submit'} href={'/submit-project'}>Submit</Link>
    <Link key={'AllProjects'} href={'/all-projects'}>All Projects</Link>
    {/* <Link key={'AlphaCalls'} href={'/alpha-calls'}>Alpha</Link> */}
  </>)
}


export function DesktopNav({ className }: { className?: string }) {

  return (
    <nav className={`hidden sm:flex items-center gap-4 font-bold uppercase text-accent text-xs md:text-base ${className ?? ''}`}>
      <CommonNavItems />
    </nav>
  )
}


export function MobileNav({ className }: { className?: string }) {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)

  const toggleMenu = () => {
    const b = document.body
    if (isMenuOpen) {
      setIsMenuOpen(false);
      if (b) {
        b.style.overflow = "auto"
      }
    } else {
      setIsMenuOpen(true);
      if (b) {
        b.style.overflow = "hidden"
      }
    }
  }

  return (
    <div>
      <div className={`${isMenuOpen ? "absolute sm:hidden top-[12vh] left-0 w-full h-screen p-2 bg-base-200/80 z-[100] blur-lg transition" : ""}`} />
      <div className="burger absolute top-28 left-2 z-[122] sm:hidden" onClick={toggleMenu}>
        <div className={`bar1 h-1 w-7 my-1.5 bg-secondary-content duration-300 ${isMenuOpen ? "transform translate-y-1.5 -rotate-45" : ""}`} />
        <div className={`bar2 h-1 w-7 my-1.5 bg-secondary-content ${isMenuOpen ? "hidden" : ""}`} />
        <div className={`bar3 h-1 w-7 my-1.5 bg-secondary-content duration-300  ${isMenuOpen ? "transform -translate-y-1 rotate-45" : ""}`} />
      </div>
      <nav className={`flex sm:hidden items-end gap-8 py-10 px-4 flex-col font-bold text-accent uppercase fixed transform transition-transform ${isMenuOpen ? "translate-x-0" : "-translate-x-full"} left-0 top-24 w-fit bg-base-100 h-screen z-[120] ${className ?? ''}`}>
        <CommonNavItems />
        <ContactWLIconsCollection size={24} className="mt-auto grid grid-cols-3 gap-6 mb-24 text-base-content" />
      </nav>
    </div>
  )
}





