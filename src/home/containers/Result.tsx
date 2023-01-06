import React, { useLayoutEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { Box, Button, Colors, Container, Scale, TextUI } from '../../ui-kit';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { HomeStackParams } from '../../navigation/HomeStack';
import Icon from 'react-native-vector-icons/AntDesign';

export interface ResultProps
  extends NativeStackScreenProps<HomeStackParams, 'Result'> { }

const Result: React.FC<ResultProps> = ({ navigation, route }) => {
  const { points, isSolved } = route.params;
  useLayoutEffect(() => {
    navigation.setOptions({});
  }, [navigation]);

  return (
    <Container>
      <View style={styles.containerWordleResult}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <TextUI style={styles.winText}>
            Congratulations you find the word of the day 🎉🎉🎉
          </TextUI>
          <TextUI style={styles.winTextResult}>Your wordle result</TextUI>
          <TextUI style={styles.winTextResult}>{points}</TextUI>
        </View>
      </View>
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

const styles = StyleSheet.create({
  containerWordleResult: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rowContainer: {
    marginTop: Scale(16),
    flexDirection: 'row',
  },
  containerTry: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerWordle: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerPercent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
  },
  buttonContainer: {
    flex: 1,
  },
  winText: {
    fontSize: 32,
    color: Colors.success,
    textAlign: 'center',
    marginBottom: Scale(16),
  },
  winTextResult: {
    fontSize: 32,
    color: Colors.success,
  },
});
