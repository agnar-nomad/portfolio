import { fetchLatestSubmissionData } from "@/src/lib/fetchers";
import { formatReleaseDate } from "@/src/lib/helpers";
import { Project } from "@/src/models/ApiModels";
import { BsCheck2Square } from "react-icons/bs";
import { ImCross } from "react-icons/im";
import DetailsButton from "@/src/components/latest-submissions/DetailsModal";
import Divider from "@/src/components/common/Divider";


export default async function LatestSubmissionsPage() {

  const data = await fetchLatestSubmissionData();

  if (!data || data.length === 0) {
    return <p>No Data.</p>
  }

  return (
    <main className="p-2 md:py-4 xl:px-0">
      <h2 className="text-bold text-xl pt-4">50 Latest Submissions</h2>
      <Divider />

      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Submission Time</th>
              <th>Submitted By</th>
              <th>Published?</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {data.map((item, idx) => (
              <DataRow data={item} key={item.id} idx={idx} />
            )
            )}
          </tbody>
        </table>
      </div>
    </main>
  )
}

function pickSubmitterName(source: Project["source"]) {
  if (source?.includes("wenlaunch-app-user")) {
    const name = source.split("wenlaunch-app-user-")[1];
    return name.toLocaleUpperCase()
  }
  if (source?.includes("wenlaunch-app-")) {
    const name = source.split("wenlaunch-app-")[1]
    return name.toLocaleUpperCase()
  }
  if (source === "wenlaunch-app") {
    return "App"
  }
  if (source?.includes("Wenlaunch Bot")) {
    return "Bot:" + source.split("Wenlaunch Bot -")[1]
  }
  return ""
}

function DataRow({ data: item, idx = 0 }: { data: Project, idx: number }) {

  const dateTime = formatReleaseDate(item.createdAt)
  const submitter = pickSubmitterName(item.source)

  return (
    <tr className="hover">
      <td>{idx + 1}</td>
      <td>{item.title}</td>
      <td className="flex gap-1">
        <span>{dateTime.date}</span>
        <span>{dateTime.time}</span>
      </td>
      <td>
        {submitter}
      </td>
      <td>
        {item.publishedAt ?
          <BsCheck2Square className="w-4 h-4 text-success" /> :
          <ImCross className="w-4 h-4 text-error" />
        }
      </td>
      <td>
        <DetailsButton data={item} />
      </td>
    </tr>
  )
}