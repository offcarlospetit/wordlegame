import React, {memo} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {KeyBoardCell, Scale} from '../../ui-kit';
import {QwertyTypeArray} from '../types';

type Props = {
  qwerty: QwertyTypeArray;
  updateLetter: (letter: string) => {};
  evaluatingRow: boolean;
};

const Qwerty = memo(function QwertyMemo(props: Props) {
  const {qwerty, updateLetter, evaluatingRow} = props;
  return (
    <View style={{flex: 1}}>
      {qwerty.map((row, index) => {
        return (
          <View
            key={index + Math.random()}
            style={[
              styles.qwertyRow,
              {
                alignItems: 'center'
              },
            ]}>
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
    marginBottom: Scale(10),
    justifyContent: 'center',
  },
});
