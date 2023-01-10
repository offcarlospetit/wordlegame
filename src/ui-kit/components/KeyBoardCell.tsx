import React, { memo, useContext } from 'react';
import { StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';
import Animated from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Text } from '../index';
import theme, { ThemeType } from '../theme';
import Colors from '../constants/Colors';
import ConstValues from '../constants/ConstValues';
import { SIZE_QWERTY } from '../utils/Scale';
import Scale from '../utils/Scale';
import { ContextCore } from '../../core';
const { ONE, ZERO, BACK_ICON, ENTER_ICON } = ConstValues;

type Props = {
  letter: string;
  textColor: string;
  color: string;
  updateLetter: (letter: string) => {};
  evaluatingRow: boolean;
};

const KeyBoardCell = memo((props: Props) => {
  const { hapticFeedback } = useContext(ContextCore);
  const { letter, textColor, updateLetter, color, evaluatingRow } = props;
  const getStyle = (letter: string, color: string) => {
    return {
      width:
        letter === ONE || letter === ZERO
          ? SIZE_QWERTY + Scale(15)
          : SIZE_QWERTY,
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
          <Text style={{ color: textColor }} >{returnLetter(letter)}</Text>
        </Animated.View>
      ) : null}
      {color == Colors.white ? (
        <Animated.View style={[letterContainer, styles.qwertyLetterContainer]}>
          {letter === ONE || letter === ZERO ? (
            returnIcon(letter)
          ) : (
            <Text style={{ color: textColor }} >{returnLetter(letter)}</Text>
          )}
        </Animated.View>
      ) : null}
    </TouchableOpacity>
  );
});

export default KeyBoardCell;

const styles = StyleSheet.create({
  qwertyLetterContainer: {
    borderWidth: Scale(1),
    marginRight: Scale(1),
    marginLeft: Scale(1),
    borderColor: Colors.silverSand,
    borderRadius: Scale(5),
    height: SIZE_QWERTY + Scale(10),
    alignItems: 'center',
    justifyContent: 'center',
  },
  animatedBox: {
    padding: Scale(5),
    alignItems: 'center',
  },
});
