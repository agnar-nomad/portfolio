"use client"
import { Project } from "@/src/models/ApiModels"
import NetworkBadges from "../common/NetworkBadges";
import CategoryBadges from "../common/CategoryBadges";

export default function DetailsModal({ data }: { data: Project }) {

  const id = data.id.toString();

  const handleClick = () => {
    const element = document.getElementById(id) as HTMLDialogElement
    element.showModal()
  }

  const { project_twitter_url, project_website_url, project_discord_url, networks, categories,
    project_telegram_url, project_mint_link, project_mint_price, description
  } = data

  return (
    <>
      <button className="btn btn-xs btn-outline" onClick={handleClick}>
        Details
      </button>
      <dialog id={id} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box w-11/12 sm:w-9/12 max-w-3xl">
          <h3 className="font-bold text-lg"> {data.title} <span className="opacity-50 text-base">(details)</span></h3>
          <div className="grid gap-2 grid-cols-[1fr,auto] my-4">
            <span>Website:</span>
            <span>{project_website_url ? project_website_url : "none"}</span>
            <span>Twitter:</span>
            <span>{project_twitter_url ? project_twitter_url : "none"}</span>
            <span>Discord:</span>
            <span>{project_discord_url ? project_discord_url : "none"}</span>
            <span>Telegram:</span>
            <span>{project_telegram_url ? project_telegram_url : "none"}</span>
            <span>Mint link:</span>
            <span>{project_mint_link ? project_mint_link : "none"}</span>
            <span>Mint price:</span>
            <span>{project_mint_price ? project_mint_price : "none"}</span>
            <span>Networks:</span>
            <span><NetworkBadges networks={networks} /></span>
            <span>Categories:</span>
            <span><CategoryBadges categories={categories} /></span>
            <span>Description:</span>
            <span>{description ? description : "none"}</span>
          </div>


          <p className="pt-4 -mb-4 opacity-40">Press ESC key or click the button below to close</p>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn btn-sm">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  )
}