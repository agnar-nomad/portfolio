import supabase, { supabaseUrl } from './supabase';

export async function getUrls(userId) {
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

export async function deleteUrl(id) {
  const { data, error } = await supabase.from('urls').delete().eq('id', id);

  if (error) {
    console.error(error.message);
    throw new Error('Unable to delete URL');
  }

  return data;
}

export async function createUrl({ title, longUrl, customUrl, userId }, qrCode) {
  // create a short url first
  const shortUrl = Math.random().toString(36).substring(2, 8); // generate unique 6 character string

  // upload the associated qr code
  const fileName = `qr-${shortUrl}`;
  const { error: storageError } = await supabase.storage
    .from('qrs')
    .upload(fileName, qrCode);

  if (storageError) throw new Error(storageError.message);

  const qrCodeUrl = `${supabaseUrl}/storage/v1/object/public/qrs/${fileName}`;

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
    throw new Error('Error creating short URL');
  }

  return data;
}

export async function getLongUrl(id) {
  // get original url base on the short one
  const { data, error } = await supabase
    .from('urls')
    .select('id, original_url')
    .or(`short_url.eq.${id},custom_url.eq.${id}`)
    .single();
  // either short url or custom url can be used in the user's trimmr link

  if (error) {
    console.error(error.message);
    throw new Error('Error fetching short link');
  }

  return data;
}

export async function getSingleUrl({ userId, id }) {
  const { data, error } = await supabase
    .from('urls')
    .select('*')
    .eq('id', id)
    .eq('user_id', userId)
    .single();

  if (error) {
    console.error(error.message);
    throw new Error('Short URL not found');
  }

  return data;
}
