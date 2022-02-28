import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { About } from '../about';

const Stack = createNativeStackNavigator();

function AboutStack() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="AboutStack" component={About} />
        </Stack.Navigator>
    );
}

export default AboutStack