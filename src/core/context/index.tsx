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
import { Alert } from '../../ui-kit';

export interface HapticOptions {
  enableVibrateFallback: boolean;
  ignoreAndroidSystemSettings: boolean;
}

export interface ProviderProps {
  children: React.ReactNode;
}

export interface ShowAlert {
  title: string,
  body: string,
  primaryButtonLabel: string,
  secondaryButtonLabel?: string,
  primaryButtonOnPress: () => void,
  secondaryButtonOnPress?: () => void,
}

export interface ContextCoreProps {
  hapticFeedback: (
    hapticType?: HapticFeedbackTypes,
    options?: HapticOptions,
  ) => void;
  word: DailyWord | undefined;
  canPlay: boolean;
  getWordAsync: () => void;
  showAlert: (params: ShowAlert) => void;
}

export type SecondaryButton = null | (() => void);

export const ContextCore = React.createContext({} as ContextCoreProps);

export function ContextCoreWrapper(props: ProviderProps) {
  const [word, setWord] = React.useState<DailyWord>();
  const state = useSelector((state: RootState) => state);
  const { children } = props;
  const { getRank } = useSupaBase();
  const { getWord, canPlayToday } = useWord();
  const [canPlay, setCanPlay] = React.useState<boolean>(false);
  const [showAlertModal, setShowAlertModal] = React.useState<boolean>(false);
  const [title, setTitle] = React.useState<string>('');
  const [body, setBody] = React.useState<string>('');
  const [primaryButtonLabel, setPrimaryButtonLabel] = React.useState<string>('');
  const [secondaryButtonLabel, setSecondaryButtonLabel] = React.useState<string>('');
  const [primaryButtonOnPress, setPrimaryButtonOnPress] = React.useState<() => void>(() => () => { });
  const [secondaryButtonOnPress, setSecondaryButtonOnPress] = React.useState<SecondaryButton>(() => () => { });



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
    }).catch((err) => {
      console.log("getWordAsync Error", { err });
    }
    );
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

  const hideAlert = () => {
    setShowAlertModal(false);
  };

  const showAlert = (params: ShowAlert) => {
    const { title, body, primaryButtonLabel, secondaryButtonLabel, primaryButtonOnPress, secondaryButtonOnPress } = params;
    setTitle(title);
    setBody(body);
    setPrimaryButtonLabel(primaryButtonLabel);
    setSecondaryButtonLabel(secondaryButtonLabel ?? '');
    setPrimaryButtonOnPress(primaryButtonOnPress);
    setSecondaryButtonOnPress(secondaryButtonOnPress ?? null);
    setShowAlertModal(true);
  };

  return (
    <ContextCore.Provider
      value={{
        hapticFeedback,
        word,
        canPlay,
        getWordAsync,
        showAlert
      }}>
      {children}
      {
        showAlertModal &&
        <Alert
          title={title}
          body={body}
          primaryButtonLabel={primaryButtonLabel}
          primaryButtonOnPress={hideAlert}
          secondaryButtonLabel={secondaryButtonLabel}
          secondaryButtonOnPress={secondaryButtonOnPress}
        />}
    </ContextCore.Provider>
  );
}
