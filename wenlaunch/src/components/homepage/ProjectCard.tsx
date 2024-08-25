import React from 'react';
import { Project } from '@/src/models/ApiModels';
import Link from 'next/link';
import { formatReleaseDate, formatTokenSupply } from '@/src/lib/helpers';
import ProfileImage from '../common/ProfileImage';
import SecurityBadgeCollection from '../common/SecurityBadgeCollection';
import SocialsLogosCollection from '../common/SocialsLogosCollection';
import NetworkBadges from '../common/NetworkBadges';
import CategoryBadges from '../common/CategoryBadges';
import Skeleton from '../common/Skeleton';

interface ProjectCardProps {
  project: Project;
}

// TODO: update showing rating

export default function ProjectCard({ project }: ProjectCardProps) {

  // pick out needed fields
  const { project_launch_datetime, title, description, project_rating, token_supply, project_mint_price, slug, project_mint_link, project_mint_ended, categories, networks, project_launch_datetime_string } = project

  // format launch date
  const releaseDate = project_launch_datetime_string ? formatReleaseDate(project_launch_datetime_string) : project_launch_datetime ? formatReleaseDate(project_launch_datetime) : ""

  return (
    <>
      <article className={`card card-compact h-[500] w-80 bg-base-100 text-base-content border-2 border-secondary`}>
        <section className="card-header relative flex gap-4 overflow-y-hidden px-4 py-2">
          <div className="avatar">
            <div className="mask mask-squircle w-24">
              <ProfileImage projectTitle={title}
                imageData={project.project_logo}
                size={100}
                altSrc={project.project_logo_external_link}
              />
            </div>
          </div>

          <div className='grid'>
            <h3 className="text-2xl leading-6 font-bold pb-1 pt-2">{title}</h3>
            {releaseDate && <p className='text-sm'>{releaseDate.date}{' '}{releaseDate.time}</p>}
          </div>
          {/* <button className="glass no-animation btn-circle btn-lg btn absolute -right-6 -top-2 text-2xl font-bold text-green-500">
            {project_rating ?? '?'}
          </button> */}
        </section>

        <section className="card-body">
          <SecurityBadgeCollection project={project} />
          <div className='my-1 h-24 text-base'>
            <p className="line-clamp-4 font-medium">{description}</p>
          </div>
          <div className='grid grid-flow-col-dense gap-4 text-base'>
            <p>
              <span>Price:&nbsp;</span>
              <span className='font-semibold'>
                {project_mint_price ? project_mint_price : 'TBA'}
              </span>
            </p>
            {token_supply ?
              <p>
                <span>Supply:&nbsp;</span>
                <span className='font-semibold'>{formatTokenSupply(token_supply)}</span>
              </p> : null
            }
          </div>

          <SocialsLogosCollection project={project} />

          <div className="grid gap-2">
            <NetworkBadges networks={networks} />
            <CategoryBadges categories={categories} />
          </div>
        </section>

        <section className="card-footer flex items-center justify-end gap-4 p-4">
          <Link href={`/projects/${slug}`} className="btn btn-primary text-accent-content">
            View Details
          </Link>
          {project_mint_link && !project_mint_ended &&
            <Link className="btn btn-accent"
              referrerPolicy='no-referrer'
              target='_blank'
              href={project_mint_link}>
              Mint Link
            </Link>
          }
        </section>
      </article>
    </>
  );
}


// one with our Skeleton and another with daisyui skeleton (v4) just to see difference
export function SkeletonProjectCard() {
  return (
    <article className={`card card-compact h-[500] w-80 bg-base-100 text-base-content border-2 border-secondary`}>
      <section className="card-header relative flex gap-4 px-4 py-2">
        <div className="avatar">
          <Skeleton className="mask mask-squircle w-24"></Skeleton>
        </div>

        <div className='grid mt-4'>
          <Skeleton className="text-2xl leading-6 pb-1 pt-2 w-40 h-8"></Skeleton>
          <Skeleton className='h-4 w-44' />
        </div>
      </section>

      <section className="card-body">
        <Skeleton className='h-6' />
        <Skeleton className='my-1 h-24 text-base'></Skeleton>
        <div className='grid grid-flow-col-dense gap-4 text-base'>
          <Skeleton className='h-4 w-1/2'></Skeleton>
          <Skeleton className='h-4 w-1/2'></Skeleton>
        </div>

        <Skeleton className='h-8' />

        <div className="grid gap-2">
          <Skeleton className='h-4 w-56' />
          <Skeleton className='h-4 w-32' />
        </div>
      </section>

      <section className="card-footer flex items-center justify-end gap-4 p-4">
        <Skeleton className='btn w-28' />
        <Skeleton className='btn w-28' />
      </section>
    </article>
  )
}

export function SkeletonProjectCard2() {
  return (
    <article className={`card card-compact h-[500] w-80 bg-base-100 text-base-content border-2 border-secondary`}>
      <section className="card-header relative flex gap-4 px-4 py-2">
        <div className="avatar">
          <div className="skeleton mask mask-squircle w-24"></div>
        </div>

        <div className='grid mt-4'>
          <div className="skeleton text-2xl leading-6 pb-1 pt-2 w-40 h-8"></div>
          <div className='skeleton h-4 w-44' />
        </div>
      </section>

      <section className="card-body">
        <div className='skeleton h-6' />
        <div className='skeleton my-1 h-24 text-base'></div>
        <div className='grid grid-flow-col-dense gap-4 text-base'>
          <div className='skeleton h-4 w-1/2'></div>
          <div className='skeleton h-4 w-1/2'></div>
        </div>

        <div className='skeleton h-8' />

        <div className="grid gap-2">
          <div className='skeleton h-4 w-56' />
          <div className='skeleton h-4 w-32' />
        </div>
      </section>

      <section className="card-footer flex items-center justify-end gap-4 p-4">
        <div className='skeleton btn w-28' />
        <div className='skeleton btn w-28' />
      </section>
    </article>
  )
}