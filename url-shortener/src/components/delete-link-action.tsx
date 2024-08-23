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
} from "@/components/ui/alert-dialog";
import { Trash2 } from 'lucide-react';
import { Button } from './ui/button';
import { useDeleteUrl } from "@/hooks/api-hooks";
import { URLsType } from "@/types/supabase";
import LoaderIndicator from "./loader-indicator";


type DeleteLinkProps = {
  urlId: URLsType["id"]
}
export default function DeleteLink({ urlId }: DeleteLinkProps) {

  const { isPending: deleteLoading, mutate: deleteMutation } = useDeleteUrl(urlId)

  const handleDelete = () => deleteMutation()

  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="ghost">
            {deleteLoading ? (
              <LoaderIndicator smaller />
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
      </AlertDialog></>
  )
}