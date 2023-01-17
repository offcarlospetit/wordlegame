// custom hook to use supabase
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from "react";
import supabase from "../../utils/initSupBase";
import { Rank } from "../types/RankTypes";
import { RootState } from '../../store';
import { setRank } from '../../rank/reducer/RankReducer';

export const useSupaBase = () => {
    const { rank } = useSelector((state: RootState) => state.rank);
    const [rankState, setRankState] = useState<Rank[]>([]);
    const dispatch = useDispatch();
    useEffect(() => {
        if (!rank.length) setRankState([]);
        else { setRankState(rank); }
    }, [rank]);

    const getRank = async () => {
        console.log("aers");
        const { data, error } = await supabase
            .from("rank")
            .select("*")
            .order("points", { ascending: false });
        if (error) {
            console.log(error);
        }
        if (!data) return;

        dispatch(setRank({ rank: data as Rank[] }));
    };

    return { rank: rankState, getRank };
};