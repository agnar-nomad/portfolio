import { storeClicks } from '@/db/api-clicks';
import { getLongUrl } from '@/db/api-urls';
import useFetch from '@/hooks/use-fetch';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { BarLoader } from 'react-spinners';

export default function RedirectLinkPage() {
  // pick up link id
  const { id } = useParams();

  const {
    loading: longUrlLoading,
    data: longUrlData,
    fn: getLongUrlFn,
  } = useFetch(getLongUrl, id);

  const { loading: reportClickLoading, fn: reportClickFn } = useFetch(
    storeClicks,
    {
      id: longUrlData?.id,
      originalUrl: longUrlData?.original_url,
    }
  );

  useEffect(() => {
    // get long url asap
    getLongUrlFn();
  }, []);

  useEffect(() => {
    // if long url fetched, report click and redirect to original url
    if (!longUrlLoading && longUrlData) {
      reportClickFn();
    }
  }, [longUrlLoading]);

  if (longUrlLoading || reportClickLoading) {
    return (
      <>
        <BarLoader width={'100%'} color="#36d7b7" />
        <br />
        Redirecting...
      </>
    );
  }

  return null;
}
