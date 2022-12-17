import React, {useContext, useEffect, useLayoutEffect} from 'react';
import {Alert, Button, StyleSheet, Text, View} from 'react-native';
import {GridLayoutType, CellStruct, DailyWord} from '../types';
import Grid from '../components/Grid';
import Qwerty from '../components/Qwerty';
import {gridBuilder} from '../utils/Builders';
import {DAILY_WORDS, _QWERTY_EN, _QWERTY_ES} from '../utils/Const';
import {
  COLOR_BY_TYPE,
  TEXT_COLOR_BY_TYPE,
  ConstValues,
  Container,
  Colors,
  Scale,
  Header,
} from '../../ui-kit';
import {Exist} from '../../ui-kit/types';
import {ApiCall} from '../../utils/WordReferenceApi';
import {ContextCore} from '../../core';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {HomeStackParams} from '../../navigation/HomeStack';
import {Settings} from '../../utils/Settings';
import {BannerAd, TestIds, BannerAdSize} from '@react-native-admob/admob';
const {ZERO, ONE} = ConstValues;

export interface HomeProps extends NativeStackScreenProps<HomeStackParams> {}

const keyBoard = Settings.language == 'es' ? _QWERTY_ES : _QWERTY_EN;

const Home = (props: HomeProps) => {
  const {navigation} = props;
  const {hapticFeedback} = useContext(ContextCore);
  const [grid, setGrid] = React.useState<GridLayoutType>(gridBuilder(6));
  const [qwerty, setQuerty] = React.useState(keyBoard);
  const [isSolved, setIsSolved] = React.useState(false);
  const [letters, setLetters] = React.useState<Array<CellStruct>>([]);
  const [evaluatingRow, setIsEvaluatingRow] = React.useState(false);
  const [actualRow, setActualRow] = React.useState(0);
  const [actualColum, setActualColum] = React.useState(0);
  const [wordOfTheDay, setWordOfTheDay] = React.useState<DailyWord>();
  const [isFinish, setIsFinish] = React.useState(false);
  const [attempt, setAttempt] = React.useState(0);

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

  useEffect(() => {
    if (isSolved) {
      setTimeout(() => {
        navigation.navigate('Result');
      }, 1500);
    }
  }, [isSolved]);

  useLayoutEffect(() => {
    navigation.setOptions({headerTitle: 'Game'});
  }, [navigation]);

  const evaluateBackButton = () => {
    if (isSolved) return;
    const newGrid = [...grid];
    setIsEvaluatingRow(false);
    let col = actualColum;
    if (newGrid[actualRow].row[actualColum].value === '') {
      if (actualColum !== 0) {
        col = actualColum - 1;
      }
    }
    newGrid[actualRow].row[col].value = '';
    if (actualColum > 0) {
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
      response.result.map((wordResult, index) => {
        newGrid[actualRow].row[index].exist = wordResult.exist;
      });
      newGrid[actualRow].evaluate = true;
      setGrid(newGrid);

      if (response.same) {
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

  const updateLetter = async (letter: string) => {
    const newGrid = [...grid];
    if (letter !== ONE && letter !== ZERO) {
      const hasValue = newGrid[actualRow].row[actualColum].value;
      if (!hasValue)
        newGrid[actualRow].row[actualColum].value = letter.toUpperCase();
      if (actualColum !== 4) {
        setActualColum(actualColum + 1);
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
    let charEvaluate: {[key: string]: {index: number; evaluate: Exist}};
    let same = false;
    if (word === wordOfTheDay?.word) same = true;
    const result: Array<{letter: string; exist: Exist}> = [];
    word.split('').map((char: string, index: number) => {
      const struct: {letter: string; exist: Exist} = {letter: char, exist: 1};
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
        [char]: {index, evaluate: struct.exist},
        ...charEvaluate,
      };
      return struct;
    });
    return {result, same};
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

  console.log({attempt})

  return (
    <Container style={{backgroundColor: Colors.white}}>
      <Header />
      <View style={styles.gridContainer}>
        <Grid
          grid={grid}
          evaluatingRow={evaluatingRow}
          isFinish={isFinish}
          actualRow={actualRow}
          actualColumn={actualColum}
        />
      </View>
      <View style={{padding: Scale(18)}}>
        <Button title="Help" onPress={() => evaluateEnterButton()} />
      </View>
      <View style={styles.qwertyContainer}>
        <Qwerty
          qwerty={qwerty}
          updateLetter={updateLetter}
          evaluatingRow={evaluatingRow}
        />
      </View>
      <View
        style={{
          alignItems: 'center',
        }}>
        <BannerAd size={BannerAdSize.BANNER} unitId={TestIds.BANNER} />
      </View>
    </Container>
  );
};

export default Home;

const styles = StyleSheet.create({
  gridContainer: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: Scale(16),
    paddingHorizontal: Scale(16),
  },
  qwertyContainer: {
    flex: 1,
    marginTop: Scale(26),
  },
});
