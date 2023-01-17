import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../containers/Login';
import Register from '../containers/Register';
import IntroComponent from '../containers/Intro';

export type UserStackParams = {
  Login: undefined;
  Intro: undefined;
  Register: undefined;
};

const Stack = createNativeStackNavigator<UserStackParams>();

function LoginStack() {
  return (
    <Stack.Navigator initialRouteName='Intro' screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Intro" component={IntroComponent} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="Login" component={Login} />
    </Stack.Navigator>
  );
}

export default LoginStack;
