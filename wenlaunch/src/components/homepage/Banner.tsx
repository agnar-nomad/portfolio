import React from 'react'
import { fetchBannerData } from '@/src/lib/fetchers'
import { formatReleaseDate, formatTokenSupply } from '@/src/lib/helpers'
import { Project } from '@/src/models/ApiModels'
import ProfileImage from '../common/ProfileImage'
import MarketplaceLogo from '../common/MarketplaceLogo';
import SpecialMintButton from '../common/SpecialMintButton';
import Link from 'next/link';
import SecurityBadgeCollection from '../common/SecurityBadgeCollection';
import NetworkBadges from '../common/NetworkBadges';
import CategoryBadges from '../common/CategoryBadges';
import SocialsLogosCollection from '../common/SocialsLogosCollection';

export default async function Banner() {
  const bannerData = await fetchBannerData()
  const data = bannerData[0]

  if (!data || bannerData.length < 1) {
    return <></>
  }

  // Pick out the needed fields
  const { project_launch_datetime, title, description, project_mint_price, slug, project_mint_link, project_mint_ended, categories, networks, marketplace_links, token_supply, project_launch_datetime_string } = data

  // format launch date
  const releaseDate = project_launch_datetime_string ? formatReleaseDate(project_launch_datetime_string) : project_launch_datetime ? formatReleaseDate(project_launch_datetime) : ""

  return (
    <>
      <div className="banner-wrapper p-2 my-4 bg-gradient-to-tr from-primary via-secondary to-accent bg-[length:_200%_200%] animate-animateBorder">
        <article className='flex bg-base-100 gap-2 sm:gap-4 relative'>
          <section className='min-w-[144px] sm:min-w-[200px] text-center pb-1'>
            <ProfileImage
              imageData={data.project_logo}
              altSrc={data.project_logo_external_link}
              projectTitle={data.title}
              size={200}
              highPriority={true}
            />
            <div className='font-bold my-2'>
              {releaseDate && <>
                <p className='text-xl'>{releaseDate.time}</p>
                <p className='text-base'>{releaseDate.date}</p>
              </>}
            </div>
            <div className="grid gap-2 m-2 sm:hidden">
              <NetworkBadges networks={networks} />
              <CategoryBadges categories={categories} />
            </div>
            <Marketplaces links={marketplace_links} className='hidden sm:grid' />
          </section>

          <section className='flex flex-col gap-2 p-1 sm:px-2 text-left grow'>
            <h2 className='text-2xl sm:text-4xl font-bold mb-4'>{title}</h2>
            <SecurityBadgeCollection project={data} showFalseAlso={true} />
            <p className='mt-2 font-semibold sm:text-lg'> {description}</p>

            <div className='flex gap-4 md:gap-16 flex-wrap sm:text-lg'>
              {project_mint_price ?
                <p>
                  <span>Price:&nbsp;</span>
                  <span className='font-semibold'>{project_mint_price}</span>
                </p> : null
              }
              {token_supply ?
                <p>
                  <span>Supply:&nbsp;</span>
                  <span className='font-semibold'>{formatTokenSupply(token_supply)}</span>
                </p> : null
              }
            </div>

            <SocialsLogosCollection project={data} className='hidden sm:flex' />
            <div className="gap-2 hidden sm:grid">
              <NetworkBadges networks={networks} />
              <CategoryBadges categories={categories} />
            </div>

            <div className='flex items-center justify-end gap-2 sm:gap-8 flex-wrap mt-auto sm:absolute right-1 bottom-1'>
              <Link href={`/projects/${slug}`} className="btn btn-primary text-white" >
                View Details
              </Link>
              {project_mint_link && !project_mint_ended ?
                <SpecialMintButton href={project_mint_link} className='' />
                : null}
            </div>
          </section>
          {bannerData.length > 1 ?
            <span className='badge badge-warning badge-sm absolute -right-3 -top-3' />
            : null
          }
        </article>
      </div >
    </>

  )
}


const Marketplaces = ({ links, className }: {
  links: Project["marketplace_links"],
  className?: string
}) => (
  <div className={`grid gap-1 grid-cols-2 sm:grid-cols-3 ${className ?? ''}`}>
    {links?.map(item => (
      <MarketplaceLogo logo={item.name} link={item.url} key={item.url} />
    ))}
  </div>
)