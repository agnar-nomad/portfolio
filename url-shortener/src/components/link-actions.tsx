import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useDeleteUrl } from '@/hooks/api-hooks';
import { downloadFile } from '@/lib/utils';
import { URLsType } from '@/types/supabase';
import { Copy, Download, Trash2 } from 'lucide-react';
import { Button } from './ui/button';
import { BeatLoader } from 'react-spinners';
import toast from "react-hot-toast";


type LinkActionsProps = {
  urlData: URLsType
}

export default function LinkActions({ urlData }: LinkActionsProps) {

  const { isPending: deleteLoading, mutate: deleteMutation } = useDeleteUrl(urlData.id)

  const handleCopy = () => {
    try {
      navigator?.clipboard.writeText(`https://trimmr.in/${urlData?.short_url}`);
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

  const handleDelete = () => deleteMutation()


  return (
    <div className="flex gap-2">
      <Button variant="ghost" onClick={handleCopy}>
        <Copy className="" />
      </Button>
      <Button variant="ghost" onClick={handleDownload}>
        <Download className="" />
      </Button>

      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="ghost">
            {deleteLoading ? (
              <BeatLoader color="white" size={5} />
            ) : (
              <Trash2 className="text-red-500" />
            )}
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete your link and all its data.
              <br />
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}