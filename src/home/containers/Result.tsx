import {StyleSheet, Text, View} from 'react-native';
import React, {useLayoutEffect} from 'react';
import {Container, TextUI} from '../../ui-kit';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {HomeStackParams} from '../../navigation/HomeStack';

export interface ResultProps extends NativeStackScreenProps<HomeStackParams> {}

const Result = (props: ResultProps) => {
  const {navigation} = props;

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View>
          <TextUI>Test</TextUI>
        </View>
      ),
    });
  }, [navigation]);

  return <Container></Container>;
};

export default Result;

const styles = StyleSheet.create({});
