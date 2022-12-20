import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Home, Result} from '../home';

export type HomeStackParams = {
  Home: undefined;
  Result: {
    points: number;
    isSolved: boolean;
  };
};

const Stack = createNativeStackNavigator<HomeStackParams>();

function HomeStack() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        options={{headerShown: false}}
        component={Home}
      />
      <Stack.Screen
        options={{presentation: 'modal'}}
        name="Result"
        component={Result}
      />
    </Stack.Navigator>
  );
}

export default HomeStack;
