import React, { useLayoutEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Container, Scale, TextUI } from '../../ui-kit';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { HomeStackParams } from '../../navigation/HomeStack';

export interface ResultProps extends NativeStackScreenProps<HomeStackParams> { }

const Result = (props: ResultProps) => {
  const { navigation } = props;

  useLayoutEffect(() => {
    navigation.setOptions({});
  }, [navigation]);

  return (
    <Container>
      <View style={styles.containerWordleResult}>
        {
          [...Array(6)].map((row) => {
            return (
              <View key={Math.random()} style={styles.rowContainer}>
                <View style={styles.containerTry}>
                  <TextUI style={styles.text}>try one</TextUI>
                </View>
                <View style={styles.containerWordle}>
                  <TextUI style={styles.text}>◼◼◼◼◼◼</TextUI>
                </View>
                <View style={styles.containerPercent}>
                  <TextUI style={styles.text}>60%</TextUI>
                </View>
              </View>
            )
          })
        }
      </View>
      <View style={styles.buttonContainer}>
        <Button onPress={() => { null }} text={"Accept"} />
        <Button size='small' type='success' onPress={() => { null }} text={"Share"} />
      </View>
    </Container>
  )
};

export default Result;

const styles = StyleSheet.create({
  containerWordleResult: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  rowContainer: {
    marginTop: Scale(16),
    flexDirection: 'row'
  },
  containerTry: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  containerWordle: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center'
  },
  containerPercent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    fontSize: 18
  },
  buttonContainer: {
    flex: 1
  }
});
