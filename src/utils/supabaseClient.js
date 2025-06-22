// src/utils/supabaseClient.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://lpczocldblkfrhnlpqgf.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'; // ← use your actual anon key here

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
