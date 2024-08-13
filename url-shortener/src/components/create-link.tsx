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
import useFetch from '@/hooks/use-fetch';
import { createUrl } from '@/db/api-urls';
import { BeatLoader } from 'react-spinners';
import { createNewLinkSchema } from '@/lib/schemas';
import { useEffect } from 'react';
import { useUser } from '@/hooks/api-hooks';

export default function CreateLink() {
  const { user } = useUser();
  const navigate = useNavigate();
  const qrCodeRef = useRef(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const longLink = searchParams.get('createNew');

  const [formErrors, setFormErrors] = useState({});
  const [formValues, setFormValues] = useState({
    title: '',
    longUrl: longLink ? longLink : '',
    customUrl: '',
  });

  const {
    data: createUrlData,
    loading: createUrlLoading,
    error: createUrlError,
    fn: createUrlFn,
  } = useFetch(createUrl, { ...formValues, userId: user.id });

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormValues({
      ...formValues,
      [id]: value,
    });
  };

  const createNewLink = async () => {
    setFormErrors({});
    try {
      // validate form data with yup
      await createNewLinkSchema.validate(formValues, { abortEarly: false });

      // extract the qr code image from the component
      const qrCodeCanvas = qrCodeRef.current.canvasRef.current;
      const qrCodeBlob = await new Promise((resolve) =>
        qrCodeCanvas.toBlob(resolve)
      );

      // send all data to API
      await createUrlFn(qrCodeBlob); // additional param provided here, the others were provided on the hook level
    } catch (error) {
      const newErrors = {};

      // from yup
      error?.inner?.forEach((err) => {
        newErrors[err.path] = err.message;
      });

      setFormErrors(newErrors);
    }
  };

  useEffect(() => {
    if (createUrlError == null && createUrlData) {
      navigate(`/link/${createUrlData[0].id}`);
    }
  }, [createUrlData, createUrlError]);

  return (
    <Dialog
      defaultOpen={!!longLink}
      // open by defalt, if url search param is found
      onOpenChange={(res) => {
        // if we close the dialog, remove data from url bar too
        if (!res) setSearchParams({});
      }}>
      <DialogTrigger asChild>
        <Button variant="destructive">Create New Link</Button>
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
