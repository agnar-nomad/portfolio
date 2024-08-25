
import React from 'react'
import {
  formatReleaseDate,
  isValidTwitterUsername,
  truncateBlockchainAddress
} from '@/src/lib/helpers'
import { AlphaCall } from '@/src/models/ApiModels'
import ProfileImage from '../common/ProfileImage'
import Link from 'next/link';
import NetworkBadges from '../common/NetworkBadges';
import CategoryBadges from '../common/CategoryBadges';
import SocialsLogosCollection from '../common/SocialsLogosCollection';
import CopyToClipboard from '../common/CopyToClipboard';
import PopupHint from '../common/PopupHint';
import PrelaunchWarningTag from './PrelaunchWarningTag';

interface AlphaCallCardProps {
  project: AlphaCall
}

export default async function AlphaCallCard({ project }: AlphaCallCardProps) {

  // Pick out the needed fields
  const { project_launch_datetime, title, bullish_case, project_mint_price, project_mint_link, pre_launch_call, categories, networks, token_supply, project_contract_address, project_logo, project_logo_external_link, caller_tip_address, caller_twitter_tag, liquidity_pool_address, ticker_symbol, trading_chart_link } = project

  // format launch date
  const releaseDate = project_launch_datetime && formatReleaseDate(project_launch_datetime);

  return (
    <article className='bg-base-100 relative border border-primary min-w-[320px]'>
      <section className='flex gap-2 sm:gap-4'>
        <div>
          <ProfileImage
            imageData={project_logo}
            altSrc={project_logo_external_link}
            projectTitle={title}
            size={200}
          />
        </div>
        <div className='my-2'>
          <h2 className='text-2xl sm:text-4xl font-bold mb-1'>{title}</h2>
          {releaseDate ?
            <p>
              <span>{releaseDate.date}</span>
              {" "}
              <span>{releaseDate.time}</span>
            </p>
            :
            <p className='text-warning'>No date provided</p>
          }
          <div className="flex flex-wrap gap-2 my-2">
            <NetworkBadges networks={networks} />
            <CategoryBadges categories={categories} />
          </div>
        </div>
        <div className='my-4 ml-auto mr-8 space-y-2 hidden sm:block'>
          <SocialsLogosCollection project={project} className='flex' />
          {ticker_symbol ?
            <p>Ticker Symbol: <span className='font-bold'>{ticker_symbol}</span></p>
            : null}
        </div>
      </section>

      <p className='mt-2 font-semibold sm:text-lg px-1 sm:px-2'> {bullish_case}</p>

      <section className='collapse collapse-arrow'>
        <input type="checkbox" />
        <div className="collapse-title pl-1 sm:pl-2 font-medium max-w-fit">
          View Details
        </div>

        <div className='flex flex-col gap-4 p-1 sm:px-2 collapse-content -mt-3'>
          <div className='sm:text-lg space-y-2'>
            <div className='space-y-2 sm:hidden'>
              <SocialsLogosCollection project={project} className='flex' />
              {ticker_symbol ?
                <p>Ticker Symbol: <span className='font-bold'>{ticker_symbol}</span></p>
                : null}
            </div>
            {project_contract_address ?
              <div className='flex gap-2 items-center'>
                <span>Contract address:</span>
                <PopupHint>
                  {truncateBlockchainAddress(project_contract_address)}
                </PopupHint>
                <CopyToClipboard label='Copy address'
                  className='btn btn-outline btn-sm'
                  text={project_contract_address}
                />
              </div>
              : null
            }
            {project_mint_price ?
              <p>
                <span>Price:&nbsp;</span>
                <span className='font-semibold'>{project_mint_price}</span>
              </p>
              : null
            }
            {caller_twitter_tag ?
              <div className='flex gap-2 items-center'>
                <span>Caller&apos;s twitter username:</span>
                {isValidTwitterUsername(caller_twitter_tag) ?
                  <Link href={"https://twitter.com/" + caller_twitter_tag.slice(1)} referrerPolicy='no-referrer' target='_blank' className='text-accent'>
                    {caller_twitter_tag}
                  </Link>
                  : caller_twitter_tag}
              </div>
              : null
            }
            {caller_tip_address ?
              <div className='flex gap-2 items-center'>
                <span>Caller&apos;s tip address:</span>
                <PopupHint>
                  Want to thank for this alpha? You may express gratitude to the submitter, if you like, by sending a tip to their address: {truncateBlockchainAddress(caller_tip_address)}
                </PopupHint>
                <CopyToClipboard label='Copy address'
                  className='btn btn-outline btn-sm'
                  text={caller_tip_address}
                />
              </div>
              : null
            }
          </div>

          <div className='flex items-center justify-end gap-2 sm:gap-8 flex-wrap mt-auto md:absolute right-3 bottom-3'>
            {trading_chart_link ?
              <Link href={trading_chart_link} target='_blank' referrerPolicy='no-referrer'
                className='btn btn-link border btn-outline'>
                Trading chart
              </Link>
              : null}
            {project_mint_link ?
              <Link href={project_mint_link} target='_blank' referrerPolicy='no-referrer'
                className="btn btn-primary text-white">
                Purchase
              </Link>
              : null}
          </div>
        </div>
      </section>
      {/* TODO add trading link (trading view embed - see dicord convo) showed inside a modal using LP address */}
      {pre_launch_call || !releaseDate ?
        <PrelaunchWarningTag />
        : null
      }
    </article>
  )
}


export function AlphaCardLoader() {
  return (
    <article className='bg-base-100 border border-primary my-4'>
      <section className='flex gap-2 sm:gap-4'>
        <div className='skeleton mb-2 w-36 h-36' />
        <div className='my-2 space-y-2'>
          <p className='skeleton w-28 sm:w-48 h-8' />
          <p className='skeleton w-36 sm:w-56 h-4' />
          <p className='skeleton w-36 sm:w-56 h-6' />
        </div>
      </section>
      <section className='space-y-2'>
        <p className='skeleton h-8' />
        <p className='skeleton h-8' />
      </section>
    </article>
  )
}