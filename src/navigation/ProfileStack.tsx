import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Profile as ProfileView } from '../profile';

const Stack = createNativeStackNavigator();

function ProfileStack() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Profile" component={ProfileView} />
        </Stack.Navigator>
    );
}

export default ProfileStack