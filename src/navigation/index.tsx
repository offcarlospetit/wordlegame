// Navigation index file return login view if user is not logged in and return TabNavigator if user is logged in.

import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Colors } from '../ui-kit';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomTabs from './TabNavigator';
import { LoginStack } from '../user';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

const MainNavigator = createNativeStackNavigator();

function MainStack() {
  const [isLogged, setIsLogged] = React.useState(false);
  const state = useSelector((state: RootState) => state);
  React.useEffect(() => {
    if (state.user.session?.access_token) setIsLogged(true);
    else {
      setIsLogged(false);
    }
  }, [state]);

  return (
    <NavigationContainer>
      <MainNavigator.Navigator screenOptions={{ headerShown: false }}>
        {isLogged ? (
          <MainNavigator.Screen
            name="GameStack"
            component={BottomTabs}
            options={{
              headerStyle: {
                backgroundColor: Colors.white,
              },
              headerTitleStyle: {
                fontSize: 24,
              },
            }}
          />
        ) : (
          <MainNavigator.Screen
            name="LoginStack"
            component={LoginStack}
            options={{
              headerStyle: {
                backgroundColor: Colors.white,
              },
              headerTitleStyle: {
                fontSize: 24,
              },
            }}
          />
        )}
      </MainNavigator.Navigator>
    </NavigationContainer>
  );
}

export default MainStack;
