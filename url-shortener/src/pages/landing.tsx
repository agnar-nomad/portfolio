import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { useUtilHelpers } from '@/hooks/helper-hooks';

export default function LandingPage() {
  const [longUrl, setLongUrl] = useState<string>();
  const { navigate } = useUtilHelpers();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => setLongUrl(e.target.value);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (longUrl) {
      navigate(`/auth?createNew=${longUrl}`);
    }
  };

  return (
    <section className="flex flex-col items-center">
      <h2 className="my-10 sm:my-16 text-3xl sm:text-6xl lg:text-7xl text-white text-center font-extrabold">
        The only URL shortener <br /> you will ever need!
      </h2>
      <form
        className="sm:h-14 flex flex-col sm:flex-row w-full md:w-2/4 gap-2"
        onSubmit={handleSubmit}>
        <Input
          type="url"
          placeholder="Paste your long URL"
          onChange={handleInputChange}
          value={longUrl}
          className="h-full flex-1 py-4 px-4"
        />
        <Button className="h-full font-semibold" type="submit" variant="accent">
          Shorten
        </Button>
      </form>
      <img src="/abstract-link.png" alt="Banner" className="w-full my-12 md:px-12 max-h-[700px] object-cover opacity-50" />

      <Accordion type="multiple" className="w-full md:px-12">
        <AccordionItem value="item-1">
          <AccordionTrigger>How does the URL Shortener work?</AccordionTrigger>
          <AccordionContent>
            Our URL shortener is a tool that takes a long web address (URL) and
            converts it into a shorter, more manageable link. When someone
            clicks on the shortened URL, they are redirected to the original,
            longer URL.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>
            Do I need an account to use the service?
          </AccordionTrigger>
          <AccordionContent>
            Yes. Creating an account allows you to manage and customise your
            links, and see their analytics data in your account&apos;s
            dashboard.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>
            How can I track the performance of my shortened URLs?
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-3">
              <p>
                Our URL shortener service provides analytics tools to track the
                performance of your shortened URLs. Once you create a short URL,
                you can access a dashboard that shows data such as:
              </p>
              <ul className="list-inside list-disc">
                <li>The number of clicks the short URL has received</li>
                <li>The geographic locations of the users clicking the link</li>
                <li>The platforms that generated the clicks</li>
              </ul>
              <p>
                This information helps you understand how and where your links
                are being accessed
              </p>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <div className="my-8 w-full pl-12 opacity-75">
        <p>Go ahead and create a new short link, and a user profile in the process.</p>
        <p>
          Or to simply explore, you can use the demo account.
          User: <strong>user@example.com</strong>, Password: <strong>user1234</strong>
        </p>
        <p>Or only see the example demo pages without any accounts.</p>
      </div>
    </section>
  );
}
