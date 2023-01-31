import { StyleSheet, FlatList } from 'react-native';
import React, { useEffect } from 'react';
import { Avatar, Box, Card, Container, Header, Text } from '../../ui-kit';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { useSupaBase } from '../../core/hooks/useSupaBase';
import { Rank } from '../../core/types/RankTypes';
import { Avatars } from '../../ui-kit/utils/Utils';

type Props = {};

const RankScreen: React.FC<Props> = ({ }) => {
  const { getRank, rank } = useSupaBase();

  useEffect(() => {
    if (!rank.length) getRank();
  }, []);

  const getAvatar = (item: Rank) => {
    if (item.profiles.avatar_url) {
      const requireAvatar = Avatars.find((avatar) => {
        if (avatar.name === item.profiles.avatar_url) return avatar;
      }
      );
      return requireAvatar;
    }
    return null;
  };

  const renderItem = ({ item, index }: { item: Rank, index: number; }) => {
    const avatar = getAvatar(item);
    return (
      <Box flex={1} alignItems="center" paddingHorizontal="m">
        <Card variant="rankItem" flex={1}>
          <Box flexDirection="row" justifyContent="space-between" alignItems="center">
            <Avatar source={avatar?.item} />
            <Box flex={1} paddingLeft="s" justifyContent="center">
              <Text variant="cellText">{item.points}</Text>
            </Box>
          </Box>
        </Card>
      </Box>
    );

  };

  return (
    <Container>
      <Header title="Ranking" leftButton={false} />
      <Box flex={1} marginTop="m"  >
        <FlatList
          data={rank}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
        />
      </Box>
    </Container>
  );
};

export default RankScreen;

const styles = StyleSheet.create({});
