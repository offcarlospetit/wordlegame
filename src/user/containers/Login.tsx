import React from 'react';
import { BasicHeader, Box, Button, Container, TextInput } from '../../ui-kit';
import useLogin from '../hooks/useLogin';
import SocialButton from '../components/SocialButton';

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { UserStackParams } from '../navigation';

export interface LoginProps extends NativeStackScreenProps<UserStackParams, 'Login'> { }

const Login: React.FC<LoginProps> = ({ navigation }) => {
  const { handleEmail, handleLogin, handlePassword, signInWithGoogle, email, password, loading } = useLogin();

  const handleNavigation = () => {
    navigation.navigate('Intro');
  };

  return (
    <Container>

      <BasicHeader handleNavigation={handleNavigation} />

      <Box flex={1} paddingHorizontal="m" justifyContent="center">
        <Box paddingTop="xs" paddingBottom="xs" alignSelf="stretch" marginTop="l">
          <TextInput
            variant="regular"
            onChangeText={handleEmail}
            value={email}
            placeholder="email@address.com"
            autoCapitalize={'none'}
          />
        </Box>
        <Box paddingTop="xs" paddingBottom="xs" alignSelf="stretch" >
          <TextInput
            variant="regular"
            onChangeText={handlePassword}
            value={password}
            secureTextEntry={true}
            placeholder="Password"
            autoCapitalize={'none'}
          />
        </Box>
        <Box paddingTop="xs" paddingBottom="xs" alignSelf="stretch" marginTop="l">
          <Button onPress={() => handleLogin('LOGIN', email, password)} variant="loginButton" label="Log In" />
        </Box>
        {/* <Text textAlign="center" marginTop="l" variant="detailTitle" >
        or
      </Text>
      <Box alignItems="center">
        <SocialButton onPress={signInWithGoogle} type="google" title="Sign In with Google" />
        <SocialButton onPress={() => {
        }} type="apple" title="Sign In with Apple" />
      </Box> */}
      </Box>
    </Container>
  );
};

export default Login;
