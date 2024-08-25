import { FaTwitter, FaDiscord, FaMedium, FaEnvelope, FaYoutube } from 'react-icons/fa'
import { SiNotion, SiLinktree } from 'react-icons/si'
import Link from 'next/link'
import AavyDomainsLogo from './AavyDomainsLogo'

const socialsClassNames = 'hover:fill-[#41e607]'

export default function ContactWLIconsCollection({ className, size }: { className?: string, size?: number }) {

  const socialIconSize = size || 24

  return (
    <div className={className || "grid grid-flow-col gap-4 md:gap-6"}>
      <Link href={"https://twitter.com/wenlaunchinfo"} target='_blank' referrerPolicy='no-referrer'>
        <FaTwitter size={socialIconSize} color={''} className={socialsClassNames} />
      </Link>
      <Link href={"https://discord.gg/ayFNfpRaN9"} target='_blank' referrerPolicy='no-referrer'>
        <FaDiscord size={socialIconSize} color={''} className={socialsClassNames} />
      </Link>
      <Link href={"mailto:team@wenlaunch.info"} target='_blank' referrerPolicy='no-referrer'>
        <FaEnvelope size={socialIconSize} color={''} className={socialsClassNames} />
      </Link>
      <Link href={"https://wenlaunch.notion.site/wenlaunch/Wenlaunch-Wiki-00dfd1b9f64a4a3fb0e435ebda8a25fc"} target='_blank' referrerPolicy='no-referrer'>
        <SiNotion size={socialIconSize} color={''} className={socialsClassNames} />
      </Link>
      <Link href={"https://medium.com/@wenlaunch"} target='_blank' referrerPolicy='no-referrer'>
        <FaMedium size={socialIconSize} color={''} className={socialsClassNames} />
      </Link>
      <Link href={"https://linktr.ee/wenlaunch"} target='_blank' referrerPolicy='no-referrer'>
        <SiLinktree size={socialIconSize} color={''} className={socialsClassNames} />
      </Link>
      <Link href={"https://www.youtube.com/watch?v=VJW53_smtkU"} target='_blank' referrerPolicy='no-referrer'>
        <FaYoutube size={socialIconSize} color={''} className={socialsClassNames} />
      </Link>
      <Link href={"https://wenlaunch.avax.sh/"} target='_blank' referrerPolicy='no-referrer'>
        <AavyDomainsLogo size={socialIconSize} color={''} className={socialsClassNames} />
      </Link>
    </div>
  )
}