
import { createClient } from '@supabase/supabase-js'
const supabase_url = "https://placeholder.supabase.co"; // Placeholder URL
const supabase_key = "placeholder-anon-key"; // Placeholder Key
const supabase = createClient(supabase_url, supabase_key)
export default supabase