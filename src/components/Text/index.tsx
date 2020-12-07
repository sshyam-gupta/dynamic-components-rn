import StyledText from './Text';
import StyledHeaderText from './HeaderText';
import StyledSubHeaderText from './SubHeaderText';
import styled from 'styled-components/native';

const StrikeThroughText = styled(StyledText)`
  font-size: 13px;
  color: ${({theme}) => theme.tokens.colors.base.graySubtlerFour};
  text-decoration: line-through;
  text-decoration-color: ${({theme}) =>
    theme.tokens.colors.base.graySubtlerFour};
`;

export {
  StyledText as Text,
  StyledHeaderText as HeaderText,
  StyledSubHeaderText as SubHeaderText,
  StrikeThroughText,
};
