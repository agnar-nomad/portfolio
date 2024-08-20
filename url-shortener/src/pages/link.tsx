import { LinkIcon } from 'lucide-react';
import { useEffect } from 'react';
import { Copy, Download, Trash2 } from 'lucide-react';
import { useParams } from 'react-router-dom';
import { BarLoader, BeatLoader } from 'react-spinners';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import LocationStats from '@/components/location-stats';
import DeviceStats from '@/components/device-stats';
import { useDeleteUrl, useFetchClicksForSingleUrl, useFetchSingleUrl } from '@/hooks/api-hooks';
import { downloadFile } from '@/lib/utils';
import { useUtilHelpers } from '@/hooks/helper-hooks';

export default function LinkPage() {
  const { id } = useParams();
  const { navigate } = useUtilHelpers();

  let IdAsNum = Number(id)
  if (isNaN(IdAsNum)) {
    IdAsNum = -1
  }

  const {
    isLoading: urlLoading,
    data: urlData,
    error: urlError,
  } = useFetchSingleUrl(IdAsNum)

  const {
    isLoading: clicksLoading,
    data: clicksData,
  } = useFetchClicksForSingleUrl(IdAsNum)

  const { isPending: deleteLoading, mutate: deleteMutation } = useDeleteUrl(IdAsNum)

  useEffect(() => {
    if (urlError) {
      navigate('/dashboard');
    }
  }, [navigate, urlError]);

  const handleCopy = () => {
    navigator?.clipboard.writeText(`https://trimmr.in/${urlData?.short_url}`);
  };

  const handleDownload = () => {
    const imageUrl = urlData?.qr || "";
    const fileName = urlData?.title || "file";

    downloadFile(imageUrl, fileName)
  };

  const handleDelete = () => deleteMutation()

  let link = '';
  if (urlData) {
    link = urlData?.custom_url ? urlData?.custom_url : urlData.short_url as string;
  }

  return (
    <>
      {(clicksLoading || urlLoading) && (
        <BarLoader className="mb-4" width={'100%'} color="#36d7b7" />
      )}
      <div className="flex flex-col sm:flex-row gap-8 justify-between">
        <section className="flex flex-col items-start sm:w-2/5 gap-8 rounded-lg">
          <h2 className="text-6xl font-extrabold">{urlData?.title}</h2>
          <a
            href={`https://trimmr.in/${link}`}
            target="_blank"
            className="text-3xl sm:text-4xl font-bold text-blue-400 hover:underline">
            https://trimmr.in/{link}
          </a>
          <a
            href={urlData?.original_url as string}
            target="_blank"
            className="flex items-center gap-1 hover:underline">
            <LinkIcon className="p-1" />
            {urlData?.original_url}
          </a>
          <span className="flex items-end font-extralight text-sm flex-1">
            {new Date(urlData?.created_at as string).toLocaleString()}
          </span>
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
          {urlData?.qr ?
            <img
              src={urlData.qr}
              alt="QR code"
              className="w-full self-center sm:self-start object-contain ring ring-blue-500 p-1"
            />
            : null}
        </section>

        <section className="sm:w-3/5">
          <Card className="w-full h-full">
            <CardHeader>
              <CardTitle className="text-4xl font-extrabold">
                Statistics
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-6">
              {clicksData && clicksData.length ? (
                <>
                  <Card>
                    <CardHeader>
                      <CardTitle>Total Clicks</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p>{clicksData.length}</p>
                    </CardContent>
                  </Card>

                  <CardTitle>Location Data</CardTitle>
                  <LocationStats stats={clicksData} />
                  <CardTitle>Device Info</CardTitle>
                  <DeviceStats stats={clicksData} />
                </>
              ) : (
                <p>
                  {clicksLoading
                    ? 'Loading statistics'
                    : 'Statistics not available yet'}
                </p>
              )}
            </CardContent>
          </Card>
        </section>
      </div>
    </>
  );
}
