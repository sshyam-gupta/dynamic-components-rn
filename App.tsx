/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import {SafeAreaView, StatusBar} from 'react-native';

import {ThemeProvider} from 'styled-components';
import {Layout} from './src/components/Layout';
import theme from './src/constants/theme';
import Home from './src/screens/home';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={{flex: 1}}>
        <Layout>
          <Home />
        </Layout>
      </SafeAreaView>
    </ThemeProvider>
  );
};

export default App;
