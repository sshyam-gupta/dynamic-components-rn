import styled from 'styled-components/native';

const StyledSubHeaderText = styled.Text`
  color: ${({theme}) => theme.defaultColor};
  font-size: ${({theme}) => theme.fontSizeMedium}px;
`;
// font-family: ${({theme}) => theme.tokens.fonts.family.medium};

export default StyledSubHeaderText;
