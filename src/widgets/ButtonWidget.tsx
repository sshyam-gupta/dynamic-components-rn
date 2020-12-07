import React from 'react';
import Button, {ButtonProps} from '../components/Button';

interface ButtonWidgetProps extends ButtonProps {
  text: string;
  style?: any;
}

const ButtonWidget = (props: ButtonWidgetProps) => {
  const {text, ...buttonProps} = props;
  return <Button {...buttonProps}>{text}</Button>;
};

export default ButtonWidget;
