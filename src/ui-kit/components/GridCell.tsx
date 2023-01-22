import React from 'react';
import { StyleSheet, TextStyle, View, ViewStyle } from 'react-native';
import { Exist } from '../types';
import { COLOR_BY_TYPE, TextUI, Text, TEXT_COLOR_BY_TYPE, Colors } from '../index';
import { SIZE } from '../utils/Scale';
import Scale from '../utils/Scale';
import Animated, { BounceIn } from 'react-native-reanimated';
import { palette } from '../theme';

type Props = {
  rowIsEvaluated: boolean;
  value: string;
  exist: Exist;
  animated?: boolean;
  actualRow?: boolean;
};

const GridCell = (props: Props) => {
  const { rowIsEvaluated, value, exist, animated, actualRow } = props;
  const letterGridDynamic = {
    backgroundColor: rowIsEvaluated ? COLOR_BY_TYPE[exist] : 'white',
    borderColor: actualRow ? palette.CeruleanCrayola : Colors.silver,
  } as ViewStyle;
  const letterGridTextDynamic = {
    color: rowIsEvaluated ? TEXT_COLOR_BY_TYPE[exist] : Colors.black,
  } as TextStyle;
  return (
    <Animated.View
      style={[letterGridDynamic, styles.letterGrid]}>
      <Text lineHeight={24} style={{ ...letterGridTextDynamic, ...styles.letterGridText }}>
        {value}
      </Text>
    </Animated.View>
  );
};

export default GridCell;

const styles = StyleSheet.create({
  letterGrid: {
    borderWidth: Scale(1),
    justifyContent: 'center',
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
