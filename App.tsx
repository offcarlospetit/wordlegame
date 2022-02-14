import React, {useRef} from 'react';
import {
  Alert,
  Dimensions,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  Animated,
  Easing,
} from 'react-native';
const {width, height} = Dimensions.get('window');
const SIZE = 55;
const SIZE_QWERTY = width / 10;

export type Exist = 0 | 1 | 2;

const existTypeColor: Record<Exist, string> = {
  0: '#FFFFFF',
  1: '#4CAF50',
  2: '#FFEB3B',
};

export interface CellStruct {
  x: number;
  y: number;
  value: string;
  exist: Exist; // can be 0=no exist, 1 exist and is the same position, and 2, exist but not in the same position
}

const qwerty = [
  ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
  ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'ñ'],
  ['0', 'z', 'x', 'c', 'v', 'b', 'n', 'm', '1'],
];

export type GridStruct = CellStruct[][];
export interface GridLayout {
  evaluate: boolean;
  row: Array<CellStruct>;
}

export type GridLayoutType = Array<GridLayout>;

const gridBuilder = (size: number): GridLayoutType => {
  return [...Array(size)].map((_, x: number): GridLayout => {
    return {
      evaluate: false,
      row: [...Array(5)].map((_, y: number) => {
        return {x, y, value: '', exist: 0};
      }),
    };
  });
};

const generateQwertyKeyboard = () => {};

type Props = {};

const App = (props: Props) => {
  const [grid, setGrid] = React.useState<GridLayoutType>(gridBuilder(6));
  const [isSolved, setIsSolved] = React.useState(false);
  const [evaluatingRow, setIsEvaluatingRow] = React.useState(false);
  const [actualRow, setActualRow] = React.useState(0);
  const [actualColum, setActualColum] = React.useState(0);
  const [wordOfTheDay, setWordOfTheDay] = React.useState('COBRA');

  const returnGrid = () => {
    return grid.map((column, index) => {
      return (
        <View key={index} style={{flexDirection: 'row', paddingHorizontal: 16}}>
          {column.row.map((row, ind) => {
            return (
              <View
                key={ind + Math.random()}
                style={{
                  borderWidth: 1,
                  justifyContent: 'center',
                  borderColor: '#BDBDBD',
                  width: SIZE,
                  height: SIZE,
                  backgroundColor: evaluatingRow
                    ? existTypeColor[row.exist]
                    : 'white',
                  marginRight: 3,
                  marginLeft: 3,
                  marginBottom: 3,
                  borderRadius: 3,
                }}>
                <Text style={{fontSize: 20, textAlign: 'center'}}>
                  {row.value}
                </Text>
              </View>
            );
          })}
        </View>
      );
    });
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
    if (letter === '0') {
      setIsEvaluatingRow(false);
      newGrid[actualRow].row[actualColum].value = '';
      if (actualColum > 0) {
        setActualColum(actualColum - 1);
      }
      setGrid(newGrid);
    }

    if (letter === '1') {
      setIsEvaluatingRow(true);
      // si es una palabra valida
      // evaluamos la palabra
      // repintamos el grid
      // aumentamos la fila
      const word = newGrid[actualRow].row.map(colum => colum.value).join('');
      // Aqui hago la llamada al diccionario rae
      const validWord = word;
      console.log({word});
      if (validWord) {
        const result = findDiff(word);
        result.map((wordResult, index) => {
          newGrid[actualRow].row[index].exist = wordResult.exist;
        });
        setGrid(newGrid);
        if (actualRow < 5) {
          setActualRow(actualRow + 1);
          setActualColum(0);
        }
      } else {
        Alert.alert('Palabra no valida');
      }
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
      const resultFind = locations(char, index, wordOfTheDay);
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
    var a = [],
      i = -1;
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

  const returnLetter = (letter: string): string => {
    if (letter === '1') return 'Enter';
    if (letter === '0') return 'Back';
    return letter.toUpperCase();
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View
        style={{
          flex: 1,
          marginTop: 55,
          justifyContent: 'flex-start',
          alignItems: 'center',
        }}>
        {returnGrid()}
      </View>
      <View style={{flex: 1, alignItems: 'center'}}>
        <View style={{marginTop: 75}}>
          {qwerty.map((row, index) => {
            return (
              <View
                key={index + Math.random()}
                style={{flexDirection: 'row', marginBottom: 10}}>
                {row.map((letter, letterIndex) => {
                  return (
                    <TouchableOpacity
                      key={letter}
                      onPress={() => {
                        updateLetter(letter);
                      }}>
                      <View
                        style={{
                          width:
                            letter === '1' || letter === '0'
                              ? SIZE_QWERTY + 15
                              : SIZE_QWERTY - 3,
                          height: SIZE_QWERTY + 10,
                          borderWidth: 1,
                          marginRight: 1,
                          marginLeft: 1,
                          justifyContent: 'center',
                          borderColor: '#c6c6c6',
                          borderRadius: 5,
                        }}>
                        <Text style={{fontSize: 16, textAlign: 'center'}}>
                          {returnLetter(letter)}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  );
                })}
              </View>
            );
          })}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({});
