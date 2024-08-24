import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Filter } from 'lucide-react';
import LinkCard from '@/components/link-card';
import CreateLink from '@/components/create-link';
import { exampleClicksData, exampleDashboardPageData } from '@/lib/fake-data';

export default function ExampleDashboardPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const urlsData = exampleDashboardPageData
  const clicksData = exampleClicksData


  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const filteredUrls = urlsData?.filter((url) =>
    url.title?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-8">
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
      <section className="space-y-4">
        {(filteredUrls || []).map((url) => (
          <LinkCard key={url.id} url={url} />
        ))}
      </section>
    </div>
  );
}
