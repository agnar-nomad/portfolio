'use client'
import React from 'react';
import { LIGHT_THEME } from '@/config';
import { useTheme } from '../../context/ThemeContext';
import WenlaunchLogo from '/public/wl__full--light.svg';
import WenlaunchLogoDark from '/public/wl__full--dark.svg'
import Image from 'next/image';
import { DesktopNav, MobileNav } from '../header/Navigation';
import ThemeChanger from '../header/ThemeChanger';
import Link from 'next/link';


export default function Header(): JSX.Element {

  const { theme } = useTheme()

  return (
    <header className="flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-4 p-2 lg:py-10 relative">
      <section>
        <Link href="/">
          <Image
            src={theme === LIGHT_THEME ? WenlaunchLogoDark : WenlaunchLogo}
            alt={'Logo of Wenlaunch'}
            height={200}
            width={500}
            priority
          /></Link>
        <h1 className="absolute opacity-0 -left-full">Wenlaunch</h1>
        <p className="text-xl sm:text-2xl font-semibold">
          Your curated crypto projects list.
        </p>
        <DesktopNav />
      </section>
      <section className='w-full sm:w-auto flex items-center justify-between'>
        <div>
          <MobileNav />
        </div>
        <div className='sm:w-auto block'>
          <Link className="btn btn-sm sm:btn-md sm:w-full bg-gradient-to-r from-primary via-secondary to-accent bg-[length:200%_200%] bg-left hover:animate-backgroundGradient hover:no-underline font-bold text-white"
            href={'/submit-project'}>
            Submit Project
          </Link>
          <ThemeChanger />
        </div>
      </section>

    </header>
  );
};