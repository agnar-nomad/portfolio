import { URLsType } from '@/types/supabase';
import supabase from './supabase';
import { UAParser } from 'ua-parser-js';

export async function getClicksForUser(urlIds: URLsType['id'][]) {
    // get clicks of all of the user's urls = personal statistics
    // user id is handled while fetching the urls, so no need to do that here
  const { data, error } = await supabase
    .from('clicks')
    .select('*')
    .in('url_id', urlIds);

  if (error) {
    console.error(error.message);
    throw new Error('Unable to load clicks');
  }

  return data;
}

export async function getClicksForSingleUrl(urlId: URLsType['id']) {
  const { data, error } = await supabase
    .from('clicks')
    .select('*')
    .eq('url_id', urlId);

  if (error) {
    console.error(error.message);
    throw new Error('Unable to load clicks');
  }

  return data;
}

const userAgentParser = new UAParser(); // user agent parser, gets a bunch of data about the browser

export async function storeClicks({ urlId, originalUrl }: { urlId: URLsType["id"], originalUrl: string }) {
  try {
    const res = userAgentParser.getResult();
    const device = res.device.type || 'desktop';

    const ipData = await fetch('https://ipapi.co/json');
    const { city, country_name } = await ipData.json();

    // report click to DB
    await supabase.from('clicks').insert({
      url_id: urlId,
      city: city,
      country: country_name,
      device: device,
    });

    // redirect to original url: This is the MAIN functionality
    window.location.href = originalUrl;
  } catch (error) {
    console.error('Error recording click', error);
  }
}
