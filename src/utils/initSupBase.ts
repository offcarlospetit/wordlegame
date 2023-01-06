

import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';
export const SUPABASE_URL = "https://naxyowccndddojeiceuq.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5heHlvd2NjbmRkZG9qZWljZXVxIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzIxODMzNTIsImV4cCI6MTk4Nzc1OTM1Mn0.DWGgfVFpUpcpmx4WMPZ0dUZyK84h6Gj8DFSLNBMUBpo";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    // @ts-ignore
    localStorage: AsyncStorage as any,
    auth: {
        autoRefreshToken: true,
        persistSession: true,
    },
});