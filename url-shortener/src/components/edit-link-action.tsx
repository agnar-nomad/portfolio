import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import InputError from './input-error';
import { Card } from './ui/card';
import { useState } from 'react';
import { NewLinkSchema, NewLinkSchemaType } from '@/lib/schemas';
import { useEditUrl } from '@/hooks/api-hooks';
import * as v from 'valibot';
import { Edit } from 'lucide-react';
import { URLsType } from '@/types/supabase';
import { Label } from './ui/label';
import { websiteShortcut } from '@/lib/config';
import LoaderIndicator from './loader-indicator';

type NewLinkSchema = typeof NewLinkSchema
type FormErrorKey = v.IssueDotPath<NewLinkSchema>

type EditSchemaType = Omit<NewLinkSchemaType, 'longUrl'>

type EditLinkProps = {
  urlData: URLsType
}
export default function EditLink({ urlData }: EditLinkProps) {

  const [formErrors, setFormErrors] = useState<Partial<Record<FormErrorKey, string>>>({});
  const [formValues, setFormValues] = useState<EditSchemaType>({
    title: urlData.title || '',
    customUrl: urlData.custom_url || '',
  });
  const [modalOpen, setModalOpen] = useState(false)

  const {
    isPending: editUrlLoading,
    error: editUrlError,
    mutateAsync: editUrlMutationAsync,
  } = useEditUrl()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormValues({
      ...formValues,
      [id]: value,
    });
  };

  const handleEditUrl = async () => {
    setFormErrors({});
    try {
      // validate form data
      v.parse(NewLinkSchema, { ...formValues, longUrl: urlData.original_url })

      // send all data to API
      await editUrlMutationAsync({
        ...formValues,
        urlId: urlData.id,
        longUrl: urlData.original_url as string
      });
      setModalOpen(false)
    } catch (error) {
      if (v.isValiError<NewLinkSchema>(error)) {
        // specific error handling from Valibot
        const flatIssues = v.flatten<NewLinkSchema>(error.issues)
        const newErrors: Partial<Record<FormErrorKey, string>> = {};

        for (const key in flatIssues.nested) {
          newErrors[key as FormErrorKey] =
            flatIssues.nested[key as FormErrorKey]![0];
        }

        setFormErrors(newErrors);

      } else {
        console.error("Edit Link Error", error)
        throw error
      }
    }
  };


  return (
    <Dialog open={modalOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" onClick={() => setModalOpen(true)}>
          <Edit />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-bold text-2xl">Edit this link</DialogTitle>
        </DialogHeader>

        <Label htmlFor='title'>Title</Label>
        <Input
          id="title"
          required
          value={formValues?.title ?? ""}
          onChange={handleInputChange}
        />
        {formErrors?.title && <InputError message={formErrors.title} />}
        <Label htmlFor='longUrl'>Original URL</Label>
        <Input
          id="longUrl"
          disabled
          value={urlData?.original_url ?? ""}
        />
        {formErrors?.longUrl && <InputError message={formErrors.longUrl} />}
        <Label htmlFor='shortUrl'>Short URL (handled by us)</Label>
        <Input
          id="shortUrl"
          disabled
          value={urlData?.short_url ?? ""}
        />
        <Label htmlFor='customUrl'>Custom URL</Label>
        <span className="flex items-center gap-2">
          <Card className="p-2">{websiteShortcut}</Card> /
          <Input
            id="customUrl"
            placeholder="Custom link (optional)"
            value={formValues?.customUrl ?? ""}
            onChange={handleInputChange}
          />
        </span>
        {editUrlError && <InputError message={editUrlError.message} />}

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="secondary" onClick={() => setModalOpen(false)}>
              Close
            </Button>
          </DialogClose>
          <Button onClick={handleEditUrl} disabled={editUrlLoading}>
            {editUrlLoading ? (
              <LoaderIndicator />
            ) : (
              'Save changes'
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
