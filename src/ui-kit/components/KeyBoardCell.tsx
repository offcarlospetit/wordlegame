import React, {memo, useContext} from 'react';
import {StyleSheet, TouchableOpacity, ViewStyle} from 'react-native';
import Animated, {FlipInEasyX} from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {TextUI} from '../index';
import Colors from '../constants/Colors';
import ConstValues from '../constants/ConstValues';
import {SIZE_QWERTY} from '../utils/Scale';
import {ContextCore} from '../../core';
const {ONE, ZERO, BACK_ICON, ENTER_ICON} = ConstValues;
type Props = {
  letter: string;
  textColor: string;
  color: string;
  updateLetter: (letter: string) => {};
  evaluatingRow: boolean;
};

const KeyBoardCell = memo((props: Props) => {
  const {hapticFeedback} = useContext(ContextCore);
  const {letter, textColor, updateLetter, color, evaluatingRow} = props;
  const getStyle = (letter: string, color: string) => {
    return {
      width:
        letter === ONE || letter === ZERO ? SIZE_QWERTY + 15 : SIZE_QWERTY - 3,
      backgroundColor: color,
    } as ViewStyle;
  };
  const returnLetter = (letter: string): string => letter.toUpperCase();

  const letterContainer = getStyle(letter, color);
  const returnName = (letter: string): string =>
    letter === ONE ? ENTER_ICON : BACK_ICON;
  const returnIcon = (letter: string) => {
    return letter === ZERO ? (
      <Ionicons name={returnName(letter)} size={18} color={Colors.black} />
    ) : (
      <Icon name={returnName(letter)} size={18} color={Colors.black} />
    );
  };

  return (
    <TouchableOpacity
      key={letter}
      onPress={() => {
        hapticFeedback();
        updateLetter(letter);
      }}>
      {color !== Colors.white ? (
        <Animated.View
          entering={evaluatingRow ? undefined : undefined}
          style={[letterContainer, styles.qwertyLetterContainer]}>
          <TextUI style={{color: textColor}}>{returnLetter(letter)}</TextUI>
        </Animated.View>
      ) : null}
      {color == Colors.white ? (
        <Animated.View style={[letterContainer, styles.qwertyLetterContainer]}>
          {letter === ONE || letter === ZERO ? (
            returnIcon(letter)
          ) : (
            <TextUI style={{color: textColor}}>{returnLetter(letter)}</TextUI>
          )}
        </Animated.View>
      ) : null}
    </TouchableOpacity>
  );
});

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
  animatedBox: {
    padding: 5,
    alignItems: 'center',
  },
});
