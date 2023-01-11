import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Rank } from '../rank';

const Stack = createNativeStackNavigator();

function RankStack() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Rank" component={Rank} />
        </Stack.Navigator>
    );
}

export default RankStack;