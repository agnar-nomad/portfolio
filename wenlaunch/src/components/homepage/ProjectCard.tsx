import React from 'react';
import { Project } from '@/src/models/ApiModels';
import Link from 'next/link';
import { formatReleaseDate, formatTokenSupply } from '@/src/lib/helpers';
import ProfileImage from '../common/ProfileImage';
import SecurityBadgeCollection from '../common/SecurityBadgeCollection';
import SocialsLogosCollection from '../common/SocialsLogosCollection';
import NetworkBadges from '../common/NetworkBadges';
import CategoryBadges from '../common/CategoryBadges';

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {

  // pick out needed fields
  const { project_launch_datetime, title, description, token_supply, project_mint_price, slug, project_mint_link, project_mint_ended, categories, networks, project_launch_datetime_string } = project

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