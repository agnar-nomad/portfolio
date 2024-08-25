import { Suspense } from 'react';
import Banner from '@/src/components/homepage/Banner';
import Divider from '@/src/components/common/Divider';
import ProjectList from '@/src/components/homepage/ProjectList';
import { BannerLoader, ProjectListLoader } from '@/src/components/common/LoaderComponents';

// export const revalidate = 60;

// TODO fix Markdown compoenent and sanitization rules for &apos;
// TODO add GoPlus data usage to Terms and Conditions (and no cookies?)
// TODO send API token from /all-projects in a cookie instead of header -
//  EDIT: call a route handler for client FE and sort it in there
// TODO sanitize submitted formdata on the server
// TODO find out why Terms and Conditions is a dynamic page
// TODO implement ReactQuery into helpers?
// TODO
// TODO
// TODO

// TODO update Strapi data in the discord notification (add person, chain?)
// TODO update Strapi https://www.youtube.com/watch?v=PtVH6u64AYg
// TODO update Strapi Typescript
// TODO update Strapi https://www.restack.io/docs/strapi-knowledge-strapi-node-version-compatibility#clq3a9d060um9vh0vd5kj417n
// TODO metadata and SEO
// TODO LightHouse and SEO optimisation

// TODO InStatus footer component?
// TODO
// TODO dextools chart on project page

// TODO page cache revalidation https://youtu.be/VBlSe8tvg4U
// TODO page cache revalidation https://nextjs.org/docs/app/building-your-application/caching
// TODO page cache revalidation https://blog.webdevsimplified.com/2024-01/next-js-app-router-cache/
// TODO Ratings component
// TODO
// TODO

// TODO auth wallet and discord to link user accounts and then serve this for discord bot


export default async function HomePage() {

  return (
    <main className="p-2 md:py-8 xl:px-0">

      <h2 className="text-bold text-2xl pt-4">Featured Project</h2>
      <Divider />

      <Suspense fallback={<BannerLoader />}>
        <Banner />
      </Suspense>

      <h2 className="text-bold text-2xl pt-4">Upcoming Projects</h2>
      <Divider />

      <section className="flex flex-wrap gap-8 justify-center">
        <Suspense fallback={<ProjectListLoader />}>
          <ProjectList />
        </Suspense>
      </section>

    </main>
  );
}
