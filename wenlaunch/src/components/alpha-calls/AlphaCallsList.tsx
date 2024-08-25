import { fetchAlphaCallsData } from "@/src/lib/fetchers";
import AlphaCallCard from "./AlphaCallCard";
import Toast from "../common/Toast";


export default async function AlphaCallsList() {
  const data = await fetchAlphaCallsData();

  if (!data || data.length === 0) {
    return (
      <Toast type="warning">
        Apologies. The server returned no data.
      </Toast>)
  }

  return (
    <section className="alpha-call-list grid gap-12 my-8">
      {data.map((project, i) => (
        <AlphaCallCard key={project.id} project={project} />
      ))}
    </section>
  );
}