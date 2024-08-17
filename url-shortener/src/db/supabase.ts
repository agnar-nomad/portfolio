import { createClient } from '@supabase/supabase-js';
import { Database } from '@/types/supabase';
import { supabaseKey, supabaseUrl } from '@/lib/config';

const supabase = createClient<Database>(supabaseUrl, supabaseKey);

export default supabase;
