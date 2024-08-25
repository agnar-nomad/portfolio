import React from 'react';
import Image from 'next/image';
import JoepegsLogo from '@/src/images/logos/joepegs-logo.png'
import MagicEdenLogo from '@/src/images/logos/magiceden-logo-pink.svg'
import CampfireLogo from '@/src/images/logos/campfire-logo.png'
import JpegStoreLogo from '@/src/images/logos/jpgstore-logo.svg'
import BlurLogo from '@/src/images/logos/blur-logo-48.png'
import SalvorLogo from '@/src/images/logos/salvor-logo.png'
import NftradeLogo from '@/src/images/logos/nftrade-colorful.svg'
import { PiStorefront } from 'react-icons/pi';
import { SiOpensea } from 'react-icons/si';
import Link from 'next/link';
import { removeHttp } from '@/src/lib/helpers';

interface IMarketplaceLogo {
  link: string;
  color?: string;
  logo: string;
  size?: number
}

export default function MarketplaceLogo({
  link,
  color,
  logo,
  size
}: IMarketplaceLogo): JSX.Element {
  if (link === '' || link === null) return <></>;

  const fallbackSize = 22;
  let logoSize = size || fallbackSize;
  let logoShow;
  let tooltipText = '';

  if (logo.toLowerCase().includes('opensea') || link.includes('opensea')) {
    logoShow = <SiOpensea size={logoSize} color={'#2081e2'} />;
    tooltipText = 'Go to OpenSea'
  }
  else if (logo.toLowerCase().includes('magic eden') || link.includes('magiceden')) {
    logoShow = <Image src={MagicEdenLogo} width={logoSize} height={logoSize} alt={'Magic Eden logo'} />;
    tooltipText = 'Go to Magic Eden'
  }
  else if (logo.toLowerCase().includes('joepegs') || link.includes('joepegs')) {
    logoShow = <Image src={JoepegsLogo} width={logoSize} height={logoSize} alt={'Joepegs logo'} />;
    tooltipText = 'Go to Joepegs'
  }
  else if (logo.toLowerCase().includes('salvor') || link.includes('salvor')) {
    logoShow = <Image src={SalvorLogo} width={logoSize} height={logoSize} alt={'Salvor.io logo'} />;
    tooltipText = 'Go to Salvor.io'
  }
  else if (logo.toLowerCase().includes('blur') || link.includes('blur')) {
    logoShow = <Image src={BlurLogo} width={logoSize} height={logoSize} alt={'Blur NFT Marketplace logo'} />;
    tooltipText = 'Go to Blur Marketplace'
  }
  else if (logo.toLowerCase().includes('jpg store') || link.includes('jpg.store')) {
    logoShow = <Image src={JpegStoreLogo} width={logoSize} height={logoSize} alt={'JPG Store logo'} />;
    tooltipText = 'Go to jpg.store'
  }
  else if (logo.toLowerCase().includes('campfire') || link.includes('campfire')) {
    logoShow = <Image src={CampfireLogo} width={logoSize} height={logoSize} alt={'Campfire logo'} />;
    tooltipText = 'Go to Campfire'
  }
  else if (logo.toLowerCase().includes('nftrade') || link.includes('nftrade')) {
    logoShow = <Image src={NftradeLogo} width={logoSize} height={logoSize} alt={'Nftrade logo'} />;
    tooltipText = 'Go to NFTrade'
  }
  else {
    logoShow = <PiStorefront size={logoSize} className='text-accent' />
    const urlWithoutHttp = removeHttp(link)
    tooltipText = 'Go to ' + urlWithoutHttp.substring(0, 20) + '...'
  }

  return (
    <>
      <div className="tooltip tooltip-accent" data-tip={tooltipText}>
        <Link className={'btn btn-sm bg-base-200 hover:bg-neutral'} href={link} target='_blank' referrerPolicy='no-referrer'>
          {logoShow}
        </Link>
      </div>
    </>
  );
};