import { LinkIcon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import LocationStats from '@/components/location-stats';
import DeviceStats from '@/components/device-stats';
import LinkActions from '@/components/link-actions';
import { websiteDomain, websiteShortcut } from '@/lib/config';
import { exampleClicksData, exampleLinkPageData } from '@/lib/fake-data';

export default function ExampleLinkPage() {

  const urlData = exampleLinkPageData
  const clicksData = exampleClicksData

  let shortlink = '';
  if (urlData) {
    shortlink = urlData?.custom_url ? urlData.custom_url : urlData.short_url as string;
  }

  return (
    <>
      <div className="flex flex-col sm:flex-row gap-8 justify-between">
        <section className="flex flex-col items-start sm:w-2/5 gap-8 rounded-lg">
          <h2 className="text-6xl font-extrabold">{urlData?.title}</h2>
          <a
            href={`${websiteDomain}/${shortlink}`}
            target="_blank"
            className="text-3xl sm:text-4xl font-bold text-accent hover:underline">
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
            </CardContent>
          </Card>
        </section>
      </div>
    </>
  );
}
