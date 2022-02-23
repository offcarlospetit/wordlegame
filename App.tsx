import React, {useEffect} from 'react';
import {
  Alert,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {CellStruct, Exist, GridLayout, GridLayoutType} from './src/types';
import {gridBuilder} from './src/utils/Builders';
import {
  existTypeColor,
  existTypeColorText,
  SIZE,
  SIZE_QWERTY,
  _qwerty,
} from './src/utils/Const';

type Props = {};

const App = (props: Props) => {
  const [grid, setGrid] = React.useState<GridLayoutType>(gridBuilder(6));
  const [isSolved, setIsSolved] = React.useState(false);
  const [qwerty, setQuerty] = React.useState(_qwerty);
  const [letters, setLetters] = React.useState<Array<CellStruct>>([]);
  const [evaluatingRow, setIsEvaluatingRow] = React.useState(false);
  const [actualRow, setActualRow] = React.useState(0);
  const [actualColum, setActualColum] = React.useState(0);
  const [wordOfTheDay, setWordOfTheDay] = React.useState('COBRA');

  const returnGrid = () => {
    return grid.map((column, index) => {
      const rowIsEvaluated = column.evaluate;
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
                  backgroundColor: rowIsEvaluated
                    ? existTypeColor[row.exist]
                    : 'white',
                  marginRight: 3,
                  marginLeft: 3,
                  marginBottom: 3,
                  borderRadius: 3,
                }}>
                <Text
                  style={{
                    fontSize: 20,
                    textAlign: 'center',
                    color: rowIsEvaluated
                      ? existTypeColorText[row.exist]
                      : 'black',
                  }}>
                  {row.value}
                </Text>
              </View>
            );
          })}
        </View>
      );
    });
  };

  const evaluateBackButton = (letter: string) => {
    const newGrid = [...grid];

    setIsEvaluatingRow(false);
    const column = actualColum == 4 ? actualColum : actualColum - 1;
    newGrid[actualRow].row[column].value = '';
    if (actualColum > 0) {
      setActualColum(column);
    }
    setGrid(newGrid);
  };

  const evaluateEnterButton = (letter: string) => {
    const newGrid = [...grid];
    // enter
    setIsEvaluatingRow(true);
    // si es una palabra valida
    // evaluamos la palabra
    // repintamos el grid
    // aumentamos la fila
    const word = newGrid[actualRow].row.map(colum => colum.value).join('');
    // Aqui hago la llamada al diccionario rae
    const validWord = word;
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
            quertyLetter.color = existTypeColor[letterMarked.exist];
            quertyLetter.textColor = existTypeColorText[letterMarked.exist];
          }
        });
      });
    });
    setQuerty(qwerty);
  }, [actualRow]);

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.gridContainer}>{returnGrid()}</View>
      <View style={styles.qwertyContainer}>
        {qwerty.map((row, index) => {
          return (
            <View key={index + Math.random()} style={styles.qwertyRow}>
              {row.map(letter => {
                return (
                  <TouchableOpacity
                    key={letter.letter}
                    onPress={() => {
                      updateLetter(letter.letter);
                    }}>
                    <View
                      style={[
                        {
                          width:
                            letter.letter === '1' || letter.letter === '0'
                              ? SIZE_QWERTY + 15
                              : SIZE_QWERTY - 3,
                          height: SIZE_QWERTY + 10,
                          backgroundColor: letter.color,
                        },
                        styles.qwertyLetterContainer,
                      ]}>
                      <Text
                        style={[
                          styles.qwertyLetter,
                          {color: letter.textColor},
                        ]}>
                        {returnLetter(letter.letter)}
                      </Text>
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
          );
        })}
      </View>
    </SafeAreaView>
  );
};

export default App;

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
  qwertyRow: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  qwertyLetterContainer: {
    borderWidth: 1,
    marginRight: 1,
    marginLeft: 1,
    justifyContent: 'center',
    borderColor: '#c6c6c6',
    borderRadius: 5,
  },
  qwertyLetter: {
    fontSize: 16,
    textAlign: 'center',
  },
});
