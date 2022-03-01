import * as React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import HomeStack from './HomeStack';
import ProfileStack from './ProfileStack';
import {Colors, TabBar} from '../ui-kit';
import AboutStack from './AboutStack';

const Tab = createBottomTabNavigator();

function BottomTabs() {
  return (
    <NavigationContainer>
      <Tab.Navigator tabBar={props => <TabBar {...props} />}>
        <Tab.Screen
          name="Game"
          component={HomeStack}
          options={{
            headerStyle: {
              backgroundColor: Colors.white,
            },
            headerTitleStyle: {
              fontSize: 24,
            },
          }}
        />
        {/* <Tab.Screen
                    name="Profile"
                    component={ProfileStack}
                /> */}
        <Tab.Screen
          name="About"
          component={AboutStack}
          options={{
            headerStyle: {
              backgroundColor: Colors.white,
            },
            headerTitleStyle: {
              fontSize: 24,
            },
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default BottomTabs;
