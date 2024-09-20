import { createClient } from "@supabase/supabase-js";

export const supabase = createClient('https://ovwrwekhqrgdzkhfkvac.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im92d3J3ZWtocXJnZHpraGZrdmFjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjUzNDU5MDIsImV4cCI6MjA0MDkyMTkwMn0.EZJGLZXscJEF8jaJmpDcd9y3H1LnH8xRgTJg6qwSNH8'
)