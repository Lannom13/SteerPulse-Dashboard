// src/utils/supabaseClient.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://lpczocldblkfrhnlpqgf.supabase.co';
const supabaseAnonKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxwY3pvY2xkYmxrZnJobmxwcWdmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTAzNjQ2MTYsImV4cCI6MjA2NTk0MDYxNn0.OEtG4Kbk7r_X2M7OKgOsGbkd8WDi-IhhyusuWqUgsoY';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
