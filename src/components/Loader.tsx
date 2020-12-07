import React from 'react';
import {ActivityIndicator} from 'react-native';
import styled, {withTheme} from 'styled-components/native';

const LoadingContainer = styled.View`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  justify-content: center;
  align-items: center;
  z-index: 100;
  background: transparent;
  overflow: hidden;
  flex: 1;
`;

const Wrapper = styled.View`
  height: 105px;
  width: 105px;
  border-radius: 10px;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  background-color: 'transparent';
`;

const Loader = ({theme}: {theme: any}) => {
  return (
    <LoadingContainer>
      <Wrapper>
        <ActivityIndicator
          {...(theme.loaderSize ? {size: theme.loaderSize} : {})}
          color={theme.loaderForegroundColor}
        />
      </Wrapper>
    </LoadingContainer>
  );
};

export default withTheme(Loader);
