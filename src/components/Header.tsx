import React, {Component} from 'react';
import {View, Pressable} from 'react-native';
import styled from 'styled-components/native';
import {Text, HeaderText} from './Text';

import {Action} from '../types/action';
import {triggerWidgetAction} from '../lib/action-handler';

export interface StyledComponentProps {
  style?: any;
}

export interface IHeaderProps extends StyledComponentProps {
  title: string;
  subtitle?: string;
  action?: Action;
  horizontalMargin?: number;
  triggerWidgetAction?: (action: Action, params?: any) => void;
}

const HeaderContainer = styled(Pressable)<{horizontalMargin?: number}>`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 16px;
`;

const ActionContainer = styled.View`
  display: flex;
  justify-content: center;
`;

const SubText = styled(Text)`
  color: ${({theme}) => theme.tokens.colors.base.warmGray};
`;

const ActionText = styled(Text)`
  color: ${({theme}) => theme.defaultColor};
`;
// font-family: ${({theme}) => theme.tokens.fonts.family.medium};

class Header extends Component<IHeaderProps> {
  handleAction = () => {
    const {action} = this.props;

    if (action) {
      triggerWidgetAction(action);
    }
  };

  render() {
    const {title, subtitle, action, style} = this.props;

    return (
      <HeaderContainer {...{style}} onPress={this.handleAction}>
        <>
          <View>
            <HeaderText>{title}</HeaderText>
            {subtitle && <SubText>{subtitle}</SubText>}
          </View>
          {!!action && (
            <ActionContainer>
              {action.title ? (
                <ActionText>{action.title}</ActionText>
              ) : (
                <ActionText>👉🏽</ActionText>
              )}
            </ActionContainer>
          )}
        </>
      </HeaderContainer>
    );
  }
}

export default Header;
