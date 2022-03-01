import React from 'react';
import {ContextCoreWrapper} from './src/core';
import BottomTabs from './src/navigation';

const App = () => (
  <ContextCoreWrapper>
    <BottomTabs />
  </ContextCoreWrapper>
);

export default App;
