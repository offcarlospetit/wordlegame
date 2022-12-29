import React, {useState} from 'react';
import {Alert, StyleSheet, TextInput, View} from 'react-native';
import {makeRedirectUri, startAsync} from 'expo-auth-session';
import {SUPABASE_URL, supabase} from '../../utils/initSupBase';
import {Button} from '../../ui-kit';
import {loginSuccess} from '../reducers/UserReducer';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../store';
import {UserResponse} from '@supabase/supabase-js';

export default function Auth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState('');
  const dispatch = useDispatch();

  const handleLogin = async (type: string, email: string, password: string) => {
    setLoading(type);
    const {error, data} =
      type === 'LOGIN'
        ? await supabase.auth.signInWithPassword({email, password})
        : await supabase.auth.signUp({email, password});
    if (!error && !data) Alert.alert('Check your email for the login link!');
    if (error) Alert.alert(error.message);
    setLoading('');
  };

  async function signInWithGoogle() {
    const redirectUrl = makeRedirectUri({
      path: '/',
    });
    const authResponse = await startAsync({
      authUrl: `${SUPABASE_URL}/auth/v1/authorize?provider=google&redirect_to=${redirectUrl}`,
      returnUrl: redirectUrl,
    });

    if (authResponse.type === 'success') {
      supabase.auth.setSession({
        access_token: authResponse.params.access_token,
        refresh_token: authResponse.params.refresh_token,
      });

      const userInfo: UserResponse = await supabase.auth.getUser(
        authResponse.params.access_token,
      );
      if (!userInfo.data.user) return;
      dispatch(loginSuccess({...userInfo.data, ...authResponse}));
    }
  }

  return (
    <View style={{flex: 1, paddingHorizontal: 16, justifyContent: 'center'}}>
      <View style={[styles.verticallySpaced, {marginTop: 20}]}>
        <TextInput
          onChangeText={text => setEmail(text)}
          value={email}
          placeholder="email@address.com"
          autoCapitalize={'none'}
        />
      </View>
      <View style={styles.verticallySpaced}>
        <TextInput
          onChangeText={text => setPassword(text)}
          value={password}
          secureTextEntry={true}
          placeholder="Password"
          autoCapitalize={'none'}
        />
      </View>
      <View style={[styles.verticallySpaced, {marginTop: 20}]}>
        <Button
          text="Sign in"
          disabled={!!loading.length}
          onPress={signInWithGoogle}
        />
      </View>
      <View style={styles.verticallySpaced}>
        <Button
          text="Sign up"
          disabled={!!loading.length}
          onPress={() => handleLogin('SIGNUP', email, password)}
        />
      </View>
    </View>
  );
}

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
