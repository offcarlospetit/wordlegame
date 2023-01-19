// hook to get a random word from the API
import supabase from "../../utils/initSupBase";
import { DateTime } from "luxon";
export const useWord = () => {
    // get today day from luxon 
    // get a random word from the API

    const getWord = async () => {
        const today = DateTime.local().toFormat('dd-MM-yyyy');
        const { data, error } = await supabase
            .from('words')
            .select('*')
            .eq('day', today);
        if (error) {
            console.log(error);
            return;
        }
        if (data) {
            console.log(data);
            return;
        }
    };

    const canPlayToday = async () => {
        const { data, error } = await supabase
            .from('daily_answers')
            .select('*');
        // .eq('user_id', state.user.user?.id);
        if (error) {
            console.log(error);
            return;
        }
        if (data) {
            console.log(data);
            return;
        }
    };
    return { getWord };
};