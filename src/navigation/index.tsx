import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import HomeStack from './HomeStack';
import ProfileStack from './ProfileStack';
import { Colors } from '../ui-kit';

const Tab = createBottomTabNavigator();

function BottomTabs() {
    return (
        <NavigationContainer>
            <Tab.Navigator >
                <Tab.Screen
                    options={{
                        tabBarIcon: ({ focused, color, size }) => <Icon name='grid-outline' color={focused ? Colors.semanticRedError : Colors.black} size={24} />,
                        tabBarActiveTintColor: Colors.semanticRedError,
                        tabBarInactiveTintColor: Colors.black
                    }}
                    name="Game"
                    component={HomeStack}
                />
                <Tab.Screen
                    options={{ tabBarIcon: ({ focused, color, size }) => <Icon name='person-circle-outline' color={focused ? Colors.semanticRedError : Colors.black} size={24} /> }}
                    name="My Profile"
                    component={ProfileStack}
                />
            </Tab.Navigator>
        </NavigationContainer>
    );
}

export default BottomTabs;