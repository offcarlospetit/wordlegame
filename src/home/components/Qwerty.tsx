import React from 'react';
import { StyleSheet, View } from 'react-native';
import { KeyBoardCell } from '../../ui-kit';
import { QwertyTypeArray } from '../types';

type Props = {
  qwerty: QwertyTypeArray;
  updateLetter: (letter: string) => {};
  evaluatingRow: boolean;
};

const Qwerty = (props: Props) => {
  const { qwerty, updateLetter, evaluatingRow } = props;
  return (
    <>
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
    </>
  );
};

export default Qwerty;

const styles = StyleSheet.create({
  qwertyRow: {
    flexDirection: 'row',
    marginBottom: 10,
  },
});
