import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://npfxmoxkxipgtvfmvqyl.supabase.co';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5wZnhtb3hreGlwZ3R2Zm12cXlsIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzI1NzQzNDksImV4cCI6MTk4ODE1MDM0OX0.KWzFFKQnYIt-M7qKadymy8qgZn4nrg7Lpr1Yh7QaLY4';
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
