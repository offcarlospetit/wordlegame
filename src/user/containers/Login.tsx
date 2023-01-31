import React from 'react';
import { Box, Button, Card, Colors, Container, Text, TextInput } from '../../ui-kit';
import useLogin from '../hooks/useLogin';
import SocialButton from '../components/SocialButton';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/AntDesign';
import { palette } from '../../ui-kit/theme';
import { TouchableOpacity } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { UserStackParams } from '../navigation';

export interface LoginProps extends NativeStackScreenProps<UserStackParams, 'Login'> { }

const Login: React.FC<LoginProps> = ({ navigation }) => {
  const { handleEmail, handleLogin, handlePassword, signInWithGoogle, email, password, loading } = useLogin();
  const { top } = useSafeAreaInsets();

  const handleNavigation = () => {
    console.log("adasdasdasdasmdajskdbaskdbasndba")
    navigation.navigate('Intro');
  };

  return (
    <Container>

      <Card variant="headerCard" style={{ paddingTop: top + 10 }} alignSelf="stretch">
        <Box flex={1} paddingHorizontal="s" alignItems="center" flexDirection="row">
          <TouchableOpacity onPress={handleNavigation}>
            <Icon name={'left'} size={32} color={palette.grayColor} />
          </TouchableOpacity>
        </Box>
      </Card>

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
