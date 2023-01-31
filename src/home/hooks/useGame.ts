import React, { useContext, useEffect } from "react";
import { useSelector } from 'react-redux';
import { useDispatch } from "react-redux";
import * as luxon from 'luxon';
import { Alert } from "react-native";

import { ContextCore } from "../../core";
import { RootState } from "../../store";
import { DailyWord, GameBoard, GameType, ManageStateType } from "../types";
import { Settings } from "../../utils/Settings";
import { CLEAR, ENTER, NUMBER_OF_TRIES, _QWERTY_EN, _QWERTY_ES } from "../utils/Const";
import supabase from "../../utils/initSupBase";
import { ApiCall } from "../../utils/WordReferenceApi";
import { endGame, startGame, updateGame, clearGame as clearStorageGame } from "../reducer/HomeReducer";
import { palette } from "../../ui-kit/theme";

const DateTime = luxon.DateTime;
// create a simple hook to get the game data
const keyBoard = Settings.language == 'es' ? _QWERTY_ES : _QWERTY_EN;
const MAX_POINTS = 3 * 5 * 6;
const BONUS_POINTS = 3 * 5;



const copyArray = (arr: GameBoard) => {
    return [...arr.map((rows: any) => [...rows])];
};

const useGame = () => {
    const state = useSelector((state: RootState) => state);
    const { game } = state;
    const {
        totalPoints: _totalPoints,
        dateStart,
        curCol: _curCol,
        curRow: _curRow,
        rows: _rows,
        gameState: _gameState,
        wordOfTheDay: _wordOfTheDay,
        manageState: _manageState,
    } = game;
    const dispatch = useDispatch();
    const { hapticFeedback, word, canPlay, getWordAsync } = useContext(ContextCore);

    const [canNavigate, setCanNavigate] = React.useState(false);
    const [totalPoints, setTotalPoints] = React.useState(_totalPoints ? _totalPoints : 0);
    const [wordOfTheDay, setWordOfTheDay] = React.useState<DailyWord | undefined>();
    const [gameState, setGameState] = React.useState<GameType>(_gameState ? _gameState : "playing");
    const [rows, setRows] = React.useState<GameBoard>(
        _rows ? _rows : new Array(NUMBER_OF_TRIES).fill(new Array(5).fill(""))
    );
    const [curRow, setCurRow] = React.useState(_curRow ? _curRow : 0);
    const [curCol, setCurCol] = React.useState(_curCol ? _curCol : 0);
    const [evaluating, setEvaluating] = React.useState(false);
    const [manageState, setManageState] = React.useState<ManageStateType>(_manageState ? _manageState : "");

    const lettersNew = wordOfTheDay ? wordOfTheDay.word.split("") : []; // ['h', 'e', 'l', 'l', 'o']

    useEffect(() => {
        if (!wordOfTheDay && word) setWordOfTheDay(word);
    }, [word]);

    useEffect(() => {
        if (curRow > 0) {
            checkGameState();
        }
    }, [curRow]);

    const updateRecord = async (totalPoints: number) => {
        const { data, error } = await supabase
            .from('rank')
            .select('*')
            .eq('user_id', state.user.user?.id);
        if (error) {
            console.log({ erroRrank: error });
            return;
        }

        const user = data[0];
        if (user) {
            const { data, error } = await supabase
                .from('rank')
                .update({ points: totalPoints + user.points })
                .eq('user_id', state.user.user?.id)
                .select();
            if (error) {
                console.log({ rankUpdateError: error });
                return;
            }
            if (data)
                updateDailyWordAnswer();
        } else {
            // insert
            const { data, error } = await supabase
                .from('rank')
                .insert({ points: totalPoints, user_id: state.user.user?.id });
            if (error) {
                console.log({ rankInsertError: error });
                return;
            }
            if (data)
                updateDailyWordAnswer();
        }
    };

    const updateDailyWordAnswer = async () => {
        const today = DateTime.local().toFormat('dd-MM-yyyy');
        const { data, error } = await supabase
            .from('daily_answer')
            .insert({ day: today, word: wordOfTheDay?.id, user_id: state.user.user?.id })
            .throwOnError();
        if (error) {
            console.log({ daily_answerError: error });
            return;
        }
        setCanNavigate(true);
    };

    const makeApiCall = async (word: string) => {
        const response = await ApiCall(word);
        return response;
    };

    const getHelp = () => { };

    const checkGameState = () => {
        if (checkIfWon() && gameState !== "won") {
            Alert.alert("Huraaay", "You won!", [
                { text: "Share", onPress: () => console.log("Share") },
            ]);
            setGameState("won");
            setManageState("end");
            updateRecord(150);

        } else if (checkIfLost() && gameState !== "lost") {
            Alert.alert("Meh", "Try again tomorrow!");
            setGameState("lost");
            setManageState("end");
            updateRecord(0);
        }

        if (dateStart) {
            setManageState("update");
        } else {
            setManageState("start");
        }
        setEvaluating(false);
    };

    const checkIfWon = () => {
        const row = rows[curRow - 1];

        return row.every((letter: string, i: any) => letter.toUpperCase() === lettersNew[i]);
    };

    const checkIfLost = () => {
        return !checkIfWon() && curRow === rows.length;
    };

    const updateLetters = async (key: string) => {
        if (gameState !== "playing") {
            return;
        }

        const updatedRows = copyArray(rows);

        if (key === CLEAR) {
            const prevCol = curCol - 1;
            if (prevCol >= 0) {
                updatedRows[curRow][prevCol] = "";
                setRows(updatedRows);
                setCurCol(prevCol);
            }
            return;
        }

        if (key === ENTER) {
            if (curCol === rows[0].length) {
                const row = rows[curRow];
                const word = row.join("");
                setEvaluating(true);
                const validWord = await makeApiCall(word);
                if (!validWord) {
                    hapticFeedback('notificationError');
                    Alert.alert('Palabra no valida');
                    setEvaluating(false);
                    return;
                }
                setCurRow(curRow + 1);
                setCurCol(0);
            }

            return;
        }

        if (curCol < rows[0].length) {
            updatedRows[curRow][curCol] = key;
            setRows(updatedRows);
            setCurCol(curCol + 1);
        }
    };


    const isCellActive = (row: number, col: number) => {
        return row === curRow && col === curCol;
    };

    const getCellBGColor = (row: number, col: number) => {
        const letter = (rows[row][col] as string).toUpperCase();

        if (row >= curRow) {
            return palette.black;
        }
        if (letter === lettersNew[col]) {
            return palette.primary;
        }
        if (lettersNew.includes(letter)) {
            return palette.secondary;
        }
        return palette.darkgrey;
    };

    const getAllLettersWithColor = (color: string) => {
        return rows.flatMap((row, i) =>
            row.filter((cell: string, j: number) => getCellBGColor(i, j) === color)
        );
    };

    const greenCaps = getAllLettersWithColor(palette.primary);
    const yellowCaps = getAllLettersWithColor(palette.secondary);
    const greyCaps = getAllLettersWithColor(palette.darkgrey);

    ////

    const clearGame = () => {
        setRows(new Array(NUMBER_OF_TRIES).fill(new Array(5).fill("")));
        setCurRow(0);
        setCurCol(0);
        setEvaluating(false);
        setGameState("not-started");
        dispatch(clearStorageGame());
    };

    useEffect(() => {
        if (manageState === "update" && gameState === "playing") {
            dispatch(
                updateGame({
                    wordOfTheDay: wordOfTheDay,
                    wordOfTheDayUseDate: '',
                    wordOfTheDayLanguage: Settings.language,
                    score: totalPoints,
                    time: 0,
                    totalPoints: totalPoints,
                    dateEnd: undefined,
                    rows: rows,
                    curCol: curCol,
                    curRow: curRow,
                    gameState: gameState,
                    dateStart: dateStart,
                    manageState: "",
                })
            );
            setManageState("");
        }
    }, [wordOfTheDay, totalPoints, gameState, curRow, curCol, manageState]);


    useEffect(() => {
        if (manageState == "start" && !game.dateStart) {
            dispatch(
                startGame({
                    wordOfTheDay: wordOfTheDay,
                    wordOfTheDayUseDate: '',
                    wordOfTheDayLanguage: Settings.language,
                    score: totalPoints,
                    time: 0,
                    totalPoints: totalPoints,
                    dateEnd: undefined,
                    dateStart: new Date().toUTCString(),
                    rows: rows,
                    curCol: curCol,
                    curRow: curRow,
                    gameState: gameState,
                    manageState: manageState,
                })
            );
        }
        if (manageState === "end" && gameState === "lost" || gameState === "won") {
            dispatch(endGame(
                {
                    wordOfTheDay: wordOfTheDay,
                    wordOfTheDayUseDate: '',
                    wordOfTheDayLanguage: Settings.language,
                    score: totalPoints,
                    time: 0,
                    totalPoints: totalPoints,
                    dateEnd: new Date().toUTCString(),
                    rows: rows,
                    curCol: curCol,
                    curRow: curRow,
                    gameState: gameState,
                    manageState: manageState,
                }
            ));
        }

    }, [
        totalPoints,
        wordOfTheDay,
        gameState,
        curRow,
        curCol,
        rows,
        manageState,
        game
    ]);

    return {
        gameState,
        evaluating,
        totalPoints,
        canNavigate,
        clearGame,
        getHelp,
        wordOfTheDay,
        canPlay,
        //
        rows,
        isCellActive,
        getCellBGColor,
        greenCaps,
        yellowCaps,
        greyCaps,
        updateLetters,
        curRow,
    };
};

export default useGame;