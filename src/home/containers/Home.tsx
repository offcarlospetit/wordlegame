import React, { useContext, useEffect } from 'react';
import { ActivityIndicator } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Animated, { Easing, withTiming, withRepeat, useAnimatedStyle, useSharedValue, withSequence } from 'react-native-reanimated';
import { BannerAd, TestIds, BannerAdSize } from '@react-native-admob/admob';
import { useSelector } from 'react-redux';
import * as luxon from 'luxon';
import {
  Container,
  Header,
  Box,
  Text,
  Keyboard,
} from '../../ui-kit';
import { HomeStackParams } from '../../navigation/HomeStack';
import { palette } from '../../ui-kit/theme';
import useGame from '../hooks/useGame';
import { RootState } from '../../store';
import useCountdown from '../hooks/useCountdown';


const { DateTime } = luxon;


export interface HomeProps extends NativeStackScreenProps<HomeStackParams, 'Home'> { }


const EASING = Easing.elastic(1.5);
const ANGLE = 9;
const TIME = 100;
import { ContextCore } from '../../core';


const Home: React.FC<HomeProps> = ({ navigation }) => {
  const game = useSelector((state: RootState) => state.game);
  const { canPlay, getWordAsync } = useContext(ContextCore);
  const {
    evaluating,
    totalPoints,
    canNavigate,
    getHelp,
    clearGame,
    wordOfTheDay,
    rows,
    isCellActive,
    getCellBGColor,
    greenCaps,
    yellowCaps,
    greyCaps,
    gameState,
    updateLetters,
    curRow
  } = useGame();
  // create a date for tomorrow at 3pm local time with luxon 
  const tomorrow = DateTime.utc().set({ hour: 20, minute: 0, second: 0 });
  const { values, stopInterval } = useCountdown(tomorrow, true);
  const [days, hours, minutes, seconds] = values;


  useEffect(() => {
    if (gameState === "won") {
      getWordAsync();
      navigateToResult();
    }
  }, [gameState, canNavigate]);

  const navigateToResult = () => {
    navigation.navigate('Result', {
      points: totalPoints,
      isSolved: gameState === "won" ? true : false,
    });
    clearGame();
  };

  const rotation = useSharedValue(1);

  const style = useAnimatedStyle(() => {
    return {
      transform: [{ rotateZ: `${rotation.value}deg` }],
    };
  });

  const animated = () => {
    rotation.value = withSequence(
      // deviate left to start from -ANGLE
      withTiming(-ANGLE, { duration: TIME / 2, easing: EASING }),
      // wobble between -ANGLE and ANGLE 7 times
      withRepeat(
        withTiming(ANGLE, {
          duration: TIME,
          easing: EASING,
        }),
        7,
        true
      ),
      // go back to 0 at the end
      withTiming(0, { duration: TIME / 2, easing: EASING })
    );
  };

  const blockGame = () => {
    if (
      canPlay &&
      DateTime.utc() >= DateTime.utc().set({ hour: 15, minute: 0, second: 0 }) &&
      DateTime.utc() <= DateTime.utc().set({ hour: 23, minute: 59, second: 59 })
    ) {
      return false;
    }
    return true;
  };

  if (blockGame()) {
    return (
      <Container>
        <Header />
        <Box flex={1} justifyContent='center' alignItems='center'>
          <Box justifyContent='center' alignItems='center'>
            <Text variant='winTextVariant'>
              Your next DailyWord will be available at 3pm
            </Text>
          </Box>

        </Box>
        <Box flex={1} justifyContent="flex-end" alignItems="center">
          <BannerAd size={BannerAdSize.BANNER} unitId={TestIds.BANNER} />
        </Box>
      </Container >
    );
  }

  return (
    <Container style={{ backgroundColor: palette.white }}>
      <Header />
      <Box justifyContent="flex-start" alignItems="center" marginTop="m" paddingHorizontal="m">
        <Box alignSelf="stretch" marginBottom="xl">
          {rows.map((row, i) => (
            <Box alignSelf="stretch" flexDirection="row" justifyContent="center" key={`row-${i}`}>
              {row.map((letter: any, j: any) => {
                return (
                  <Animated.View
                    // entering={FadeInUp.delay(100 * j).springify()}
                    // layout={FadeInUp.delay(100 * j).springify()}
                    // entering={evaluating && i === curRow - 1 ? FadeInUp.delay(100 * j).springify() : undefined}
                    // borderWidth={3}
                    // borderColor={"darkgrey"}
                    // flex={1}
                    // maxWidth={60}
                    // aspectRatio={1}
                    // margin={"xs"}
                    // justifyContent="center"
                    // alignItems="center"=
                    key={`cell-${i}-${j}`}
                    style={[
                      {
                        borderWidth: 3,
                        flex: 1,
                        maxWidth: 60,
                        aspectRatio: 1,
                        margin: 4,
                        justifyContent: "center",
                        alignItems: "center",
                        borderColor: isCellActive(i, j)
                          ? palette.grey
                          : palette.darkgrey,
                        backgroundColor: getCellBGColor(i, j),
                      },
                    ]}
                  >
                    <Text variant={i === curRow ? "cellText" : "cellTextBlocked"}>{letter.toUpperCase()}</Text>
                  </Animated.View>
                );
              })}
            </Box>
          ))}
        </Box>
        <Box marginBottom="m">
          <Keyboard greenCaps={greenCaps} greyCaps={greyCaps} yellowCaps={yellowCaps} onKeyPressed={updateLetters} />
          {
            __DEV__ && <Text variant="danger">{`Puntos: ${game.totalPoints}`}</Text>
          }
          {
            __DEV__ && <Text variant="danger">{`Puntos: ${wordOfTheDay?.word}`}</Text>
          }
        </Box>
      </Box>
      <Box width="100%" position="absolute" bottom={0} alignContent='center' paddingHorizontal="xl">
        <BannerAd size={BannerAdSize.BANNER} unitId={TestIds.BANNER} />
      </Box>
      <Box position="absolute" top={0} marginTop={"xl"}>
        <ActivityIndicator size="large" animating={evaluating} color={palette.Emmerald} />
      </Box>
    </Container >
  );
};

export default Home;