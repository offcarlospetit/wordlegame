import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Box, Button, Text, TextInput } from '../../ui-kit';
import { SocialIcon } from '@rneui/themed';
import useLogin from '../hooks/useLogin';

type Props = {};
const Register: React.FC<Props> = ({ }) => {
    const {
        handleEmail,
        handleLogin,
        handlePassword,
        signInWithGoogle,
        email,
        password,
        handleName,
        handleUsername,
        name,
        username,
        error
    } = useLogin();

    return (
        <Box flex={1} paddingHorizontal="m" justifyContent="center">
            <Box marginTop="l" paddingTop="xs" paddingBottom="xs" alignSelf="stretch" >
                <TextInput
                    variant="regular"
                    onChangeText={handleName}
                    value={name}
                    placeholder="Your Name"
                    autoCapitalize={'words'}
                />
            </Box>
            <Box marginTop="l" paddingTop="xs" paddingBottom="xs" alignSelf="stretch" >
                <TextInput
                    variant="regular"
                    onChangeText={handleUsername}
                    value={username}
                    placeholder="your username"
                    autoCapitalize={'none'}
                />
            </Box>
            <Box marginTop="l" paddingTop="xs" paddingBottom="xs" alignSelf="stretch" >
                <TextInput
                    variant="regular"
                    onChangeText={handleEmail}
                    value={email}
                    placeholder="email@address.com"
                    autoCapitalize={'none'}
                />
            </Box>
            <Box marginTop="l" paddingTop="xs" paddingBottom="xs" alignSelf="stretch" >
                <TextInput
                    variant="regular"
                    onChangeText={handlePassword}
                    value={password}
                    secureTextEntry={true}
                    placeholder="Password"
                    autoCapitalize={'none'}
                />
            </Box>
            <Box marginTop="l" paddingTop="xs" paddingBottom="xs" alignSelf="stretch" >
                {error ? <Text variant="danger">{error}</Text> : null}
            </Box>
            <Box marginTop="l" paddingTop="xs" paddingBottom="xs" alignSelf="stretch" >
                <Button variant="success" label="Sign Up" onPress={() => handleLogin('SIGNUP', email, password)} />
            </Box>
            <Text variant="detailTitle" style={{ textAlign: 'center', marginTop: 20 }}>
                or
            </Text>
            <Box style={{ alignItems: 'center' }}>
                <SocialIcon
                    button
                    light
                    Component={TouchableOpacity}
                    raised={false}
                    title="Sign In with Google"
                    fontStyle={{ color: 'black' }}
                    style={{ width: 300 }}
                    type="google"
                    onPress={signInWithGoogle}
                />
                <SocialIcon
                    Component={TouchableOpacity}
                    button
                    light
                    raised={false}
                    title="Sign In with Apple"
                    fontStyle={{ color: 'black' }}
                    style={{ width: 300 }}
                    //@ts-ignore
                    type="apple"
                    onPress={() => {
                        console.log('facebook');
                    }}
                />
            </Box>
        </Box>
    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: 40,
        padding: 20,
    },
    verticallySpaced: {
        paddingTop: 4,
        paddingBottom: 4,
        alignSelf: 'stretch',
    },
});

export default Register;