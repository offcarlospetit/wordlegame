import { StyleSheet, FlatList } from 'react-native';
import React, { useEffect } from 'react';
import { Box, Card, Container, Header, Text } from '../../ui-kit';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { useSupaBase } from '../../core/hooks/useSupaBase';
import { Rank } from '../../core/types/RankTypes';

type Props = {};

const Profile: React.FC<Props> = ({ }) => {
  const { getRank, rank } = useSupaBase();


  useEffect(() => {
    if (!rank.length) getRank();
  }, []);

  const renderItem = ({ item, index }: { item: Rank, index: number; }) => {
    // card rank item
    return (
      <Card variant="rankItem" flex={1}>
        <Text>{item.points}</Text>
      </Card>
    );

  };

  return (
    <Container>
      <Header title="Profile" leftButton={false} />
      <Box flex={1} marginTop="m" paddingHorizontal="m">
        <FlatList
          data={rank}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
        />
      </Box>
    </Container>
  );
};

export default Profile;

const styles = StyleSheet.create({});
