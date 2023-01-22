import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Button as RNButton, StyleSheet } from 'react-native';
import Grid from '../components/Grid';
import Qwerty from '../components/Qwerty';
import {
  Container,
  Colors,
  Header,
  Box,
  Text,
  Button,
  Keyboard,
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
import Animated, { Easing, FadeInUp, withTiming, withRepeat, useAnimatedStyle, useSharedValue, withSequence } from 'react-native-reanimated';
import Board from '../components/Board';
import { View } from 'react-native';
const { DateTime } = luxon;
export interface HomeProps extends NativeStackScreenProps<HomeStackParams, 'Home'> { }
const EASING = Easing.elastic(1.5);
const ANGLE = 9;
const TIME = 100;
const NUMBER_OF_TRIES = 6;
export const ENTER = "ENTER";
export const CLEAR = "CLEAR";
const copyArray = (arr: any) => {
  return [...arr.map((rows: any) => [...rows])];
};
const Home: React.FC<HomeProps> = ({ navigation }) => {
  const game = useSelector((state: RootState) => state.game);
  const {
    evaluating,
    totalPoints,
    canNavigate,
    getHelp,
    clearGame,
    wordOfTheDay,
    canPlay,
    rows,
    isCellActive,
    getCellBGColor,
    greenCaps,
    yellowCaps,
    greyCaps,
    gameState,
    updateLetters
  } = useGame();
  // create a date for tomorrow at 3pm local time with luxon 
  const tomorrow = DateTime.local().plus({ days: 1 }).set({ hour: 15, minute: 0, second: 0 });
  // const [days, hours, minutes, seconds] = useCountdown(tomorrow);

  // useEffect(() => {
  //   animated();
  // }, [minutes]);


  useEffect(() => {
    console.log(gameState);
    if (gameState === "won") {
      navigateToResult();
    }
  }, [gameState, canNavigate]);

  const navigateToResult = () => {
    navigation.navigate('Result', {
      points: totalPoints,
      isSolved: true,
    });
    clearGame();
  };

  // const rotation = useSharedValue(1);

  // const style = useAnimatedStyle(() => {
  //   return {
  //     transform: [{ rotateZ: `${rotation.value}deg` }],
  //   };
  // });

  // const animated = () => {
  //   rotation.value = withSequence(
  //     // deviate left to start from -ANGLE
  //     withTiming(-ANGLE, { duration: TIME / 2, easing: EASING }),
  //     // wobble between -ANGLE and ANGLE 7 times
  //     withRepeat(
  //       withTiming(ANGLE, {
  //         duration: TIME,
  //         easing: EASING,
  //       }),
  //       7,
  //       true
  //     ),
  //     // go back to 0 at the end
  //     withTiming(0, { duration: TIME / 2, easing: EASING })
  //   );
  // };


  // if (canPlay) {
  //   return (
  //     <Container>
  //       <Header />
  //       <Box flex={1} justifyContent='center' alignItems='center'>
  //         <Box justifyContent='center' alignItems='center'>
  //           <Text variant='winTextVariant'>
  //             The reaming time to the next game is:
  //           </Text>
  //         </Box>
  //         <Box width="100%" paddingHorizontal="xl" flexDirection="row" justifyContent='space-around'>
  //           <Box justifyContent="center" alignItems="center">
  //             <Text variant="winTextResultVarian">{hours} h:</Text>
  //           </Box>
  //           <Box justifyContent="center" alignItems="center">
  //             <Text variant="winTextResultVarian">{minutes}m:</Text>
  //           </Box>
  //           <Box justifyContent="center" alignItems="center">
  //             <Text variant="winTextResultVarian">{seconds}s</Text>
  //           </Box>
  //         </Box>
  //       </Box>
  //       <Box flex={1} paddingHorizontal="m">
  //         <Animated.View style={[styles.box, style]} />
  //       </Box>
  //       <Box flex={1} paddingHorizontal="m">
  //         {/* <BannerAd size={BannerAdSize.BANNER} unitId={TestIds.BANNER} />`` */}
  //       </Box>
  //     </Container >
  //   );
  // }



  return (
    <Container style={{ backgroundColor: palette.white }}>
      <Header />
      <Box justifyContent="flex-start" alignItems="center" marginTop="m" paddingHorizontal="m">
        <Box alignSelf="stretch" marginBottom="xl">
          {rows.map((row, i) => (
            <Box alignSelf="stretch" flexDirection="row" justifyContent="center" key={`row-${i}`}>
              {row.map((letter: any, j: any) => (
                <Box
                  key={`cell-${i}-${j}`}
                  borderWidth={3}
                  borderColor={"darkgrey"}
                  flex={1}
                  maxWidth={60}
                  aspectRatio={1}
                  margin={"xs"}
                  justifyContent="center"
                  alignItems="center"
                  style={[
                    {
                      borderColor: isCellActive(i, j)
                        ? palette.grey
                        : palette.darkgrey,
                      backgroundColor: getCellBGColor(i, j),
                    },
                  ]}
                >
                  <Text variant="cellText">{letter.toUpperCase()}</Text>
                </Box>
              ))}
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