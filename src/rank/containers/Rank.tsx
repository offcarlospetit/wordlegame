import { StyleSheet, FlatList } from 'react-native';
import React, { useEffect } from 'react';
import { Box, Card, Container, Header, Text } from '../../ui-kit';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { useSupaBase } from '../../core/hooks/useSupaBase';
import { Rank } from '../../core/types/RankTypes';

type Props = {};

const RankScreen: React.FC<Props> = ({ }) => {
  const { getRank, rank } = useSupaBase();

  useEffect(() => {
    if (!rank.length) getRank();
  }, []);

  const renderItem = ({ item, index }: { item: Rank, index: number; }) => {
    return (
      <Box flex={1} alignItems="center" paddingHorizontal="m">
        <Card variant="rankItem" flex={1}>
          <Box flexDirection="row" justifyContent="space-between" alignItems="center">
            <Box>
              <Card variant="roundedAvatar" flex={1}>
                <Text variant="cellText">L</Text>
              </Card>
            </Box>
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
