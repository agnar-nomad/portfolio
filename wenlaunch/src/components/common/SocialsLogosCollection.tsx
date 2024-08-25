import React from 'react'
import SocialsLogo from './SocialsLogo'
import { Project } from '@/src/models/ApiModels'

interface Props {
  project: Project
  className?: string
  logoSize?: string | number
}

export default function SocialsLogosCollection({ project, className, logoSize }: Props) {

  const webUrl = project.project_website_url;
  const twUrl = project.project_twitter_url;
  const tgUrl = project.project_telegram_url;
  let dcUrl = null;
  let wpUrl = null;

  if ('project_discord_url' in project && 'project_whitepaper_url' in project) {
    dcUrl = project.project_discord_url;
    wpUrl = project.project_whitepaper_url
  }

  return (
    <div className={`card-actions ${className ?? ''}`} >
      {webUrl && <SocialsLogo link={webUrl} size={logoSize} logo="website" />}
      {twUrl && <SocialsLogo link={twUrl} size={logoSize} logo="twitter" />}
      {dcUrl && <SocialsLogo link={dcUrl} size={logoSize} logo="discord" />}
      {tgUrl && <SocialsLogo link={tgUrl} size={logoSize} logo="telegram" />}
      {wpUrl && <SocialsLogo link={wpUrl} size={logoSize} logo="whitepaper" />}
    </div>
  )
}
