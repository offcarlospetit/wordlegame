import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { GridCell } from '../../ui-kit';
import { GridLayoutType } from '../types';

export interface PropsGrid {
  grid: GridLayoutType;
  evaluatingRow: boolean;
}

const Grid = (props: PropsGrid) => {
  const { grid, evaluatingRow } = props;
  return (
    <>
      {grid.map((row, index) => {
        const rowIsEvaluated = row.evaluate;
        return (
          <View key={index} style={styles.gridLetterColum}>
            {row.row.map((column, ind) => {
              return (
                <GridCell
                  value={column.value}
                  exist={column.exist}
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
