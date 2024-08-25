import { fetchHomePageData } from "@/src/lib/fetchers";
import ProjectCard from "./ProjectCard";

export default async function ProjectList() {

  const data = await fetchHomePageData();

  return (
    <>
      {data.map((item, i) => (
        <ProjectCard key={item.id} project={item} />
      )
      )}
    </>
  )
}