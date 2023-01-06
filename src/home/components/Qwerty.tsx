import React, { memo } from 'react';
import { Box, KeyBoardCell } from '../../ui-kit';
import { QwertyTypeArray } from '../types';

type Props = {
  qwerty: QwertyTypeArray;
  updateLetter: (letter: string) => {};
  evaluatingRow: boolean;
};

const Qwerty = memo(function QwertyMemo(props: Props) {
  const { qwerty, updateLetter, evaluatingRow } = props;
  return (
    <Box flex={1}>
      {qwerty.map((row, index) => {
        return (
          <Box
            key={index + Math.random()}
            flexDirection="row"
            marginBottom='xs'
            justifyContent='center'
            alignItems='center'
          >
            {row.map(letter => {
              return (
                <KeyBoardCell
                  key={letter + '' + Math.random() + ''}
                  letter={letter.letter}
                  color={letter.color}
                  textColor={letter.textColor}
                  updateLetter={updateLetter}
                  evaluatingRow={evaluatingRow}
                />
              );
            })}
          </Box>
        );
      })}
    </Box>
  );
});

export default Qwerty;