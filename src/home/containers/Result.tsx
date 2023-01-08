import React, { useLayoutEffect } from 'react';
import { Box, Button, Container, Text } from '../../ui-kit';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { HomeStackParams } from '../../navigation/HomeStack';

export interface ResultProps
  extends NativeStackScreenProps<HomeStackParams, 'Result'> { }

const Result: React.FC<ResultProps> = ({ navigation, route }) => {
  const { points, isSolved } = route.params;
  useLayoutEffect(() => {
    navigation.setOptions({});
  }, [navigation]);

  return (
    <Container>
      <Box flex={1} justifyContent='center' alignItems='center'>
        <Box justifyContent='center' alignItems='center'>
          <Text variant='winTextVariant'>
            Congratulations you find the word of the day 🎉🎉🎉
          </Text>
          <Text variant="winTextResultVarian">Your wordle result</Text>
          <Text variant="winTextResultVarian">{points}</Text>
        </Box>
      </Box>
      <Box flex={1} paddingHorizontal="m">
        <Box flex={1}>
          <Button
            marginBottom={'m'}
            variant={'success'}
            onPress={() => {
              null;
            }}
            label={'See the ranking'}
          />
          <Button
            variant={'primary'}
            onPress={() => {
              null;
            }}
            label={'Accept'}
          />
        </Box>
      </Box>
    </Container >
  );
};

export default Result;