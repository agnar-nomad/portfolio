import { useSearchParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
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
import { NewLinkSchema2, NewLinkSchemaType } from '@/lib/schemas';
import { useEffect } from 'react';
import { useCreateNewUrl, useUser } from '@/hooks/api-hooks';
import * as v from 'valibot';

export default function CreateLink() {
  const { user } = useUser();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const longLink = searchParams.get('createNew');

  const qrCodeRef = useRef<QRCode>(null);
  const [formErrors, setFormErrors] = useState<Partial<NewLinkSchemaType>>({});
  const [formValues, setFormValues] = useState<NewLinkSchemaType>({
    title: '',
    longUrl: longLink ? longLink : '',
    customUrl: '',
  });

  const {
    data: createUrlData,
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
      // await createNewLinkSchema.validate(formValues, { abortEarly: false });
      v.parse(NewLinkSchema2, formValues)

      let qrCodeBlob = undefined

      if (qrCodeRef.current) {
        // extract the qr code image from the component
        const qrCodeCanvas = qrCodeRef.current.canvasRef.current;
        qrCodeBlob = await new Promise((resolve) =>
          qrCodeCanvas.toBlob(resolve)
        ) as Blob;
      }

      // send all data to API
      await createUrlMutationAsync({ ...formValues, userId: user.id!, qrCode: qrCodeBlob }); // additional param provided here, the others were provided on the hook level
    } catch (error) {
      if (error instanceof v.ValiError && error.issues) {
        const flatIssues = v.flatten<typeof NewLinkSchema2>(error?.issues)
        console.log("flatIssues", flatIssues);
        const newErrors = {};

        Object.entries(flatIssues.nested).forEach(([key, value]) => {
          newErrors[key] = value[0]
        })

        setFormErrors(newErrors);

      } else {
        console.error("Create New Link Error", error?.message, error)
      }
    }
  };

  useEffect(() => {
    if (createUrlError == null && createUrlData) {
      navigate(`/link/${createUrlData[0].id}`);
      // TODO move this nav to the hook
    }
  }, [createUrlData, createUrlError]);

  return (
    <Dialog
      defaultOpen={!!longLink}
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
          <QRCode value={formValues?.longUrl} size={150} ref={qrCodeRef} />
        ) : null}

        <Input
          id="title"
          placeholder="Short link's title"
          value={formValues.title}
          onChange={handleInputChange}
        />
        {formErrors?.title && <InputError message={formErrors.title} />}
        <Input
          id="longUrl"
          placeholder="Enter your long url"
          value={formValues.longUrl}
          onChange={handleInputChange}
        />
        {formErrors?.longUrl && <InputError message={formErrors.longUrl} />}
        <span className="flex items-center gap-2">
          <Card className="p-2">trimmr.in</Card> /
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
        {JSON.stringify(formValues, null, 4)}
      </DialogContent>
    </Dialog>
  );
}
