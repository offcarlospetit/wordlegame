import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeStack from './HomeStack';
import ProfileStack from './ProfileStack';
import { Colors, TabBar } from '../ui-kit';
import AboutStack from './AboutStack';
import RankStack from './RankStack';

export type BottomTabParamList = {
  Game: undefined;
  About: undefined;
  RankStack: undefined;
  Profile: undefined;
};

const Tab = createBottomTabNavigator();

function BottomTabs() {
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false }}
      tabBar={props => <TabBar {...props} />}>
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
          tabBarLabel: "Game"
        }}
      />
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
          tabBarLabel: "About"
        }}
      />
      <Tab.Screen options={{ tabBarLabel: "Rank" }} name="RankStack" component={RankStack} />
      <Tab.Screen name="Profile" component={ProfileStack} />
    </Tab.Navigator>
  );
}

export default BottomTabs;
