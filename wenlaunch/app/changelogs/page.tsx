

import Divider from '@/src/components/common/Divider';
import Markdown from '@/src/components/common/Markdown';
import { fetchChangelogPageData } from '@/src/lib/fetchers'
import React from 'react'

export default async function ChangelogsPage() {

  const changelogs = await fetchChangelogPageData() ?? [];


  return (
    <main className='p-2'>
      <h2 className="font-bold text-3xl pt-4">Change Logs</h2>
      <Divider />

      {changelogs.map(log => {

        const { title, backend_changes, frontend_changes, additional_info } = log

        const extraProseStyles = "prose-ul:mt-1 prose-li:my-1 prose-h4:mt-3"

        return (

          <article key={log.id} className='mb-8'>
            <h2 className='font-bold text-2xl py-4'> {title}</h2>
            <section className='grid gap-4 md:gap-6 sm:grid-cols-2 justify-between'>
              <div>
                <h3 className='mb-0 text-xl font-bold'>Frontend Changes</h3>
                {frontend_changes ?
                  <Markdown content={frontend_changes}
                    className={extraProseStyles} />
                  : <span>N/A</span>}
              </div>
              <div>
                <h3 className='mb-0 text-xl font-bold'>Backend Changes</h3>
                {backend_changes ?
                  <Markdown content={backend_changes}
                    className={extraProseStyles} />
                  : <span>N/A</span>}
              </div>
            </section>
            {additional_info ? <Markdown content={additional_info} className={extraProseStyles} /> : null}
          </article>


        )
      })}
    </main>
  )
}
