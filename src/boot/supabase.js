import { createClient } from '@supabase/supabase-js'
import useAuthUser from 'src/composables/UseAuthUser'
import { route } from "quasar/wrappers";



/*const supabaseUrl = 'https://vzhiunkcjujoxgzlqoyc.supabase.co'
const supabaseKey =  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ6aGl1bmtjanVqb3hnemxxb3ljIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDQ1MzgzMjksImV4cCI6MTk2MDExNDMyOX0.2EHA5LaMKFK-NjnN4RtYH1voe5DeNyPhLhnEXmMRtTk'
*/
const supabaseUrl = process.env.SUPABASE_URL
const supabaseKey = process.env.SUPABASE_KEY

const supabase = createClient(supabaseUrl,supabaseKey)

supabase.auth.onAuthStateChange((event,session) => {
    const { user } = useAuthUser()
    user.value = session?.user || (null)

})

export default function useSupabase(){
    return {supabase}
}