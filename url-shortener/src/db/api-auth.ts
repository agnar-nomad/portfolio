import { LoginSchemaType, SignupSchemaType } from '@/lib/schemas';
import supabase from './supabase';
import { supabaseUrl } from './supabase';

export async function login({ email, password }: LoginSchemaType) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw new Error(error.message);

  return data;
}

export async function getCurrentUser() {
  const { data: session, error } = await supabase.auth.getSession();

  if (!session.session) return null;
  if (error) throw new Error(error.message);

  return session.session?.user;
}

export async function signup({
  name,
  email,
  password,
  profile_img,
}: SignupSchemaType) {
  const fileName = `img-${name.split(' ').join('-')}-${Math.random()}`;
  const { error: storageError } = await supabase.storage
    .from('profile_img')
    .upload(fileName, profile_img);

  if (storageError) throw new Error(storageError.message);

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        name,
        profile_img: `${supabaseUrl}/storage/v1/object/public/profile_img/${fileName}`,
      },
    },
  });

  if (error) throw new Error(error.message);

  return data;
}

export async function logout() {
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error(error.message);
}
