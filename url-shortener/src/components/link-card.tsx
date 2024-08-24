import { Link } from 'react-router-dom';
import { URLsType } from '@/types/supabase';
import LinkActions from './link-actions';
import { websiteShortcut } from '@/lib/config';


type LinkCardProp = {
  url: URLsType,
}

export default function LinkCard({ url }: LinkCardProp) {

  const fancyLinkToShow = `https://${websiteShortcut}/${url?.custom_url ? url.custom_url : url.short_url}`
  return (
    <article className="flex flex-col md:flex-row gap-5 border p-4 rounded-lg">
      <img
        src={url?.qr || ""}
        alt="QR code"
        className="h-32 w-32 object-contain ring self-start"
      />
      <Link to={`/link/${url?.id}`} className="flex flex-col flex-1">
        <h3 className="text-3xl font-extrabold hover:underline cursor-pointer">
          {url?.title}
        </h3>
        <span className="text-2xl text-accent font-bold hover:underline cursor-pointer">
          {fancyLinkToShow}
        </span>
        <span className=" hover:underline cursor-pointer">
          {url.original_url}
        </span>
        <span className="flex items-end font-extralight text-sm flex-1">
          {new Date(url.created_at).toLocaleString()}
        </span>
      </Link>
      {url ?
        <LinkActions urlData={url} />
        : null
      }
    </article>
  );
}
