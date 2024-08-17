import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import { Copy, Download, Trash2 } from 'lucide-react';
import { BeatLoader } from 'react-spinners';
import { URLsType } from '@/types/supabase';
import { useDeleteUrl } from '@/hooks/api-hooks';
import { downloadFile } from '@/lib/utils';


type LinkCardProp = {
  url: URLsType,
}

export default function LinkCard({ url }: LinkCardProp) {

  const { isPending: deleteLoading, mutate: deleteMutation } = useDeleteUrl(url.id)

  const handleCopy = () => {
    navigator?.clipboard.writeText(`https://trimmr.in/${url?.short_url}`);
  };

  const handleDownload = () => {
    const imageUrl = url?.qr || "";
    const fileName = url?.title || "file";

    downloadFile(imageUrl, fileName)
  };

  const handleDelete = () => deleteMutation()

  return (
    <article className="flex flex-col md:flex-row gap-5 border p-4 bg-gray-900 rounded-lg">
      <img
        src={url?.qr || ""}
        alt="QR code"
        className="h-32 w-32 object-contain ring ring-blue-500 self-start"
      />
      <Link to={`/link/${url?.id}`} className="flex flex-col flex-1">
        <h3 className="text-3xl font-extrabold hover:underline cursor-pointer">
          {url?.title}
        </h3>
        <span className="text-2xl text-blue-400 font-bold hover:underline cursor-pointer">
          https://trimmr.in/{url?.custom_url ? url?.custom_url : url.short_url}
        </span>
        <span className=" hover:underline cursor-pointer">
          {url.original_url}
        </span>
        <span className="flex items-end font-extralight text-sm flex-1">
          {new Date(url.created_at).toLocaleString()}
        </span>
      </Link>
      <div className="flex gap-2">
        <Button variant="ghost" onClick={handleCopy}>
          <Copy />
        </Button>
        <Button variant="ghost" onClick={handleDownload}>
          <Download />
        </Button>
        <Button variant="ghost" onClick={handleDelete}>
          {deleteLoading ? (
            <BeatLoader color="white" size={5} />
          ) : (
            <Trash2 className="text-red-500" />
          )}
        </Button>
      </div>
    </article>
  );
}
