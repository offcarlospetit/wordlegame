// custom hook to use supabase
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from "react";
import supabase from "../../utils/initSupBase";
import { Rank } from "../types/RankTypes";
import { RootState } from '../../store';
import { setRank } from '../../rank/reducer/RankReducer';
import { updateUserRank } from '../../user/reducers/UserReducer';

export const useSupaBase = () => {
    const { rank } = useSelector((state: RootState) => state.rank);
    const [rankState, setRankState] = useState<Rank[]>([]);
    const dispatch = useDispatch();
    useEffect(() => {
        if (!rank.length) setRankState([]);
        else { setRankState(rank); }
    }, [rank]);

    const getRank = async () => {
        const { data, error } = await supabase
            .from("rank")
            .select(`*, profiles(*)`)
            .order("points", { ascending: false });
        if (error) {
            console.log({ getRankError: error });
        }
        if (!data) return;
        dispatch(setRank({ rank: data as Rank[] }));
    };
    const getRankByUser = async (id: string) => {
        if (!id) return;
        const { data, error } = await supabase
            .from("rank")
            .select(`*, profiles(*)`)
            .order("points", { ascending: false });
        if (error) {
            console.log({ getRankByUserError: error });
        }
        if (!data) return;
        data.forEach((item: Rank, index) => {
            if (item.user_id === id) {
                dispatch(updateUserRank({ rank: index + 1, points: item.points }));
            }
        });
    };

    return { rank: rankState, getRank, getRankByUser };
};