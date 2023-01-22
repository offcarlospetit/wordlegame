import React, { memo } from 'react';
import { Box, GridCell } from '../../ui-kit';
import { GridLayoutType } from '../types';

export interface PropsGrid {
  grid: GridLayoutType;
  evaluatingRow: boolean;
  actualRow: number;
  actualColumn: number;
  isFinish: boolean;
}

const Grid = memo(function GridMemo(props: PropsGrid) {
  const { grid, actualRow, actualColumn, evaluatingRow, isFinish } = props;
  return (
    <Box>
      {grid.map((row, index) => {
        const rowIsEvaluated = row.evaluate;
        return (
          <Box key={index} flexDirection="row" paddingHorizontal="m">
            {row.row.map((column, ind) => {
              return (
                <GridCell
                  value={column.value}
                  exist={column.exist}
                  rowIsEvaluated={rowIsEvaluated}
                  key={ind + Math.random() + ''}
                  animated={actualRow === index && isFinish}
                  actualRow={actualColumn === ind && actualRow === index}
                />
              );
            })}
          </Box>
        );
      })}
    </Box>
  );
});

export default Grid;