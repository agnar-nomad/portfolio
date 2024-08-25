import { Suspense } from 'react';
import Banner from '@/src/components/homepage/Banner';
import Divider from '@/src/components/common/Divider';
import ProjectList from '@/src/components/homepage/ProjectList';
import { BannerLoader, ProjectListLoader } from '@/src/components/common/LoaderComponents';

// TODO fix Markdown compoenent and sanitization rules for &apos;

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
