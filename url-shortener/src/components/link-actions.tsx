import { URLsType } from '@/types/supabase';
import { Copy, Download } from 'lucide-react';
import { Button } from './ui/button';
import { downloadFile } from '@/lib/utils';
import toast from "react-hot-toast";
import EditLink from "./edit-link-action";
import DeleteLink from "./delete-link-action";
import { websiteDomain } from '@/lib/config';


type LinkActionsProps = {
  urlData: URLsType
}

export default function LinkActions({ urlData }: LinkActionsProps) {

  const handleCopy = () => {
    try {
      const linkToGo = `${websiteDomain}/${urlData?.short_url}`
      navigator?.clipboard.writeText(linkToGo);
      toast.success("Link URL copied.")
    } catch {
      toast.error("Failed to copy link URL to clipboard. Try again.")
    }
  };

  const handleDownload = () => {
    const imageUrl = urlData?.qr || "";
    const fileName = urlData?.title || "file";
    if (imageUrl && fileName) {
      downloadFile(imageUrl, fileName)
    } else {
      toast.error("There is something wrong with the file. Refresh page and try again.")
    }
  };

  return (
    <div className="flex gap-2">
      <Button variant="ghost" onClick={handleCopy}>
        <Copy className="" />
      </Button>
      <Button variant="ghost" onClick={handleDownload}>
        <Download className="" />
      </Button>

      <EditLink urlData={urlData} />

      <DeleteLink urlId={urlData.id} />
    </div>
  )
}