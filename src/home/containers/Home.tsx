import React, {useEffect} from 'react';
import {Alert, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {GridLayoutType, CellStruct, DailyWord} from '../types';
import Grid from '../components/Grid';
import Qwerty from '../components/Qwerty';
import {gridBuilder} from '../utils/Builders';
import {DAILY_WORDS, _QWERTY} from '../utils/Const';
import {COLOR_BY_TYPE, TEXT_COLOR_BY_TYPE} from '../../ui-kit';
import {Exist} from '../../ui-kit/types';
import {ApiCall} from '../../utils/WordReferenceApi';
type Props = {};

const Home = (props: Props) => {
  const [grid, setGrid] = React.useState<GridLayoutType>(gridBuilder(6));
  const [isSolved, setIsSolved] = React.useState(false);
  const [qwerty, setQuerty] = React.useState(_QWERTY);
  const [letters, setLetters] = React.useState<Array<CellStruct>>([]);
  const [evaluatingRow, setIsEvaluatingRow] = React.useState(false);
  const [actualRow, setActualRow] = React.useState(0);
  const [actualColum, setActualColum] = React.useState(0);
  const [wordOfTheDay, setWordOfTheDay] = React.useState<DailyWord>();

  useEffect(() => {
    if (!wordOfTheDay) {
      const dw = DAILY_WORDS.find(wd => wd.useDate === '');
      setWordOfTheDay(dw);
    }
  }, []);

  useEffect(() => {
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
  }, [grid, evaluatingRow]);

  useEffect(() => {
    const qwertyLetters = [...qwerty];
    letters.map(letterMarked => {
      qwertyLetters.map(quertyRow => {
        return quertyRow.map(quertyLetter => {
          if (letterMarked.value === quertyLetter.letter.toUpperCase()) {
            quertyLetter.color = COLOR_BY_TYPE[letterMarked.exist];
            quertyLetter.textColor = TEXT_COLOR_BY_TYPE[letterMarked.exist];
          }
        });
      });
    });
    setQuerty(qwerty);
  }, [actualRow]);

  const evaluateBackButton = (letter: string) => {
    const newGrid = [...grid];

    setIsEvaluatingRow(false);

    newGrid[actualRow].row[actualColum].value = '';
    if (actualColum > 0) {
      setActualColum(actualColum - 1);
    }
    setGrid(newGrid);
  };

  const evaluateEnterButton = async (letter: string) => {
    const newGrid = [...grid];
    // enter
    setIsEvaluatingRow(true);
    // si es una palabra valida
    // evaluamos la palabra
    // repintamos el grid
    // aumentamos la fila
    const word = newGrid[actualRow].row.map(colum => colum.value).join('');
    // Aqui hago la llamada al diccionario rae
    const validWord = await makeApiCall(word);

    if (validWord) {
      const result = findDiff(word);
      result.map((wordResult, index) => {
        newGrid[actualRow].row[index].exist = wordResult.exist;
      });
      newGrid[actualRow].evaluate = true;
      setGrid(newGrid);
      if (actualRow < 5) {
        setActualRow(actualRow + 1);
        setActualColum(0);
      }
    } else {
      Alert.alert('Palabra no valida');
    }
  };

  const updateLetter = async (letter: string) => {
    const newGrid = [...grid];
    if (letter !== '1' && letter !== '0') {
      const hasValue = newGrid[actualRow].row[actualColum].value;
      if (!hasValue)
        newGrid[actualRow].row[actualColum].value = letter.toUpperCase();
      if (actualColum !== 4) {
        setActualColum(actualColum + 1);
      }
      setGrid(newGrid);
    }

    //Back button
    if (letter === '0') {
      evaluateBackButton(letter);
    }

    //Enter button
    if (letter === '1') {
      evaluateEnterButton(letter);
    }
  };

  const findDiff = (
    word: string,
  ): {
    letter: string;
    exist: Exist;
  }[] => {
    const charEvaluate: Array<string> = [];
    const result = word.split('').map((char: string, index: number) => {
      const struct: {letter: string; exist: Exist} = {letter: char, exist: 0};
      // if (!charEvaluate.find(letter => letter == char)) {
      const word = wordOfTheDay?.word ?? '';

      const resultFind = locations(char, index, word);
      struct.exist = resultFind;
      charEvaluate.push(char);
      // }
      return struct;
    });

    for (let indexA = 0; indexA < result.length; indexA++) {
      const elementA = result[indexA];
      for (let indexB = 0; indexB < result.length; indexB++) {
        const elementB = result[indexB];
        if (indexA !== indexB && elementA.letter == elementB.letter) {
          if (elementA.exist == 1 && elementB.exist == 2)
            result[indexB].exist = 0;
          if (elementA.exist == 2 && elementB.exist == 1)
            result[indexA].exist = 0;
        }
      }
    }
    return result;
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
      if (x == substring && position !== index) {
        samePosition = false;
        isIn = true;
        exist = true;
      }
    });
    if (exist && samePosition) return 1;
    if (exist && isIn && !samePosition) return 2;
    if (!exist && !isIn && !samePosition) return 0;
    return 0;
  };

  const makeApiCall = async (word: string) => {
    const response = await ApiCall(word);
    return response;
  };
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.gridContainer}>
        <Grid grid={grid} />
      </View>
      <View style={styles.qwertyContainer}>
        <Qwerty qwerty={qwerty} updateLetter={updateLetter} />
      </View>
      <Text style={{alignSelf: 'center', backgroundColor: 'red'}}>
        {wordOfTheDay?.word}
      </Text>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  gridContainer: {
    flex: 1,
    marginTop: 55,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  qwertyContainer: {
    flex: 1,
    alignItems: 'center',
    marginTop: 150,
  },
});
