import React, { useEffect } from 'react';
import { ActivityIndicator, Button as RNButton } from 'react-native';
import Grid from '../components/Grid';
import Qwerty from '../components/Qwerty';
import {
  Container,
  Colors,
  Header,
  Box,
  Text,
  Button,
} from '../../ui-kit';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { HomeStackParams } from '../../navigation/HomeStack';
import { BannerAd, TestIds, BannerAdSize } from '@react-native-admob/admob';
import { palette } from '../../ui-kit/theme';
import useGame from '../hooks/useGame';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { useWord } from '../hooks/useWord';
import * as luxon from 'luxon';
import useCountdown from '../hooks/useCountdown';
const { DateTime } = luxon;
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
    wordOfTheDay,
    canPlay
  } = useGame();
  // create a date for tomorrow at 3pm local time with luxon 
  const tomorrow = DateTime.local().plus({ days: 1 }).set({ hour: 15, minute: 0, second: 0 });
  const [days, hours, minutes, seconds] = useCountdown(tomorrow);

  const [dateState, setDateState] = React.useState(new Date());
  useEffect(() => {
    setInterval(() => setDateState(new Date()), 30000);
  }, []);
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

  if (!canPlay) {
    return (
      <Container>
        <Box flex={1} justifyContent='center' alignItems='center'>
          <Box justifyContent='center' alignItems='center'>
            <Text variant='winTextVariant'>
              The reaming time to the next game is:
            </Text>
          </Box>
          <Box width="100%" paddingHorizontal="xl" flexDirection="row" justifyContent='space-around'>
            <Box justifyContent="center" alignItems="center">
              <Text variant="winTextResultVarian">{hours} h:</Text>
            </Box>
            <Box justifyContent="center" alignItems="center">
              <Text variant="winTextResultVarian">{minutes}m:</Text>
            </Box>
            <Box justifyContent="center" alignItems="center">
              <Text variant="winTextResultVarian">{seconds}s</Text>
            </Box>
          </Box>
        </Box>
        <Box flex={1} paddingHorizontal="m">

        </Box>
      </Container >
    );
  }

  return (
    <Container style={{ backgroundColor: Colors.white }}>
      <Header />
      <Box justifyContent="flex-start" alignItems="center" marginTop="m" paddingHorizontal="m">
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
        <RNButton title="Help ?" onPress={getHelp} />
        {
          __DEV__ && <Text variant="danger">{`Puntos: ${game.totalPoints}`}</Text>
        }
        {
          __DEV__ && <Text variant="danger">{`Puntos: ${wordOfTheDay?.word}`}</Text>
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
