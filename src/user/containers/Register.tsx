import React from 'react';
import { FlatList } from 'react-native';
import { Avatar, BasicHeader, Box, Button, Container, Text, TextInput } from '../../ui-kit';
import { SocialIcon } from '@rneui/themed';
import useLogin from '../hooks/useLogin';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { UserStackParams } from '../navigation';
import S from '../../i18n';

export interface RegisterProps extends NativeStackScreenProps<UserStackParams, 'Register'> { }

const Register: React.FC<RegisterProps> = ({ navigation }) => {
    const {
        handleEmail,
        handleLogin,
        handlePassword,
        signInWithGoogle,
        handleAvatar,
        handleName,
        handleUsername,
        email,
        password,
        name,
        username,
        error,
        avatars,
        avatar,
    } = useLogin();

    const handleNavigation = () => {
        navigation.navigate('Intro');
    };
    return (
        <Container>
            <BasicHeader handleNavigation={handleNavigation} />
            <Box flex={1} paddingHorizontal="m" justifyContent="center">

                <Box marginTop="l" paddingTop="xs" paddingBottom="xs" alignSelf="stretch" >
                    <Text variant="title">{S.User.userRegister}</Text>
                </Box>
                <Box marginTop="l" paddingTop="xs" paddingBottom="xs" alignSelf="stretch" >
                    <TextInput
                        variant="regular"
                        onChangeText={handleName}
                        value={name}
                        placeholder={S.User.userName}
                        autoCapitalize={'words'}
                    />
                </Box>
                <Box marginTop="l" paddingTop="xs" paddingBottom="xs" alignSelf="stretch" >
                    <TextInput
                        variant="regular"
                        onChangeText={handleUsername}
                        value={username}
                        placeholder={S.User.userFullName}
                        autoCapitalize={'none'}
                    />
                </Box>
                <Box marginTop="l" paddingTop="xs" paddingBottom="xs" alignSelf="stretch" >
                    <TextInput
                        variant="regular"
                        onChangeText={handleEmail}
                        value={email}
                        placeholder={S.User.userEmail}
                        autoCapitalize={'none'}
                    />
                </Box>
                <Box marginTop="l" paddingTop="xs" paddingBottom="xs" alignSelf="stretch" >
                    <TextInput
                        variant="regular"
                        onChangeText={handlePassword}
                        value={password}
                        secureTextEntry={true}
                        placeholder={S.User.userPasswordPlaceholder}
                        autoCapitalize={'none'}
                    />
                </Box>
                <Box marginTop="m" paddingBottom="xs" alignSelf="stretch">
                    <Text variant="detailTitle" textAlign="center" marginVertical="xs">
                        {S.User.userPickAvatar}
                    </Text>
                    <FlatList
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        keyExtractor={(item) => item.index.toString()}
                        extraData={avatars}
                        data={avatars}
                        renderItem={({ item, index }) => {
                            return (
                                <Box marginHorizontal="xs" flex={1} padding="s">
                                    <Avatar source={item.item} isSelected={item.isSelected} onPress={() => {
                                        handleAvatar(index);
                                    }} />
                                </Box>
                            );
                        }} />
                </Box>
                <Box marginTop="l" paddingTop="xs" paddingBottom="xs" alignSelf="stretch" >
                    {error ? <Text variant="danger">{error}</Text> : null}
                </Box>
                <Box marginTop="l" paddingTop="xs" paddingBottom="xs" alignSelf="stretch" >
                    <Button variant="success" label={S.User.userRegister} onPress={() => handleLogin('SIGNUP', email, password, avatar)} />
                </Box>
                {/* 
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
                    }}
                />
            </Box> */}
            </Box>
        </Container>
    );
};


export default Register;