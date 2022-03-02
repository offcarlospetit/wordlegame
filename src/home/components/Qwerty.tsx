import React, {memo} from 'react';
import {StyleSheet, View} from 'react-native';
import {KeyBoardCell} from '../../ui-kit';
import {Language, QwertyTypeArray} from '../types';

type Props = {
  qwerty: QwertyTypeArray;
  updateLetter: (letter: string) => {};
  evaluatingRow: boolean;
  language: Language;
};

const Qwerty = memo(function QwertyMemo(props: Props) {
  const {qwerty, updateLetter, evaluatingRow, language} = props;
  return (
    <View>
      {qwerty.map((row, index) => {
        return (
          <View key={index + Math.random()} style={styles.qwertyRow}>
            {row.map(letter => {
              return (
                <KeyBoardCell
                  key={letter + '' + Math.random() + ''}
                  letter={letter.letter}
                  color={letter.color}
                  textColor={letter.textColor}
                  updateLetter={updateLetter}
                  evaluatingRow={evaluatingRow}
                />
              );
            })}
          </View>
        );
      })}
    </View>
  );
});

export default Qwerty;

const styles = StyleSheet.create({
  qwertyRow: {
    flexDirection: 'row',
    marginBottom: 10,
    justifyContent: 'center',
  },
});
