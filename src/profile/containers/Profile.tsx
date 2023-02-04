import { Alert, StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import React, { useEffect } from 'react';
import { Colors, Box, Container, Header, Text } from '../../ui-kit';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { logOut } from '../../user/reducers/UserReducer';
import supabase from '../../utils/initSupBase';
import { useSupaBase } from '../../core/hooks/useSupaBase';
import { parseNumberWithDecimal } from '../../utils/Utils';

type Props = {};

const Profile: React.FC<Props> = ({ }) => {
  const session = useSelector((state: RootState) => state.user.session);
  const { points, rank } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const { getRankByUser } = useSupaBase();

  const logOutAction = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) return;
    dispatch(logOut());
  };

  const [loading, setLoading] = React.useState(false);
  const [username, setUsername] = React.useState('');
  const [avatarUrl, setAvatarUrl] = React.useState('');

  useEffect(() => {
    if (session) getProfile();
  }, [session]);

  async function getProfile() {
    try {
      setLoading(true);
      if (!session?.user) throw new Error('No user on the session!');

      let { data, error, status } = await supabase
        .from('profiles')
        .select(`username, website, avatar_url, full_name`)
        .eq('id', session?.user.id)
        .single();
      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setUsername(data.username ?? data.full_name);
        setAvatarUrl(data.avatar_url);
        getRankByUser(session?.user.id);
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <Container>
      <Header title="Profile" leftButton={false} />
      <Box marginTop="m" paddingHorizontal="m">
        <Box marginTop="m">
          <Text variant="title">{`Hi, ${username}`}</Text>
        </Box>
        <Box marginTop="m">
          <Text variant="profileEmail">
            {session?.user.email}
          </Text>
        </Box>
        <Box marginTop="m">
          <Text variant="profilePoints">
            {`Points: ${parseNumberWithDecimal(points ?? 0)} `}
          </Text>
        </Box>
        <Box marginTop="m">
          <Text variant="alertBody">
            {`Pposition: ${rank}`}
          </Text>
        </Box>
        <Box marginTop="m">
          <TouchableWithoutFeedback onPress={logOutAction}>
            <Text variant="logOutText">
              LogOut
            </Text>
          </TouchableWithoutFeedback>
        </Box>
      </Box>
    </Container>
  );
};

export default Profile;