import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import {TextUI} from '..';
import Colors from '../constants/Colors';
import ConstValues from '../constants/ConstValues';
import {SIZE_QWERTY} from '../utils/Scale';
const {ONE, BACk, ENTER, ZERO} = ConstValues;
type Props = {
  letter: string;
  textColor: string;
  color: string;
  updateLetter: (letter: string) => {};
};

const KeyBoardCell = (props: Props) => {
  const {letter, textColor, updateLetter, color} = props;
  const getStyle = (letter: string, color: string) => {
    return {
      width:
        letter === ONE || letter === ZERO ? SIZE_QWERTY + 15 : SIZE_QWERTY - 3,
      backgroundColor: color,
    } as ViewStyle;
  };
  const returnLetter = (letter: string): string => {
    if (letter === ONE) return ENTER;
    if (letter === ZERO) return BACk;
    return letter.toUpperCase();
  };
  const letterContainer = getStyle(letter, color);
  return (
    <TouchableOpacity
      key={letter}
      onPress={() => {
        updateLetter(letter);
      }}>
      <View style={[letterContainer, styles.qwertyLetterContainer]}>
        <TextUI style={{color: textColor}}>{returnLetter(letter)}</TextUI>
      </View>
    </TouchableOpacity>
  );
};

export default KeyBoardCell;

const styles = StyleSheet.create({
  qwertyLetterContainer: {
    borderWidth: 1,
    marginRight: 1,
    marginLeft: 1,
    borderColor: Colors.silverSand,
    borderRadius: 5,
    height: SIZE_QWERTY + 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
