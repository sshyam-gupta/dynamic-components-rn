import styled from 'styled-components/native';

const StyledHeaderText = styled.Text`
  color: ${({theme}) => theme.defaultColor};
  font-size: ${({theme}) => theme.fontSizeLarge}px;
`;
// font-family: ${({theme}) => theme.tokens.fonts.family.bold};

export default StyledHeaderText;
