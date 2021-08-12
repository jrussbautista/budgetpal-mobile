import React from 'react';
import { Provider } from 'react-redux';
import { store } from './src/app/store';
import AppNavigation from './src/navigations/AppNavigation';
import { Provider as PaperProvider } from 'react-native-paper';
import { theme } from './src/theme';

export default function App() {
  return (
    <Provider store={store}>
      <PaperProvider theme={theme}>
        <AppNavigation />
      </PaperProvider>
    </Provider>
  );
}
