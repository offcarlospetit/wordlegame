import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {GridCell} from '../../ui-kit';
import {GridLayoutType} from '../types';

export interface PropsGrid {
  grid: GridLayoutType;
}

const Grid = (props: PropsGrid) => {
  const {grid} = props;
  return (
    <>
      {grid.map((column, index) => {
        const rowIsEvaluated = column.evaluate;
        return (
          <View key={index} style={styles.gridLetterColum}>
            {column.row.map((row, ind) => {
              return (
                <GridCell
                  value={row.value}
                  exist={row.exist}
                  rowIsEvaluated={rowIsEvaluated}
                  key={ind + Math.random() + ''}
                />
              );
            })}
          </View>
        );
      })}
    </>
  );
};

export default Grid;

const styles = StyleSheet.create({
  gridLetterColum: {
    flexDirection: 'row',
    paddingHorizontal: 16,
  },
});
