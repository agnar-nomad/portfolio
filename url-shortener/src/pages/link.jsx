import { UrlState } from '@/context';
import { getClicksForSingleUrl } from '@/db/api-clicks';
import { deleteUrl, getSingleUrl } from '@/db/api-urls';
import useFetch from '@/hooks/use-fetch';
import { LinkIcon } from 'lucide-react';
import { useEffect } from 'react';
import { Copy, Download, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { BarLoader, BeatLoader } from 'react-spinners';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import LocationStats from '@/components/location-stats';
import DeviceStats from '@/components/device-stats';

export default function LinkPage() {
  const { user } = UrlState();
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    loading: urlLoading,
    data: urlData,
    error: urlError,
    fn: getSingleUrlFn,
  } = useFetch(getSingleUrl, { userId: user?.id, id: id });

  const {
    loading: clicksLoading,
    data: clicksData,
    fn: getClicksForSingleUrlFn,
  } = useFetch(getClicksForSingleUrl, id);

  const { loading: deleteLoading, fn: deleteFn } = useFetch(deleteUrl, id);

  useEffect(() => {
    getSingleUrlFn();
    getClicksForSingleUrlFn();

    if (urlError) {
      navigate('/dashboard');
    }
  }, []);

  const handleCopy = () => {
    navigator?.clipboard.writeText(`https://trimmr.in/${urlData?.short_url}`);
  };

  const handleDownload = () => {
    const imageUrl = urlData?.qr;
    const fileName = urlData?.title;

    const anchor = document.createElement('a');
    anchor.href = imageUrl;
    anchor.download = fileName;

    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
  };

  const handleDelete = () => {
    deleteFn();
  };

  let link = '';
  if (urlData) {
    link = urlData?.custom_url ? urlData?.custom_url : urlData.short_url;
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
            href={urlData?.original_url}
            target="_blank"
            className="flex items-center gap-1 hover:underline">
            <LinkIcon className="p-1" />
            {urlData?.original_url}
          </a>
          <span className="flex items-end font-extralight text-sm flex-1">
            {new Date(urlData?.created_at).toLocaleString()}
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
          <img
            src={urlData?.qr}
            alt="QR code"
            className="w-full self-center sm:self-start object-contain ring ring-blue-500 p-1"
          />
        </section>
        <section className="sm:w-3/5">
          <Card className="w-full h-full">
            <CardHeader>
              <CardTitle className="text-4xl font-extrabold">
                Statictics
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
                  {!clicksLoading
                    ? 'Statistics not available yet'
                    : 'Loading statistics'}
                </p>
              )}
            </CardContent>
          </Card>
        </section>
      </div>
    </>
  );
}
