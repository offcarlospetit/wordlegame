import React, { useContext, useEffect } from "react";
import { ContextCore } from "../../core";
import { RootState } from "../../store";
import { CellStruct, DailyWord, GridLayoutType } from "../types";
import { Settings } from "../../utils/Settings";
import { _QWERTY_EN, _QWERTY_ES } from "../utils/Const";
import { gridBuilder } from "../utils/Builders";
import { useSelector } from 'react-redux';
import { COLOR_BY_TYPE, ConstValues, TEXT_COLOR_BY_TYPE } from "../../ui-kit";
import supabase from "../../utils/initSupBase";
import { Alert } from "react-native";
import { Exist } from "../../ui-kit/types";
import { ApiCall } from "../../utils/WordReferenceApi";
import { endGame, startGame, updateGame, clearGame as clearStorageGame } from "../reducer/HomeReducer";
import { useDispatch } from "react-redux";
import * as luxon from 'luxon';
import { palette } from "../../ui-kit/theme";
const DateTime = luxon.DateTime;
const { ZERO, ONE } = ConstValues;
// create a simple hook to get the game data
const keyBoard = Settings.language == 'es' ? _QWERTY_ES : _QWERTY_EN;
const MAX_POINTS = 3 * 5 * 6;
const BONUS_POINTS = 3 * 5;

const useGame = () => {
    const state = useSelector((state: RootState) => state);
    const { game } = state;
    const {
        actualColumn: _actualColumn,
        actualRow: _actualRow,
        attempts,
        evaluatingRow: _evaluatingRow,
        grid: _grid,
        isSolved: _isSolved,
        letters: _letters,
        qwerty: _qwerty,
        totalPoints: _totalPoints,
        dateStart,
        dateEnd,
    } = game;
    const dispatch = useDispatch();
    const { hapticFeedback, word, canPlay } = useContext(ContextCore);
    const [grid, setGrid] = React.useState<GridLayoutType>(_grid ? _grid : gridBuilder(6));
    const [qwerty, setQuerty] = React.useState(_qwerty ? _qwerty : [...keyBoard]);
    const [isSolved, setIsSolved] = React.useState(_isSolved ? _isSolved : false);
    const [letters, setLetters] = React.useState<Array<CellStruct>>(_letters ? _letters : []);
    const [evaluatingRow, setIsEvaluatingRow] = React.useState(_evaluatingRow ? _evaluatingRow : false);
    const [actualRow, setActualRow] = React.useState(_actualRow ? _actualRow : 0);
    const [actualColumn, setActualColum] = React.useState(_actualColumn ? _actualColumn : 0);
    const [wordOfTheDay, setWordOfTheDay] = React.useState<DailyWord | undefined>();
    const [isFinish, setIsFinish] = React.useState(false);
    const [attempt, setAttempt] = React.useState(attempts ? attempts : 0);
    const [totalPoints, setTotalPoints] = React.useState(_totalPoints ? _totalPoints : 0);
    const [canNavigate, setCanNavigate] = React.useState(false);
    const [isEvaluated, setIsEvaluated] = React.useState(false);
    const [updateRecords, setUpdateRecords] = React.useState(false);

    useEffect(() => {
        setWordOfTheDay(word);
    }, [word]);

    useEffect(() => {
        if (!wordOfTheDay && word) {
            setWordOfTheDay(word);
        }

        // in case that the user has played the game another day
        if (!isEvaluated) {
            const actualDate = new Date();
            if (dateStart) {
                const dateStartGame = new Date(dateStart);
                if (actualDate.getDate() !== dateStartGame.getDate() || dateEnd !== undefined) {
                    clearGame();
                    dispatch(clearStorageGame());
                    setIsEvaluated(true);
                }
            }
        }
    }, []);

    useEffect(() => {
        if (evaluatingRow) {
            const letters: any = [];
            grid.map(row => {
                if (row.evaluate) {
                    row.row.map(letter => {
                        if (letter.value !== '') {
                            letters.push(letter);
                        }
                    });
                }
            });
            setLetters(letters);
        }
    }, [grid, evaluatingRow]);

    useEffect(() => {
        if (evaluatingRow) {
            const qwertyLetters = [...qwerty];
            letters.map(letterMarked => {
                qwertyLetters.map(quertyRow => {
                    return quertyRow.map(quertyLetter => {
                        if (letterMarked.value === quertyLetter.letter.toUpperCase()) {
                            quertyLetter.color =
                                quertyLetter.color === COLOR_BY_TYPE[1]
                                    ? COLOR_BY_TYPE[1]
                                    : COLOR_BY_TYPE[letterMarked.exist];
                            quertyLetter.textColor =
                                quertyLetter.textColor === TEXT_COLOR_BY_TYPE[1]
                                    ? TEXT_COLOR_BY_TYPE[1]
                                    : TEXT_COLOR_BY_TYPE[letterMarked.exist];
                        }
                    });
                });
            });
            setQuerty(qwerty);
            setIsFinish(true);
        }
    }, [actualRow]);

    useEffect(() => {
        if (isFinish) {
            setIsFinish(false);
            setIsEvaluatingRow(false);
            setUpdateRecords(true);
        }
    }, [qwerty, isFinish]);


    const clearGame = () => {
        setGrid(gridBuilder(6));
        setQuerty([...keyBoard]);
        setIsSolved(false);
        setLetters([]);
        setIsEvaluatingRow(false);
        setActualRow(0);
        setActualColum(0);
        setWordOfTheDay(undefined);
        setIsFinish(false);
        setAttempt(0);
        setTotalPoints(0);
        setCanNavigate(false);
        dispatch(clearStorageGame());
    };


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
        console.log({ daily_answer: data });
        setCanNavigate(true);
    };

    useEffect(() => {
        if (isSolved) {
            updateRecord(totalPoints);
        }
    }, [isSolved]);

    const evaluateBackButton = () => {
        if (isSolved) return;
        const newGrid = [...grid];
        setIsEvaluatingRow(false);
        let col = actualColumn;
        if (newGrid[actualRow].row[actualColumn].value === '') {
            if (actualColumn !== 0) {
                col = actualColumn - 1;
            }
        }
        newGrid[actualRow].row[col].value = '';
        if (actualColumn > 0) {
            setActualColum(col);
        }
        setGrid(newGrid);
    };

    const evaluateEnterButton = async () => {
        if (isSolved) return;
        const newGrid = [...grid];
        if (!evaluatingRow) {
            setIsEvaluatingRow(true);
        }
        // si es una palabra valida
        // evaluamos la palabra
        // repintamos el grid
        // aumentamos la fila
        const word = newGrid[actualRow].row.map(colum => colum.value).join('');
        // Aqui hago la llamada al diccionario rae
        const validWord = await makeApiCall(word);

        if (validWord) {
            const response = findDiff(word);
            let points = 0;
            response.result.map((wordResult, index) => {
                newGrid[actualRow].row[index].exist = wordResult.exist;
                if (wordResult.exist == 1) {
                    points += 3;
                }
                if (wordResult.exist == 2) {
                    points += 1;
                }
            });
            newGrid[actualRow].evaluate = true;
            setTotalPoints(totalPoints + points);
            setGrid(newGrid);

            if (response.same) {
                if (attempt === 0) setTotalPoints(MAX_POINTS + BONUS_POINTS);
                setIsSolved(true);
                return;
            }

            if (actualRow < 5) {
                setActualRow(actualRow + 1);
                setActualColum(0);
                setAttempt(attempt + 1);
            }


        } else {
            setIsEvaluatingRow(false);
            hapticFeedback('notificationError');
            Alert.alert('Palabra no valida');
        }
    };

    useEffect(() => {
        // if (updateRecords) {
        //     if (!isSolved && game.dateStart && actualRow > 0) {
        //         dispatch(
        //             updateGame({
        //                 wordOfTheDay: wordOfTheDay,
        //                 wordOfTheDayUseDate: '',
        //                 wordOfTheDayLanguage: Settings.language,
        //                 score: totalPoints,
        //                 time: 0,
        //                 grid: grid,
        //                 actualRow: actualRow,
        //                 actualColumn: actualColumn,
        //                 evaluatingRow: evaluatingRow,
        //                 isSolved: isSolved,
        //                 attempts: attempt,
        //                 totalPoints: totalPoints,
        //                 letters: letters,
        //                 qwerty: qwerty,
        //                 dateEnd: undefined,
        //             })
        //         );
        //     }
        // }
    }, [updateRecords, wordOfTheDay, totalPoints, grid, actualRow, actualColumn, evaluatingRow, isSolved, attempt, letters, qwerty]);

    useEffect(() => {
        // if (!game.dateStart && actualRow > 0) {
        //     console.log({ wordOfTheDay });
        //     dispatch(
        //         startGame({
        //             wordOfTheDay: wordOfTheDay,
        //             wordOfTheDayUseDate: '',
        //             wordOfTheDayLanguage: Settings.language,
        //             score: totalPoints,
        //             time: 0,
        //             grid: grid,
        //             actualRow: actualRow,
        //             actualColumn: actualColumn,
        //             evaluatingRow: evaluatingRow,
        //             isSolved: isSolved,
        //             attempts: attempt,
        //             totalPoints: totalPoints,
        //             letters: letters,
        //             qwerty: qwerty,
        //             dateEnd: undefined,
        //             dateStart: new Date().toUTCString(),
        //         })
        //     );
        // }
        // if (isSolved) {
        //     dispatch(endGame(
        //         {
        //             wordOfTheDay: wordOfTheDay,
        //             wordOfTheDayUseDate: '',
        //             wordOfTheDayLanguage: Settings.language,
        //             score: totalPoints,
        //             time: 0,
        //             grid: grid,
        //             actualRow: actualRow,
        //             actualColumn: actualColumn,
        //             evaluatingRow: evaluatingRow,
        //             isSolved: isSolved,
        //             attempts: attempt,
        //             totalPoints: totalPoints,
        //             letters: letters,
        //             qwerty: qwerty,
        //             dateEnd: new Date().toUTCString(),
        //         }
        //     ));
        // }

    }, [
        grid,
        actualRow,
        actualColumn,
        evaluatingRow,
        isSolved,
        attempt,
        totalPoints,
        wordOfTheDay,
        letters,
        qwerty,
    ]);

    const updateLetter = async (letter: string) => {
        if (evaluatingRow) {
            hapticFeedback('notificationWarning');
            return;
        }
        const newGrid = [...grid];
        if (letter !== ONE && letter !== ZERO) {
            const hasValue = newGrid[actualRow].row[actualColumn].value;
            if (!hasValue)
                newGrid[actualRow].row[actualColumn].value = letter.toUpperCase();
            if (actualColumn !== 4) {
                setActualColum(actualColumn + 1);
            }
            setGrid(newGrid);
        }
        //Enter button
        if (letter === ONE) {
            evaluateEnterButton();
        }
        //Back button
        if (letter === ZERO) {
            evaluateBackButton();
        }
    };

    const findDiff = (
        word: string,
    ): {
        result: {
            letter: string;
            exist: Exist;
        }[];
        same: boolean;
    } => {
        let charEvaluate: { [key: string]: { index: number; evaluate: Exist; }; };
        let same = false;
        if (word === wordOfTheDay?.word) same = true;
        const result: Array<{ letter: string; exist: Exist; }> = [];
        word.split('').map((char: string, index: number) => {
            const struct: { letter: string; exist: Exist; } = { letter: char, exist: 1 };
            if (!same) {
                const word = wordOfTheDay?.word ?? '';
                let resultFind: Exist = 1;
                if (
                    charEvaluate &&
                    charEvaluate[char] &&
                    charEvaluate[char].evaluate &&
                    charEvaluate[char].evaluate == 2
                ) {
                    struct.exist = 0;
                } else {
                    resultFind = locations(char, index, word);
                    struct.exist = resultFind;
                }
            }
            result.push(struct);
            charEvaluate = {
                [char]: { index, evaluate: struct.exist },
                ...charEvaluate,
            };
            return struct;
        });
        return { result, same };
    };

    const locations = (
        substring: string,
        position: number,
        string: string,
    ): Exist => {
        let samePosition = false;
        let exist = false;
        let isIn = false;
        string.split('').forEach((x, index) => {
            if (x == substring && position == index) {
                samePosition = true;
                exist = true;
                isIn = false;
            }
            if (x == substring && position !== index && !samePosition) {
                samePosition = false;
                isIn = true;
                exist = true;
            }
        });
        if (exist && samePosition) return 1;
        if (exist && isIn && !samePosition) return 2;
        if (!exist && !isIn && !samePosition) return 0;
        return 1;
    };

    const makeApiCall = async (word: string) => {
        const response = await ApiCall(word);
        return response;
    };

    const getHelp = () => { };





    /////// New logic 
    const ENTER = "ENTER";
    const CLEAR = "CLEAR";
    const NUMBER_OF_TRIES = 6;
    const [gameState, setGameState] = React.useState<'playing' | 'won' | 'lost'>("playing");
    const copyArray = (arr: any) => {
        return [...arr.map((rows: any) => [...rows])];
    };
    const lettersNew = wordOfTheDay ? wordOfTheDay.word.split("") : []; // ['h', 'e', 'l', 'l', 'o']
    const [rows, setRows] = React.useState(
        new Array(NUMBER_OF_TRIES).fill(new Array(5).fill(""))
    );
    const [curRow, setCurRow] = React.useState(0);
    const [curCol, setCurCol] = React.useState(0);
    const [evaluating, setEvaluating] = React.useState(false);

    useEffect(() => {
        if (curRow > 0) {
            checkGameState();
        }
    }, [curRow]);

    const checkGameState = () => {
        if (checkIfWon() && gameState !== "won") {
            Alert.alert("Huraaay", "You won!", [
                { text: "Share", onPress: () => console.log("Share") },
            ]);
            setGameState("won");
            updateRecord(150);
        } else if (checkIfLost() && gameState !== "lost") {
            Alert.alert("Meh", "Try again tomorrow!");
            setGameState("lost");
            updateRecord(0);
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
                    console.log("aersdasddnaksdjasdhaskdhkasjdhjkasd");
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

    return {
        // grid,
        // updateLetter,
        // isSolved,
        // attempt,
        // isFinish,
        // actualRow,
        // actualColumn,
        // qwerty,
        // evaluatingRow,
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
        updateLetters
    };
};

export default useGame;