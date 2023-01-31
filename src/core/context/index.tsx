import * as React from 'react';
import ReactNativeHapticFeedback, {
  HapticFeedbackTypes,
} from 'react-native-haptic-feedback';
import { useSelector } from 'react-redux';
import supabase from '../../utils/initSupBase';
import { useSupaBase } from '../hooks/useSupaBase';
import { useWord } from '../../home/hooks/useWord';
import { DailyWord } from '../../home/types';
import { RootState } from '../../store';

export interface HapticOptions {
  enableVibrateFallback: boolean;
  ignoreAndroidSystemSettings: boolean;
}

export interface ProviderProps {
  children: React.ReactNode;
}

export interface ContextCoreProps {
  hapticFeedback: (
    hapticType?: HapticFeedbackTypes,
    options?: HapticOptions,
  ) => void;
  word: DailyWord | undefined;
  canPlay: boolean;
  getWordAsync: () => void;
}

export const ContextCore = React.createContext({} as ContextCoreProps);

export function ContextCoreWrapper(props: ProviderProps) {
  const [word, setWord] = React.useState<DailyWord>();
  const state = useSelector((state: RootState) => state);
  const { children } = props;
  const { getRank } = useSupaBase();
  const { getWord, canPlayToday } = useWord();
  const [canPlay, setCanPlay] = React.useState<boolean>(false);

  const hapticFeedback = (
    hapticType: HapticFeedbackTypes = 'impactHeavy',
    options: HapticOptions = {
      enableVibrateFallback: true,
      ignoreAndroidSystemSettings: true,
    },
  ) => {
    ReactNativeHapticFeedback.trigger(hapticType, options);
  };

  const getWordAsync = async () => {
    let word: DailyWord | undefined;
    getWord().then((res) => {
      if (res) {
        setWord({
          word: res.word.toUpperCase(),
          id: res.id,
        });
        word = res;
      }
    }).finally(() => {
      if (!word) return;
      canPlayToday(word.id, state.user.user?.id).then((resCanPlay) => {
        setCanPlay(resCanPlay);
      });
    });
  };

  React.useEffect(() => {
    getWordAsync();
    return () => {
    };
  }, []);

  supabase
    .channel('*')
    .on('postgres_changes', { event: '*', schema: 'public', table: 'rank' }, payload => {
      getRank();
    }).subscribe();

  return (
    <ContextCore.Provider
      value={{
        hapticFeedback,
        word,
        canPlay,
        getWordAsync,
      }}>
      {children}
    </ContextCore.Provider>
  );
}
