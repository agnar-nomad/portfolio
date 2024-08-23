import { LinkIcon } from 'lucide-react';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { BarLoader } from 'react-spinners';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import LocationStats from '@/components/location-stats';
import DeviceStats from '@/components/device-stats';
import { useFetchClicksForSingleUrl, useFetchSingleUrl } from '@/hooks/api-hooks';
import { useUtilHelpers } from '@/hooks/helper-hooks';
import LinkActions from '@/components/link-actions';
import toast from 'react-hot-toast';
import { websiteDomain, websiteShortcut } from '@/lib/config';

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

  useEffect(() => {
    if (urlError) {
      navigate('/dashboard');
      toast.error("Something went wrong while fetching data.")
    }
  }, [navigate, urlError]);

  let shortlink = '';
  if (urlData) {
    shortlink = urlData?.custom_url ? urlData.custom_url : urlData.short_url as string;
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
            href={`https://${websiteDomain}/${shortlink}`}
            target="_blank"
            className="text-3xl sm:text-4xl font-bold text-blue-400 hover:underline">
            https://{websiteShortcut}/{shortlink}
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
          {urlData ?
            <LinkActions urlData={urlData} />
            : null
          }
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
