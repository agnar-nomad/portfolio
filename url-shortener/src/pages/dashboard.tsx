import { useState } from 'react';
import { BarLoader } from 'react-spinners';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Filter } from 'lucide-react';
import InputError from '@/components/input-error';
import LinkCard from '@/components/link-card';
import CreateLink from '@/components/create-link';
import { useFetchClicksForUser, useFetchUrls } from '@/hooks/api-hooks';

export default function DashboardPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const {
    isLoading: urlsLoading,
    error: urlsError,
    data: urlsData,
  } = useFetchUrls()

  const urlIdsList = urlsData?.map((url) => url.id)

  const {
    isLoading: clicksLoading,
    data: clicksData,
    error: clicksError
  } = useFetchClicksForUser(urlIdsList || [])

  console.log("urlsData", urlsData, "clicksData", clicksData);
  

//   useEffect(() => {
//     if (urlsData?.length) {
//       getClicksFn();
//     }
//   }, [urlsData?.length]);

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const filteredUrls = urlsData?.filter((url) =>
    url.title?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-8">
      {(urlsLoading || clicksLoading) && (
        <BarLoader width={'100%'} color="#36d7b7" />
      )}
      <section className="grid grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Links Created</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{urlsData?.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Total Clicks</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{clicksData?.length}</p>
          </CardContent>
        </Card>
      </section>
      <section className="flex items-center justify-between">
        <h2 className="text-4xl font-extrabold">My Links</h2>
        <CreateLink />
      </section>
      <section className="relative">
        <Input
          type="text"
          placeholder="Filter links by name..."
          value={searchQuery}
          onChange={handleFilterChange}
        />
        <Filter className="absolute top-2 right-2 p-1" />
      </section>
      {urlsError && <InputError message={urlsError?.message} />}
      {clicksError && <InputError message={clicksError?.message} />}
      <section className="space-y-4">
        {(filteredUrls || []).map((url) => (
          <LinkCard key={url.id} url={url} />
        ))}
      </section>
    </div>
  );
}
