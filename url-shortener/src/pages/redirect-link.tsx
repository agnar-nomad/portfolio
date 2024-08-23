import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import InputError from '@/components/input-error';
import ProgressIndicator from '@/components/progress-indicator';
import { useFetchLongUrlFromShortUrl, useReportUrlClick } from '@/hooks/api-hooks';

export default function RedirectLinkPage() {
  // pick up link param = short url or custom url
  const { id } = useParams();

  const {
    isLoading: longUrlLoading,
    data: longUrlData,
    error: longUrlError
  } = useFetchLongUrlFromShortUrl(id ?? "")

  const { isPending: reportClickLoading, mutate: reportClickMutation } = useReportUrlClick();


  useEffect(() => {
    // if long url fetched, report click and redirect to original url(done by the POST function)
    if (!longUrlLoading && longUrlData?.id) {
      reportClickMutation({
        urlId: longUrlData.id,
        originalUrl: longUrlData.original_url as string,
      });
    }
  }, [longUrlLoading, longUrlData?.id, longUrlData?.original_url]);

  if (longUrlError && !longUrlLoading) {
    return (
      <InputError message={longUrlError.message} />
    )
  }

  if (longUrlLoading || reportClickLoading) {
    return (
      <>
        <ProgressIndicator />
        <br />
        Redirecting...
      </>
    );
  }

  return null;
}
