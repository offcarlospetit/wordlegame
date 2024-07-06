import React from 'react';
import { Provider } from 'react-redux';
import { store, persistor } from './store';
import NavigationApp from './App';
import { PersistGate } from 'redux-persist/integration/react';
import { ContextCoreWrapper } from './core';
import { ThemeProviderApp } from './ui-kit';

type Props = {};

const RootApp: React.FC<Props> = ({ }) => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProviderApp>
          <ContextCoreWrapper>
            <NavigationApp />
          </ContextCoreWrapper>
        </ThemeProviderApp>
      </PersistGate>
    </Provider>
  );
};

export default RootApp;
