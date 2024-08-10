import supabase from './supabase';
import { UAParser } from 'ua-parser-js';

export async function getClicksForUrls(urlIds) {
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

export async function getClicksForSingleUrl(urlId) {
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

const parser = new UAParser(); // user agent parser

export async function storeClicks({ id, originalUrl }) {
  try {
    const res = parser.getResult();
    const device = res.type || 'desktop';

    const ipData = await fetch('https://ipapi.co/json');
    const { city, country_name } = await ipData.json();

    // report click to DB
    await supabase.from('clicks').insert({
      url_id: id,
      city: city,
      country: country_name,
      device: device,
    });

    // redirect to original url
    window.location.href = originalUrl;
  } catch (error) {
    console.error('Error recording click', error);
  }
}
