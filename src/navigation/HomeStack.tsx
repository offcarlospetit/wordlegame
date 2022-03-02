import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Home, Result } from '../home';

export type HomeStackParams = {
    Result: undefined;
    Home: undefined;
};

const Stack = createNativeStackNavigator<HomeStackParams>();

function HomeStack() {
    return (
        <Stack.Navigator
            initialRouteName="Home">
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen
                options={{ presentation: 'modal' }}
                name="Result"
                component={Result}
            />
        </Stack.Navigator>
    );
}

export default HomeStack;
