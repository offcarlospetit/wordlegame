import React from 'react';
import {StyleSheet, Text, TextStyle, View, ViewStyle} from 'react-native';
import {Exist} from '../types';
import {COLOR_BY_TYPE, TextUI, TEXT_COLOR_BY_TYPE} from '../index';
import Colors from '../constants/Colors';
import {SIZE} from '../utils/Scale';

type Props = {
  rowIsEvaluated: boolean;
  value: string;
  exist: Exist;
};

const GridCell = (props: Props) => {
  const {rowIsEvaluated, value, exist} = props;
  const letterGridDynamic = {
    backgroundColor: rowIsEvaluated ? COLOR_BY_TYPE[exist] : 'white',
  } as ViewStyle;
  const letterGridTextDynamic = {
    color: rowIsEvaluated ? TEXT_COLOR_BY_TYPE[exist] : Colors.black,
  } as TextStyle;
  return (
    <View style={[letterGridDynamic, styles.letterGrid]}>
      <TextUI style={{...letterGridTextDynamic, ...styles.letterGridText}}>
        {value}
      </TextUI>
    </View>
  );
};

export default GridCell;

const styles = StyleSheet.create({
  letterGrid: {
    borderWidth: 1,
    justifyContent: 'center',
    borderColor: Colors.silver,
    width: SIZE,
    height: SIZE,
    marginRight: 3,
    marginLeft: 3,
    marginBottom: 3,
    borderRadius: 3,
  },
  letterGridText: {
    fontSize: 20,
    textAlign: 'center',
  },
});
