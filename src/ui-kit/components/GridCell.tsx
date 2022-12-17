import React from 'react';
import {StyleSheet, Text, TextStyle, View, ViewStyle} from 'react-native';
import {Exist} from '../types';
import {COLOR_BY_TYPE, TextUI, TEXT_COLOR_BY_TYPE} from '../index';
import Colors from '../constants/Colors';
import {SIZE} from '../utils/Scale';
import Scale from '../utils/Scale';
import Animated, {BounceIn} from 'react-native-reanimated';

type Props = {
  rowIsEvaluated: boolean;
  value: string;
  exist: Exist;
  animated?: boolean;
};

const GridCell = (props: Props) => {
  const {rowIsEvaluated, value, exist, animated} = props;
  const letterGridDynamic = {
    backgroundColor: rowIsEvaluated ? COLOR_BY_TYPE[exist] : 'white',
  } as ViewStyle;
  const letterGridTextDynamic = {
    color: rowIsEvaluated ? TEXT_COLOR_BY_TYPE[exist] : Colors.black,
  } as TextStyle;
  return (
    <Animated.View
      style={[letterGridDynamic, styles.letterGrid]}>
      <TextUI style={{...letterGridTextDynamic, ...styles.letterGridText}}>
        {value}
      </TextUI>
    </Animated.View>
  );
};

export default GridCell;

const styles = StyleSheet.create({
  letterGrid: {
    borderWidth: Scale(1),
    justifyContent: 'center',
    borderColor: Colors.silver,
    width: SIZE,
    height: SIZE,
    marginRight: Scale(3),
    marginLeft: Scale(3),
    marginBottom: Scale(3),
    borderRadius: Scale(5),
  },
  letterGridText: {
    fontSize: 20,
    textAlign: 'center',
  },
});
