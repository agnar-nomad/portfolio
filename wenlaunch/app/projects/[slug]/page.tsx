import { Suspense } from 'react';
import Tabs from '@/src/components/common/Tabs';
import Tab from '@/src/components/common/Tab';
import { fetchProjectPageData } from '@/src/lib/fetchers';
import { formatReleaseDate, formatTokenSupply } from '@/src/lib/helpers';
import ProfileImage from '@/src/components/common/ProfileImage';
import { ParamsType } from '@/src/models/typings';
import Markdown from '@/src/components/common/Markdown';
import NetworkBadges from '@/src/components/common/NetworkBadges';
import CategoryBadges from '@/src/components/common/CategoryBadges';
import SecurityBadgeCollection from '@/src/components/common/SecurityBadgeCollection';
import LinksArea from '@/src/components/project-page/LinksBox'
import GoPlusSecurity from '@/src/components/project-page/GoPlusSecurity';
import GoPlusImg from '@/src/images/logos/GoPlus.svg'
import Image from 'next/image';


export default async function ProjectDetail({ params }: ParamsType) {
  const { slug } = params;

  const projectData = await fetchProjectPageData(slug)

  // Pick up the needed fields
  const { project_launch_datetime, title, description, token_supply, project_mint_price, categories, networks, project_extra_info, blockchain_domain_name, project_contract_address, project_logo, project_website_url, project_launch_datetime_string } = projectData

  // format launch date
  const releaseDate = project_launch_datetime_string ? formatReleaseDate(project_launch_datetime_string) : project_launch_datetime ? formatReleaseDate(project_launch_datetime) : ""

  return (
    <main className='grid gap-6 grid-cols-1 md:grid-cols-[5fr_2fr] mt-12 p-2 lg:p-10'>

      <section className='flex flex-col sm:flex-row gap-4'>
        <div className="justify-self-center">
          <ProfileImage projectTitle={title}
            size={300}
            imageData={project_logo}
            altSrc={projectData.project_logo_external_link}
            highPriority={true} />
        </div>

        <div className='grid gap-1 md:gap-2 content-start'>
          <h2 className='text-4xl sm:text-5xl font-bold'>{title}</h2>
          <SecurityBadgeCollection project={projectData} />

          {releaseDate &&
            <p className='text-base'>Launch date: <br />
              <span className="whitespace-nowrap font-semibold text-lg pl-4">
                {releaseDate.date}&nbsp;{releaseDate.time}
              </span>
            </p>
          }

          <p>Networks:<br /> <NetworkBadges networks={networks} className='pl-4' /></p>
          <p>Project type: <br /> <CategoryBadges categories={categories} className='pl-4' /></p>
        </div>

      </section>

      <LinksArea project={projectData} className='hidden md:grid' />

      <section className='col-span-1'>
        <p className='font-semibold'>{description}</p>
      </section>

      <LinksArea project={projectData} className='grid md:hidden' />

      <Tabs tabStyle='boxed' className='col-start-1 col-end-1 shadow-sm shadow-primary/60' headerClassname='bg-base-100 p-0 shadow-sm shadow-primary/30'
        contentClassname='prose prose-a:no-underline prose-p:leading-relaxed prose-ul:mt-2 prose-ul:mb-2 prose-ol:mt-2 prose-ol:mb-2'>
        <Tab title="Details">
          <>
            <p>Price:
              <span className={`pl-4 ${project_mint_price ? 'font-semibold' : ''}`}>{project_mint_price ?? 'TBA'}</span>
            </p>
            <p>Supply:
              <span className={`pl-4 ${token_supply ? 'font-semibold' : ''}`}>
                {formatTokenSupply(token_supply) ?? 'N/A'}
              </span>
            </p>
            {blockchain_domain_name ? <p>Associated blockchain domain:
              <span className='pl-4 font-semibold'>
                {blockchain_domain_name}
              </span>
            </p> : null}
            {project_contract_address ? <p>Blockchain contract address:<br />
              <a className='pl-4 text-accent'
                href={`https://blockscan.com/address/${project_contract_address}`}
                target='_blank' referrerPolicy='no-referrer'>
                {project_contract_address}</a>
            </p> : null}
          </>
        </Tab>
        <Tab title="Extra info" >
          {project_extra_info ?
            <Markdown>{project_extra_info}</Markdown>
            : 'Not Available'
          }
        </Tab>
        <Tab title={
          <span className='flex items-center gap-2'>
            <Image src={GoPlusImg} height={14} alt='GoPlus logo' />
            <span>Security Info</span>
          </span>
        }>
          <>
            {project_contract_address ?
              <Suspense fallback={<>Loading...</>}>
                <GoPlusSecurity contractAddress={project_contract_address} networks={networks} categories={categories} websiteUrl={project_website_url} />
              </Suspense>
              : null
            }
          </>
        </Tab>
      </Tabs>
    </main >
  );
}