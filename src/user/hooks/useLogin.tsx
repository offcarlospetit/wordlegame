// custom hook to handle login
import { useDispatch } from 'react-redux';
import { makeRedirectUri, startAsync } from 'expo-auth-session';
import { UserResponse } from '@supabase/supabase-js';
import supabase, { SUPABASE_URL } from '../../utils/initSupBase';
import { loginSuccess } from '../reducers/UserReducer';
import { useState } from 'react';

const useLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState('');
    const [error, setError] = useState('');
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const dispatch = useDispatch();

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
            dispatch(loginSuccess({
                user: userInfo.data.user, session: {
                    expires_in: parseInt(authResponse.params.expires_in),
                    access_token: authResponse.params.access_token,
                    refresh_token: authResponse.params.refresh_token,
                    token_type: authResponse.params.token_type,
                    expires_at: parseInt(authResponse.params.expires_at),
                    user: userInfo.data.user,
                    provider_refresh_token: authResponse.params.provider_refresh_token,
                    provider_token: authResponse.params.provider_token,
                }
            }));
        }
    }

    const signUp = async (email: string, password: string) => {
        setLoading('SIGNUP');
        const { error, data } = await supabase.auth.signUp({
            email, password, options: {
                data: {
                    full_name: name,
                    username
                }
            }
        });
        if (!error && !data) {
            setError('Check your email for the login link!');
            setLoading('');
            return;
        }
        if (error) {
            setError("1" + error.message);
            setLoading('');
            return;
        }
        if (!data.session) {
            return;
        }
        await supabase.auth.setSession({
            access_token: data.session.access_token,
            refresh_token: data.session.refresh_token,
        });
        dispatch(loginSuccess({ ...data }));
    };

    const signInWithPassword = async (email: string, password: string) => {
        setLoading('LOGIN');
        const { error, data } = await supabase.auth.signInWithPassword({ email, password });
        if (!error && !data) setError('Check your email for the login link!');
        if (error) setError(error.message);
        setLoading('');
        dispatch(loginSuccess({ ...data }));
    };

    const handleLogin = async (type: string, email: string, password: string) => {
        setLoading(type);
        if (type === 'SIGNUP') signUp(email, password);
        else signInWithPassword(email, password);
    };

    const handleEmail = (text: string) => {
        setEmail(text);
    };

    const handlePassword = (text: string) => {
        setPassword(text);
    };

    const handleName = (text: string) => {
        setName(text);
    };

    const handleUsername = (text: string) => {
        setUsername(text);
    };

    return {
        signInWithGoogle,
        handleLogin,
        handlePassword,
        handleName,
        handleUsername,
        handleEmail,
        email,
        password,
        loading,
        error,
        name,
        username,
    };
};

export default useLogin;