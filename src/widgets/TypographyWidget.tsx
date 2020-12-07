import React from 'react';
import styled from 'styled-components/native';
import {Text} from '../components/Text';

interface TypographyWidgetProps {
  text: string;
  fontSize?: number;
  color?: string;
  weight?: string;
  maxLines?: number;
  renderTemplate?: string;
  style?: any;
}

const TypographyWidget = (props: TypographyWidgetProps) => {
  const {text, fontSize, color, weight, maxLines, style} = props;
  return (
    <TextComponent
      text={text}
      fontSize={fontSize}
      color={color}
      weight={weight}
      {...(maxLines ? {numberOfLines: maxLines} : {})}
      style={style}>
      {props.text}
    </TextComponent>
  );
};

const TextComponent = styled(Text)<TypographyWidgetProps>`
  ${({theme, fontSize, color}) => `
    font-size: ${fontSize || theme.fontSizeDefault}px;
    color: ${color || theme.defaultColor};
`}
`;

export default TypographyWidget;
