import React, { useContext, useEffect } from "react";
import { ContextCore } from "../../core";
import { RootState } from "../../store";
import { CellStruct, DailyWord, GridLayoutType } from "../types";
import { Settings } from "../../utils/Settings";
import { DAILY_WORDS, _QWERTY_EN, _QWERTY_ES } from "../utils/Const";
import { gridBuilder } from "../utils/Builders";
import { useSelector } from 'react-redux';
import { COLOR_BY_TYPE, ConstValues, TEXT_COLOR_BY_TYPE } from "../../ui-kit";
import supabase from "../../utils/initSupBase";
import { Alert } from "react-native";
import { Exist } from "../../ui-kit/types";
import { ApiCall } from "../../utils/WordReferenceApi";
import { endGame, startGame, updateGame } from "../reducer/HomeReducer";
import { useDispatch } from "react-redux";
const { ZERO, ONE } = ConstValues;
// create a simple hook to get the game data
const keyBoard = Settings.language == 'es' ? _QWERTY_ES : _QWERTY_EN;
const MAX_POINTS = 3 * 5 * 6;
const BONUS_POINTS = 3 * 5;

const useGame = () => {
    const state = useSelector((state: RootState) => state);
    const { game } = state;
    const dispatch = useDispatch();
    const { hapticFeedback } = useContext(ContextCore);
    const [grid, setGrid] = React.useState<GridLayoutType>(gridBuilder(6));
    const [qwerty, setQuerty] = React.useState([...keyBoard]);
    const [isSolved, setIsSolved] = React.useState(false);
    const [letters, setLetters] = React.useState<Array<CellStruct>>([]);
    const [evaluatingRow, setIsEvaluatingRow] = React.useState(false);
    const [actualRow, setActualRow] = React.useState(0);
    const [actualColumn, setActualColum] = React.useState(0);
    const [wordOfTheDay, setWordOfTheDay] = React.useState<DailyWord>();
    const [isFinish, setIsFinish] = React.useState(false);
    const [attempt, setAttempt] = React.useState(0);
    const [totalPoints, setTotalPoints] = React.useState(0);
    const [canNavigate, setCanNavigate] = React.useState(false);

    useEffect(() => {
        if (!wordOfTheDay) {
            const dw = DAILY_WORDS.find(wd => wd.useDate === '');
            setWordOfTheDay(dw);
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
        }
    }, [qwerty, isFinish]);


    const clearGame = () => {
        setGrid(gridBuilder(6));
        setQuerty(keyBoard);
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
    };


    const updateRecord = async () => {
        const { data, error } = await supabase
            .from('rank')
            .select('*')
            .eq('user_id', state.user.user?.id);
        if (error) {
            console.log(error);
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
                console.log("1", error);
            }
            setCanNavigate(true);
        } else {
            // insert
            const { data, error } = await supabase
                .from('rank')
                .insert({ points: totalPoints, user_id: state.user.user?.id });
            if (error) {
                console.log("1", error);
            }
            setCanNavigate(true);
            if (error) {
                console.log("2", error);
                return;
            }
            console.log({ data });
        }
    };

    useEffect(() => {
        if (isSolved) {
            updateRecord();
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

    //save game status in redux
    useEffect(() => {
        if (!game.dateStart && actualRow > 0) {
            console.log("aqui la primera vez");
            // dispatch(startGame({
            //     wordOfTheDay: wordOfTheDay,
            //     wordOfTheDayUseDate: '',
            //     wordOfTheDayLanguage: Settings.language,
            //     score: totalPoints,
            //     time: 0,
            //     grid: grid,
            //     actualRow: actualRow,
            //     actualColumn: actualColumn,
            //     evaluatingRow: evaluatingRow,
            //     isSolved: isSolved,
            //     attempts: attempt,
            //     totalPoints: totalPoints,
            //     letters: letters,
            //     qwerty: qwerty,
            //     dateEnd: undefined,
            // }));
        }
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

    console.log({ game, actualRow, actualColumn });

    return {
        grid,
        updateLetter,
        totalPoints,
        isSolved,
        attempt,
        evaluatingRow,
        isFinish,
        actualRow,
        actualColumn,
        qwerty,
        clearGame,
        canNavigate,
        getHelp,
    };
};

export default useGame;