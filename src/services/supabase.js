import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://tohzhuendwolhggphphj.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRvaHpodWVuZHdvbGhnZ3BocGhqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTIzMjY4NTMsImV4cCI6MjAyNzkwMjg1M30.KPTLhhdJTndze3B-u_U6r_EHchfgEU0vgEHwfWprxFw";
const supabase = createClient(supabaseUrl, supabaseKey);


export default supabase;