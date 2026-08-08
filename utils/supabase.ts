// utils/supabase.ts
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim().replace(/\/$/, "");
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim();

console.log("DEBUG: Current Supabase URL being used is:", supabaseUrl);

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing or malformed Supabase Environment Variables in .env.local');
}

// Export the singleton client instance for our application pages to share
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Define our clean database contract interface shape
export interface ShoppingItem {
  id: string;
  name: string;
  quantity: number;
  category: 'Groceries' | 'Kitty' | 'Medication' | 'Other';
  completed: boolean;
  created_at?: string;
}
