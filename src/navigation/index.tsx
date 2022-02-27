import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import HomeStack from './HomeStack';

const Tab = createBottomTabNavigator();

function BottomTabs() {
    return (
        <NavigationContainer>
            <Tab.Navigator >
                <Tab.Screen name="Game" component={HomeStack} />
            </Tab.Navigator>
        </NavigationContainer>
    );
}

export default BottomTabs;