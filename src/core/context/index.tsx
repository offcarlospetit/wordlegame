import * as React from 'react';
import ReactNativeHapticFeedback, {
  HapticFeedbackTypes,
} from 'react-native-haptic-feedback';
import { useDispatch, useSelector } from 'react-redux';
import supabase from '../../utils/initSupBase';
import { setRank } from '../../rank/reducer/RankReducer';
import { Rank } from '../types/RankTypes';
import { useSupaBase } from '../hooks/useSupaBase';

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
}

export const ContextCore = React.createContext({} as ContextCoreProps);

export function ContextCoreWrapper(props: ProviderProps) {
  const { children } = props;
  const { getRank } = useSupaBase();

  const hapticFeedback = (
    hapticType: HapticFeedbackTypes = 'impactHeavy',
    options: HapticOptions = {
      enableVibrateFallback: true,
      ignoreAndroidSystemSettings: true,
    },
  ) => {
    ReactNativeHapticFeedback.trigger(hapticType, options);
  };

  React.useEffect(() => {

    return () => {
    };
  }, []);
  supabase
    .channel('*')
    .on('postgres_changes', { event: '*', schema: 'public', table: 'rank' }, payload => {
      getRank();
    })
    .subscribe();

  return (
    <ContextCore.Provider
      value={{
        hapticFeedback,
      }}>
      {children}
    </ContextCore.Provider>
  );
}
