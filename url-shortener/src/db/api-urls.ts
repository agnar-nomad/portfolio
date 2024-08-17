import supabase from './supabase';
import { supabaseUrl } from '@/lib/config';
import { URLsType, User } from '@/types/supabase';
import { NewLinkSchemaType } from '@/lib/schemas';

export async function getUrls(userId: User['id']) {
  const { data, error } = await supabase
    .from('urls')
    .select('*')
    .eq('user_id', userId);

  if (error) {
    console.error(error.message);
    throw new Error('Unable to load URLs');
  }

  return data;
}

export async function deleteUrl(id: URLsType['id']) {
  const { data, error } = await supabase.from('urls').delete().eq('id', id);

  if (error) {
    console.error(error.message);
    throw new Error('Unable to delete URL');
  }

  return data;
}

type CreateUrlApiProps = NewLinkSchemaType & {
  userId: User['id'];
  qrCode?: Blob;
};
export async function createUrl({
  title,
  longUrl,
  customUrl,
  userId,
  qrCode,
}: CreateUrlApiProps) {
  // generate a short url first
  const shortUrl = Math.random().toString(36).substring(2, 8); // generate unique 6 character string

  let qrCodeUrl = null;

  if (qrCode) {
    // upload the associated qr code
    const fileName = `qr-${shortUrl}`;
    const { error: storageError } = await supabase.storage
      .from('qrs')
      .upload(fileName, qrCode);

    if (storageError) throw new Error(storageError.message);

    qrCodeUrl = `${supabaseUrl}/storage/v1/object/public/qrs/${fileName}`;
  }

//   upload new url together with qrcode
  const { data, error } = await supabase
    .from('urls')
    .insert([
      {
        title,
        original_url: longUrl,
        custom_url: customUrl || null,
        short_url: shortUrl,
        user_id: userId,
        qr: qrCodeUrl,
      },
    ])
    .select();

  if (error) {
    console.error(error.message);
    throw new Error('Error creating new URL');
  }

  return data;
}

export async function getLongUrl(id: URLsType["short_url"] | URLsType["custom_url"]) {
  // get original url based on the short one
  const { data, error } = await supabase
    .from('urls')
    .select('id, original_url')
    .or(`short_url.eq.${id},custom_url.eq.${id}`)
    .single();
  // either short url or custom url can be used in the user's shortened link, so fetch by querying those
//   MAIN functionality

  if (error) {
    console.error(error.message);
    throw new Error('Error fetching Long URL');
  }

  return data;
}

export async function getSingleUrl({
  userId,
  urlId,
}: {
  userId: User['id'];
  urlId: URLsType['id'];
}) {
  const { data, error } = await supabase
    .from('urls')
    .select('*')
    .eq('id', urlId)
    .eq('user_id', userId)
    .single();

  if (error) {
    console.error(error.message);
    throw new Error('Single URL not found');
  }

  return data;
}