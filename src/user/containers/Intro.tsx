import React from 'react';
import { Box, Button } from '../../ui-kit';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { UserStackParams } from '../navigation';
import LottieView from "lottie-react-native";

export interface IntroProps extends NativeStackScreenProps<UserStackParams, 'Intro'> { }

const IntroComponent: React.FC<IntroProps> = ({ navigation }) => {
    const { bottom } = useSafeAreaInsets();

    const login = () => {
        navigation.navigate('Login');
    };

    const register = () => {
        navigation.navigate('Register');
    };

    return (
        <Box flex={1} backgroundColor="white">
            <LottieView
                source={require('../../assets/animation_intro.json')}
                autoPlay
                loop
            />
            <Box paddingHorizontal="m" width="100%" position="absolute" bottom={bottom}>
                <Box marginBottom="m">
                    <Button onPress={login} variant="loginButton" label="Log In" />
                </Box>
                <Box marginBottom="m">
                    <Button onPress={register} variant="signUpButton" label="Sign Up" />
                </Box>
            </Box>
        </Box >
    );
};

export default IntroComponent;