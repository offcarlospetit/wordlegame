import React from 'react';
import { BasicHeader, Box, Button, Container, Text, TextInput } from '../../ui-kit';
import useLogin from '../hooks/useLogin';
import SocialButton from '../components/SocialButton';

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { UserStackParams } from '../navigation';
import { Keyboard, KeyboardAvoidingView, Pressable } from 'react-native';
import S from '../../i18n';

export interface LoginProps extends NativeStackScreenProps<UserStackParams, 'Login'> { }

const Login: React.FC<LoginProps> = ({ navigation }) => {
  const { handleEmail, handleLogin, handlePassword, signInWithGoogle, email, password, loading } = useLogin();

  const handleNavigation = () => {
    navigation.navigate('Intro');
  };

  return (
    <Container>

      <BasicHeader handleNavigation={handleNavigation} />
      {/* <Pressable onPress={() => Keyboard.dismiss()} style={{ flex: 1 }}>
        <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding" keyboardVerticalOffset={0}> */}
      <Box flex={1} paddingHorizontal="m" justifyContent="center">
        <Box flex={1} justifyContent="center" paddingBottom="xl">
          <Text variant="title">{S.User.userLogin}</Text>
        </Box>
        <Box flex={2}>
          <Box paddingTop="xs" paddingBottom="xs" alignSelf="stretch" marginTop="l">
            <TextInput
              variant="regular"
              onChangeText={handleEmail}
              value={email}
              placeholder={S.User.userEmail}
              autoCapitalize={'none'}
            />
          </Box>
          <Box paddingTop="xs" paddingBottom="xs" alignSelf="stretch" >
            <TextInput
              variant="regular"
              onChangeText={handlePassword}
              value={password}
              secureTextEntry={true}
              placeholder={S.User.userPassword}
              autoCapitalize={'none'}
            />
          </Box>
          <Box paddingTop="xs" paddingBottom="xs" alignSelf="stretch" marginTop="l">
            <Button onPress={() => handleLogin('LOGIN', email, password)} variant="loginButton" label={S.User.userLogin} />
          </Box>
        </Box>
      </Box>
      {/* </KeyboardAvoidingView>
        </Pressable> */}
      {/* <Text textAlign="center" marginTop="l" variant="detailTitle" >
        or
      </Text>
      <Box alignItems="center">
        <SocialButton onPress={signInWithGoogle} type="google" title="Sign In with Google" />
        <SocialButton onPress={() => {
        }} type="apple" title="Sign In with Apple" />
      </Box> */}
    </Container>
  );
};

export default Login;
