import React, {memo} from 'react';
import {StyleSheet, View} from 'react-native';
import {GridCell, Scale} from '../../ui-kit';
import {GridLayoutType} from '../types';

export interface PropsGrid {
  grid: GridLayoutType;
  evaluatingRow: boolean;
  actualRow: number;
  actualColumn: number;
  isFinish: boolean;
}

const Grid = memo(function GridMemo(props: PropsGrid) {
  const {grid, actualRow, actualColumn, evaluatingRow, isFinish} = props;
  return (
    <View>
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
                  animated={actualRow === index && isFinish}
                />
              );
            })}
          </View>
        );
      })}
    </View>
  );
});

export default Grid;

const styles = StyleSheet.create({
  gridLetterColum: {
    flexDirection: 'row',
    paddingHorizontal: Scale(16),
  },
});
