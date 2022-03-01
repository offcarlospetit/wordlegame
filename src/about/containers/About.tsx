import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Container, TextUI} from '../../ui-kit';

type Props = {};

const About = (props: Props) => {
  return (
    <Container>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <View>
          <TextUI style={{fontSize: 35, textAlign: 'center'}}>
            Hi, i´m Carlos and this is a little NotWordle Game
          </TextUI>
        </View>
        <View>
          <TextUI style={{fontSize: 35}}>Made with ❤️</TextUI>
        </View>
        <TextUI style={{fontSize: 35}}>And</TextUI>
        <TextUI style={{fontSize: 35}}>🍺</TextUI>
      </View>
    </Container>
  );
};
const styles = StyleSheet.create({});

export default About;
