// hook to get a random word from the API
import supabase from "../../utils/initSupBase";
import { DateTime } from "luxon";
import { DailyWord } from "../types";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
export const useWord = () => {
    const { game } = useSelector((state: RootState) => state);
    const { wordOfTheDay } = game;

    const getWord = async () => {
        const today = DateTime.local().toFormat('dd-MM-yyyy');
        const { data, error } = await supabase
            .from('words')
            .select('*')
            .eq('day', today);
        if (error) {
            return undefined;
        }
        if (data) {
            return data[0] as DailyWord;
        }
    };

    const canPlayToday = async (wordId: number | undefined, user_id: string | undefined) => {
        if (wordOfTheDay?.word) return true;
        if (!wordId || !user_id || !wordOfTheDay?.word) return false;
        const { data, error } = await supabase
            .from('daily_answer')
            .select('*')
            .match({ word: wordId, user_id: user_id });
        if (error) {
            console.log({ canPlayTodayError: error });
            return false;
        }
        if (data) {
            return data.length > 0 ? false : true;
        }
        return false;
    };
    return { getWord, canPlayToday };
};