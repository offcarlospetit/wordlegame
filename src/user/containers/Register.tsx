import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
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
            <View style={[styles.verticallySpaced, { marginTop: 20 }]}>
                <TextInput
                    variant="regular"
                    onChangeText={handleName}
                    value={name}
                    placeholder="Your Name"
                    autoCapitalize={'words'}
                />
            </View>
            <View style={[styles.verticallySpaced, { marginTop: 20 }]}>
                <TextInput
                    variant="regular"
                    onChangeText={handleUsername}
                    value={username}
                    placeholder="your username"
                    autoCapitalize={'none'}
                />
            </View>
            <View style={[styles.verticallySpaced, { marginTop: 20 }]}>
                <TextInput
                    variant="regular"
                    onChangeText={handleEmail}
                    value={email}
                    placeholder="email@address.com"
                    autoCapitalize={'none'}
                />
            </View>
            <View style={[styles.verticallySpaced, { marginTop: 20 }]}>
                <TextInput
                    variant="regular"
                    onChangeText={handlePassword}
                    value={password}
                    secureTextEntry={true}
                    placeholder="Password"
                    autoCapitalize={'none'}
                />
            </View>
            <View style={[styles.verticallySpaced, { marginTop: 20 }]}>
                {error ? <Text variant="danger">{error}</Text> : null}
            </View>
            <View style={[styles.verticallySpaced, { marginTop: 20 }]}>
                <Button variant="success" label="Sign Up" onPress={() => handleLogin('SIGNUP', email, password)} />
            </View>
            <Text variant="detailTitle" style={{ textAlign: 'center', marginTop: 20 }}>
                or
            </Text>
            <View style={{ alignItems: 'center' }}>
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
            </View>
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