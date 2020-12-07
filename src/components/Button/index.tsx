import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/native';
import {Text} from '../Text';
import {Pressable} from 'react-native';

function btnShadow(theme: any, appearance: string): string {
  const themeTokens = theme.tokens;
  const shadowMappings: {[key: string]: string} = {
    default: themeTokens.colors.button.default.shadow,
    primary: themeTokens.colors.button.primary.shadow,
    secondary: themeTokens.colors.button.secondary.shadow,
    link: 'none',
    destructive: themeTokens.colors.button.destructive.shadow,
  };
  return shadowMappings[appearance] || shadowMappings.default;
}

function btnBorder(theme: any, appearance: string): string {
  const themeTokens = theme.tokens;
  const borderColorMappings: {[key: string]: string} = {
    default: `1px solid ${themeTokens.colors.button.default.border}`,
    primary: `1px solid ${themeTokens.colors.button.primary.border}`,
    secondary: `1px solid ${themeTokens.colors.button.secondary.border}`,
    link: '0',
    destructive: `1px solid ${themeTokens.colors.button.destructive.border}`,
  };
  return borderColorMappings[appearance] || borderColorMappings.default;
}

function btnBgColor(theme: any, appearance: string): string {
  const themeTokens = theme.tokens;
  const bgColorMappings: {[key: string]: string} = {
    default: themeTokens.colors.button.default.background,
    primary: themeTokens.colors.button.primary.background,
    secondary: themeTokens.colors.button.secondary.background,
    link: 'transparent',
    destructive: themeTokens.colors.button.destructive.background,
  };
  return bgColorMappings[appearance] || bgColorMappings.default;
}

function btnTextColor(theme: any, appearance: string): string {
  const themeTokens = theme.tokens;
  const textColorMappings: {[key: string]: string} = {
    default: themeTokens.colors.button.default.text,
    primary: themeTokens.colors.button.primary.text,
    secondary: themeTokens.colors.button.secondary.text,
    link: themeTokens.colors.button.link.text,
    destructive: themeTokens.colors.button.destructive.text,
  };
  return textColorMappings[appearance] || textColorMappings.default;
}

interface ButtonWrapperProps extends ButtonProps {
  radius?: number | string;
}

const ButtonWrapper = styled.View<ButtonWrapperProps>`
  padding: ${({appearance, containerpadding}) =>
    appearance !== 'link' ? containerpadding : 0};
  border: ${({theme, appearance, disabled}) =>
    disabled
      ? theme.tokens.colors.base.disabled
      : btnBorder(theme, appearance!)};
  border-radius: ${(props) => props.radius}px;
  background-color: ${({theme, appearance, disabled}) =>
    disabled
      ? theme.tokens.colors.base.disabled
      : btnBgColor(theme, appearance!)};
  box-shadow: ${({theme, appearance, showShadow, disabled}) =>
    showShadow && !disabled ? btnShadow(theme, appearance!) : 'none'};
  ${({maxWidth}) => (maxWidth ? `max-width: ${maxWidth}px;` : '')}
`;

interface ButtonContentProps extends ButtonProps {
  align: string;
}

const ButtonContent = styled(Text)<ButtonContentProps>`
  color: ${({theme, appearance, disabled}) =>
    disabled
      ? theme.tokens.colors.text.disabled
      : btnTextColor(theme, appearance!)};
  font-size: ${({theme, size}) =>
    size === 'small'
      ? theme.tokens.fonts.size.xsmall
      : theme.tokens.fonts.size.small}px;
  text-align: ${(props) => props.align};
`;
// font-family: ${({theme}) => theme.tokens.fonts.family.bold};

export interface ButtonProps {
  appearance?:
    | 'default'
    | 'primary'
    | 'secondary'
    | 'link'
    | 'destructive'
    | string;
  size?: string;
  textAlign?: string;
  borderRadius?: number | string;
  onPress?: () => any;
  showShadow?: boolean;
  style?: any;
  disabled?: boolean;
  containerpadding?: string;
  maxWidth?: number;
}

class Button extends React.Component<ButtonProps> {
  static propTypes = {
    appearance: PropTypes.oneOf([
      'default',
      'primary',
      'secondary',
      'link',
      'destructive',
    ]),
    size: PropTypes.oneOf(['default', 'small', 'large']),
    icon: PropTypes.node,
    iconAlign: PropTypes.oneOf(['left', 'right']),
    textAlign: PropTypes.oneOf(['left', 'center', 'right']),
    borderRadius: PropTypes.number,
    disabled: PropTypes.bool,
  };

  static defaultProps = {
    appearance: 'default',
    size: 'default',
    textAlign: 'center',
    borderRadius: 23,
    disabled: false,
    containerpadding: '12px',
  };

  onPress = () => {
    const {onPress, disabled} = this.props;

    if (typeof onPress === 'function' && !disabled) {
      return onPress();
    }
  };

  renderButton = () => {
    const {
      textAlign,
      borderRadius,
      showShadow = true,
      disabled,
      ...props
    } = this.props;

    return (
      <ButtonWrapper
        radius={borderRadius!}
        {...props}
        showShadow={showShadow}
        disabled={disabled}>
        <ButtonContent align={textAlign!} {...props} disabled={disabled}>
          {this.props.children}
        </ButtonContent>
      </ButtonWrapper>
    );
  };

  render() {
    const {style, disabled} = this.props;
    return (
      <>
        {disabled ? (
          this.renderButton()
        ) : (
          <Pressable onPress={this.onPress} style={style}>
            {this.renderButton()}
          </Pressable>
        )}
      </>
    );
  }
}

export default Button;
