
import { createClient } from '@supabase/supabase-js'
const supabase_url = process.env.REACT_APP_SUPABASE_URL || 'https://your-supabase-url.supabase.co';
const supabase_key = process.env.REACT_APP_SUPABASE_KEY || 'your-supabase-key';
const supabase = createClient(supabase_url, supabase_key)
export default supabase