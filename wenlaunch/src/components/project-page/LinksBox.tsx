import React from 'react'
import { Project } from '@/src/models/ApiModels'
import SocialsLogosCollection from '../common/SocialsLogosCollection'
import MarketplaceLogo from '../common/MarketplaceLogo'
import SpecialMintButton from '../common/SpecialMintButton'


interface Props {
  project: Project
  className?: string
}

export default function LinksBox({ project, className }: Props) {

  const { project_mint_link, project_mint_ended, marketplace_links } = project
  return (
    <section className={`grid grid-flow-row gap-6 items-center justify-items-center content-start ${className ?? ''}`}>
      <h3 className='uppercase text-xl font-semibold text-center hidden md:block'>Project Links</h3>
      {project_mint_link && !project_mint_ended &&
        <SpecialMintButton href={project_mint_link} className='mx-auto' />
      }
      <div className="flex gap-2 md:gap-4 flex-wrap justify-center">
        {marketplace_links?.map(item => (
          <MarketplaceLogo logo={item.name} link={item.url} key={item.url} size={26} />
        ))}
      </div>
      <SocialsLogosCollection project={project} logoSize={26} className='justify-center gap-2 md:gap-4' />
    </section>
  )
}