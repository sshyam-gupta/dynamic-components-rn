import React, {Component} from 'react';
import {ActivityIndicator} from 'react-native';
import {appTheme as theme} from '../../constants/config';

interface LoadingIndicatorProps {
  size?: number | 'small' | 'large';
  color?: string | 'primary' | 'secondary';
}

class LoadingIndicator extends Component<LoadingIndicatorProps> {
  render() {
    const {
      size = 48,
      color = theme.primaryColor,
    }: LoadingIndicatorProps = this.props;

    return <ActivityIndicator size={size} color={color} />;
  }
}

export default LoadingIndicator;
