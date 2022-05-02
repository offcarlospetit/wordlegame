import * as React from 'react';
import ReactNativeHapticFeedback, {
  HapticFeedbackTypes,
} from 'react-native-haptic-feedback';

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

  const hapticFeedback = (
    hapticType: HapticFeedbackTypes = 'impactHeavy',
    options: HapticOptions = {
      enableVibrateFallback: true,
      ignoreAndroidSystemSettings: true,
    },
  ) => {
    ReactNativeHapticFeedback.trigger(hapticType, options);
  };

  return (
    <ContextCore.Provider
      value={{
        hapticFeedback,

      }}>
      {children}
    </ContextCore.Provider>
  );
}
