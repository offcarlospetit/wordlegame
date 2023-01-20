// hook to get a random word from the API
import supabase from "../../utils/initSupBase";
import { DateTime } from "luxon";
import { DailyWord } from "../types";
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
            console.log({ getWordError: error });
            return undefined;
        }
        if (data) {
            return data[0] as DailyWord;
        }
    };

    const canPlayToday = async (wordId: number | undefined, user_id: string | undefined) => {
        if (!wordId || !user_id) return false;
        const { data, error } = await supabase
            .from('daily_answer')
            .select('*')
            .match({ word: wordId, user_id: user_id });
        if (error) {
            console.log({ canPlayTodayError: error });
            return false;
        }
        if (data) {
            console.log({ data });
            return data.length > 0 ? false : true;
        }
        return false;
    };
    return { getWord, canPlayToday };
};