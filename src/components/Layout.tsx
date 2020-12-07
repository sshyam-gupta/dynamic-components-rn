import {Platform, ScrollView, StatusBar} from 'react-native';
import styled from 'styled-components/native';

const Layout =
  Platform.OS === 'android'
    ? styled.View<{hideStatusBar?: boolean}>`
        padding-top: ${({hideStatusBar}) =>
          hideStatusBar ? 0 : StatusBar.currentHeight};
        flex: 1;
      `
    : styled.View`
        flex: 1;
      `;

const InnerLayout = styled.View`
  flex: 1;
`;

const ScrollLayout = styled(ScrollView)`
  background: ${({theme}) => theme.backgroundColor};
`;

const LayoutTheme = styled.View`
  flex: 1;
`;

export {Layout, LayoutTheme, ScrollLayout, InnerLayout};
