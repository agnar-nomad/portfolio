import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import { Copy, Download, Trash2 } from 'lucide-react';
import useFetch from '@/hooks/use-fetch';
import { deleteUrl } from '@/db/api-urls';
import { BeatLoader } from 'react-spinners';

/* eslint-disable react/prop-types */
export default function LinkCard({ url, fetchUrls }) {
  const { loading: deleteLoading, fn: deleteFn } = useFetch(deleteUrl, url?.id);

  const handleCopy = () => {
    navigator?.clipboard.writeText(`https://trimmr.in/${url?.short_url}`);
  };

  const handleDownload = () => {
    const imageUrl = url?.qr;
    const fileName = url?.title;

    const anchor = document.createElement('a');
    anchor.href = imageUrl;
    anchor.download = fileName;

    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
  };

  const handleDelete = () => {
    deleteFn().then(() => fetchUrls());
  };

  return (
    <div className="flex flex-col md:flex-row gap-5 border p-4 bg-gray-900 rounded-lg">
      <img
        src={url?.qr}
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
          {new Date(url?.created_at).toLocaleString()}
        </span>
      </Link>
      <div className="flex gap-2">
        <Button variant="ghost" onClick={handleCopy}>
          <Copy className="" />
        </Button>
        <Button variant="ghost" onClick={handleDownload}>
          <Download className="" />
        </Button>
        <Button variant="ghost" onClick={handleDelete}>
          {deleteLoading ? (
            <BeatLoader color="white" size={5} />
          ) : (
            <Trash2 className="text-red-500" />
          )}
        </Button>
      </div>
    </div>
  );
}
