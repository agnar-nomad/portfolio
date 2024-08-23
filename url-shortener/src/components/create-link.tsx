import { useSearchParams } from 'react-router-dom';
import {
  Dialog,
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
import { QRCode } from 'react-qrcode-logo';
import { useRef } from 'react';
import { BeatLoader } from 'react-spinners';
import { NewLinkSchema, NewLinkSchemaType } from '@/lib/schemas';
import { useCreateNewUrl, useUser } from '@/hooks/api-hooks';
import * as v from 'valibot';
import { websiteShortcut } from '@/lib/config';

type NewLinkSchema = typeof NewLinkSchema
type FormErrorKey = v.IssueDotPath<NewLinkSchema>

export default function CreateLink() {
  const { user } = useUser();
  const [searchParams, setSearchParams] = useSearchParams();
  const createNewUrlSearchParam = searchParams.get('createNew');

  const qrCodeRef = useRef<QRCode>(null);
  const [formErrors, setFormErrors] = useState<Partial<Record<FormErrorKey, string>>>({});
  const [formValues, setFormValues] = useState<NewLinkSchemaType>({
    title: '',
    longUrl: createNewUrlSearchParam ? createNewUrlSearchParam : '',
    customUrl: '',
  });

  const {
    isPending: createUrlLoading,
    error: createUrlError,
    mutateAsync: createUrlMutationAsync
  } = useCreateNewUrl()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormValues({
      ...formValues,
      [id]: value,
    });
  };

  const createNewLink = async () => {
    setFormErrors({});
    try {
      // validate form data
      v.parse(NewLinkSchema, formValues)

      let qrCodeBlob = undefined

      if (qrCodeRef.current) {
        // extract the qr code image from the component
        // @ts-expect-error I simply need to access canvasRef to get the actual image file
        const qrCodeCanvas = qrCodeRef.current.canvasRef.current;
        qrCodeBlob = await new Promise((resolve) =>
          qrCodeCanvas.toBlob(resolve)
        ) as Blob;
      }

      // send all data to API
      await createUrlMutationAsync({ ...formValues, userId: user?.id ?? "", qrCode: qrCodeBlob });
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
        console.error("Create New Link Error", error)
        throw error
      }
    }
  };


  return (
    <Dialog
      defaultOpen={!!createNewUrlSearchParam}
      // open by default, if url search param is found
      onOpenChange={(res) => {
        // if we close the dialog, remove data from url bar too
        if (!res) setSearchParams({});
      }}>
      <DialogTrigger asChild>
        <Button variant="destructive">Create New Link</Button>
        {/* TODO not destructive */}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-bold text-2xl">Create New</DialogTitle>
        </DialogHeader>

        {formValues?.longUrl ? (
          <QRCode value={formValues?.longUrl}
            size={150}
            ref={qrCodeRef}
            // bgColor=''
            // fgColor=''
            // TODO colors
            qrStyle='fluid'
            eyeRadius={10}
          />
        ) : null}

        <Input
          id="title"
          placeholder="Short link's title"
          required
          value={formValues.title}
          onChange={handleInputChange}
        />
        {formErrors?.title && <InputError message={formErrors.title} />}
        <Input
          id="longUrl"
          placeholder="Enter your long url"
          required
          value={formValues.longUrl}
          onChange={handleInputChange}
        />
        {formErrors?.longUrl && <InputError message={formErrors.longUrl} />}
        <span className="flex items-center gap-2">
          <Card className="p-2">{websiteShortcut}</Card> /
          <Input
            id="customUrl"
            placeholder="Custom link (optional)"
            value={formValues.customUrl}
            onChange={handleInputChange}
          />
        </span>
        {createUrlError && <InputError message={createUrlError.message} />}

        <DialogFooter>
          <Button onClick={createNewLink} disabled={createUrlLoading}>
            {createUrlLoading ? (
              <BeatLoader size={10} color="grey" />
            ) : (
              'Create'
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
