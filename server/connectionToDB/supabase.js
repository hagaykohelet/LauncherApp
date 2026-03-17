import { createClient } from "@supabase/supabase-js/dist/index.cjs";
import 'dotenv/config'
const supabaseConnect = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY
)

export default supabaseConnect