// custom hook to handle login
import { useDispatch } from 'react-redux';
import { makeRedirectUri, startAsync } from 'expo-auth-session';
import { UserResponse } from '@supabase/supabase-js';
import supabase, { SUPABASE_URL } from '../../utils/initSupBase';
import { loginSuccess } from '../reducers/UserReducer';
import { useState } from 'react';
import { Avatars } from '../../ui-kit/utils/Utils';

const useLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState('');
    const [error, setError] = useState('');
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [avatar, setAvatar] = useState('');
    const [avatars, setAvatars] = useState(Avatars.map((item, index) => {
        return {
            index,
            item: item.item,
            name: item.name,
            isSelected: false,
        };
    }));

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

    const signUp = async (email: string, password: string, avatar: string) => {
        setLoading('SIGNUP');
        const { error, data } = await supabase.auth.signUp({
            email, password, options: {
                data: {
                    full_name: name,
                    username,
                    avatar_url: avatar,
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
            console.log('no session', data);
            setError("1");
            setLoading('');
            return;
        }

        try {
            supabase.auth.setSession({
                access_token: data.session.access_token,
                refresh_token: data.session.refresh_token,
            }).then((res) => {
                console.log("setSession", res);
            }).catch((err) => {
                console.log("setSession", err);
            });

            dispatch(loginSuccess({ ...data }));

        } catch (error) {
            console.log("TCERROR", { error });
        }
    };

    const signInWithPassword = async (email: string, password: string) => {
        setLoading('LOGIN');
        const { error, data } = await supabase.auth.signInWithPassword({ email, password });
        if (!error && !data) setError('Check your email for the login link!');
        if (error) setError(error.message);
        setLoading('');
        dispatch(loginSuccess({ ...data }));
    };

    const handleLogin = async (type: string, email: string, password: string, avatar?: string) => {
        setLoading(type);
        if (type === 'SIGNUP' && avatar) signUp(email, password, avatar);
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

    const handleAvatar = (index: number) => {
        const avatarSelected = avatars[index];
        const newAvatars = avatars.map((item) => {
            return {
                ...item,
                isSelected: item.index === index,
            };
        });
        setAvatars(newAvatars);
        setAvatar(avatarSelected.name);
    };


    return {
        signInWithGoogle,
        handleLogin,
        handlePassword,
        handleName,
        handleUsername,
        handleEmail,
        handleAvatar,
        email,
        password,
        loading,
        error,
        name,
        username,
        avatars,
        avatar,
    };
};

export default useLogin;