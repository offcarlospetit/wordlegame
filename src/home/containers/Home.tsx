import React, { useEffect } from 'react';
import { ActivityIndicator, Button, StyleSheet, View } from 'react-native';
import Grid from '../components/Grid';
import Qwerty from '../components/Qwerty';
import {
  Container,
  Colors,
  Scale,
  Header,
  Box,
  Text,
} from '../../ui-kit';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { HomeStackParams } from '../../navigation/HomeStack';
import { BannerAd, TestIds, BannerAdSize } from '@react-native-admob/admob';
import { palette } from '../../ui-kit/theme';
import useGame from '../hooks/useGame';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

export interface HomeProps extends NativeStackScreenProps<HomeStackParams, 'Home'> { }


const Home: React.FC<HomeProps> = ({ navigation }) => {
  const game = useSelector((state: RootState) => state.game);
  const {
    grid,
    evaluatingRow,
    updateLetter,
    isFinish,
    actualRow,
    actualColumn,
    qwerty,
    isSolved,
    totalPoints,
    canNavigate,
    getHelp,
    clearGame,
  } = useGame();

  useEffect(() => {
    if (canNavigate) {
      navigateToResult();
    }
  }, [isFinish, canNavigate]);

  const navigateToResult = () => {
    navigation.navigate('Result', {
      points: totalPoints,
      isSolved,
    });
    clearGame();
  };

  return (
    <Container style={{ backgroundColor: Colors.white }}>
      <Header />
      <Box style={styles.gridContainer}>
        <Grid
          grid={grid}
          evaluatingRow={evaluatingRow}
          isFinish={isFinish}
          actualRow={actualRow}
          actualColumn={actualColumn}
        />
        <Box position="absolute" top={0} marginTop={"xl"}>
          <ActivityIndicator size="large" animating={evaluatingRow} color={palette.Emmerald} />
        </Box>
      </Box>
      <Box padding="m">
        <Button title="Help ?" onPress={getHelp} />
        {
          __DEV__ && <Text variant="danger">{`Puntos: ${game.totalPoints}`}</Text>
        }
      </Box>
      <Box flex={1} marginTop='xl'>
        <Qwerty
          qwerty={qwerty}
          updateLetter={updateLetter}
          evaluatingRow={evaluatingRow}
        />
      </Box>
      <Box alignContent='center' paddingHorizontal="xl">
        <BannerAd size={BannerAdSize.BANNER} unitId={TestIds.BANNER} />
      </Box>
    </Container>
  );
};

export default Home;

const styles = StyleSheet.create({
  gridContainer: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: Scale(16),
    paddingHorizontal: Scale(16),
  },
  qwertyContainer: {
    flex: 1,
    marginTop: Scale(26),
  },
});
