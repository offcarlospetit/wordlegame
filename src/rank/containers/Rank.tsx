import { StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import React from 'react';
import { Colors, Box, Container, Header, Text } from '../../ui-kit';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { logOut } from '../../user/reducers/UserReducer';
import { supabase } from '../../utils/initSupBase';

type Props = {};

const Profile: React.FC<Props> = ({ }) => {
  const an = useSelector((state: RootState) => state.user.user?.user_metadata);
  const dispatch = useDispatch();

  const logOutAction = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) return;
    dispatch(logOut());
  };

  return (
    <Container>
      <Header title="Profile" leftButton={false} />
      <Box marginTop="m" paddingHorizontal="m">
        <Box marginTop="m">
          <Text variant="profileName">{`Hi, ${an?.full_name}`}</Text>
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

const styles = StyleSheet.create({});