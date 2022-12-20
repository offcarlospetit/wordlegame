import React, {useLayoutEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {Button, Colors, Container, Scale, TextUI} from '../../ui-kit';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {HomeStackParams} from '../../navigation/HomeStack';
import Icon from 'react-native-vector-icons/AntDesign';

export interface ResultProps
  extends NativeStackScreenProps<HomeStackParams, 'Result'> {}

const Result: React.FC<ResultProps> = ({navigation, route}) => {
  const {points, isSolved} = route.params;
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
      <View style={styles.buttonContainer}>
        <View
          style={{
            flex: 1,
          }}>
          <Button
            size="medium"
            onPress={() => {
              null;
            }}
            text={'See the ranking'}
            icon="barschart"
          />
          <Button
            size="small"
            onPress={() => {
              null;
            }}
            text={'Accept'}
          />
        </View>
      </View>
    </Container>
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
