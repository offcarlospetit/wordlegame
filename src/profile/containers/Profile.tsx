import { StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import React from 'react';
import { Colors, Container, Header, TextUI } from '../../ui-kit';
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
      <View style={{ marginTop: 16, paddingHorizontal: 16 }}>
        <View style={{ marginTop: 16 }}>
          <TextUI
            style={{
              fontSize: 16,
              lineHeight: 24,
            }}>{`Hi, ${an?.full_name}`}</TextUI>
        </View>
        <View style={{ marginTop: 16 }}>
          <TouchableWithoutFeedback onPress={logOutAction}>
            <TextUI style={{ fontSize: 24, color: Colors.warning }}>
              LogOut
            </TextUI>
          </TouchableWithoutFeedback>
        </View>
      </View>
    </Container>
  );
};

export default Profile;

const styles = StyleSheet.create({});
