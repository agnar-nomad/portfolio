import React from 'react';
import { FaTwitter, FaDiscord, FaTelegramPlane, FaQuestion } from 'react-icons/fa';
import { RiArticleFill as ArticleLogo } from 'react-icons/ri';
import { TbWorldWww as WebsiteLogo } from 'react-icons/tb';
import Link from 'next/link';
import { removeHttp } from '@/src/lib/helpers';

interface ISocialLogo {
  link: string;
  logo: string;
  color?: string;
  size?: number | string
}

export default function SocialsLogo({
  link,
  color,
  logo,
  size
}: ISocialLogo): JSX.Element {
  if (!link) return <></>;

  const fallbackSize = '22';
  const logoSize = size || fallbackSize

  let logoShow;
  let tooltipText = '';

  switch (logo) {
    case 'website':
      logoShow = <WebsiteLogo size={logoSize} color={'#89ba16'} />;
      tooltipText = 'Go to official website';
      break;
    case 'twitter':
      logoShow = <FaTwitter size={logoSize} color={'#1da1f2'} />;
      tooltipText = 'Go to project Twitter page';
      break;
    case 'discord':
      logoShow = <FaDiscord size={logoSize} color={'#5865f2'} />;
      tooltipText = 'Join Discord server';
      break;
    case 'telegram':
      logoShow = <FaTelegramPlane size={logoSize} color={'#0088cc'} />;
      tooltipText = 'Go to Telegram channel';
      break;
    case 'whitepaper':
      logoShow = <ArticleLogo size={logoSize} color={'#'} />;
      tooltipText = 'Read whitepaper';
      break;
    default:
      logoShow = <FaQuestion size={logoSize} color={color || '#'} />;
      const urlWithoutHttp = removeHttp(link)
      tooltipText = 'Go to ' + urlWithoutHttp.substring(0, 20) + '...'
      break;
  }

  return (
    <div className="tooltip tooltip-accent" data-tip={tooltipText}>
      <Link className={`btn btn-sm bg-base-200`} href={link} target='_blank' referrerPolicy='no-referrer'>
        {logoShow}
      </Link>
    </div>
  );
};