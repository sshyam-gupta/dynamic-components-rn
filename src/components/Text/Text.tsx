import styled from 'styled-components/native';

const StyledText = styled.Text`
  color: ${({theme}) => theme.defaultColor};
`;
// font-family: ${({theme}) => theme.tokens.fonts.family.text};

export default StyledText;
