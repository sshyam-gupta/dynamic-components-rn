import React, {Component} from 'react';
import {View} from 'react-native';
import styled from 'styled-components/native';
import Carousel, {CarouselProps} from '../components/Carousel';
import Header, {IHeaderProps} from '../components/Header';

interface ICarouselWidget extends CarouselProps {
  header?: IHeaderProps;
  blocks: any[];
}

const ListHeader = styled(Header)`
  padding: ${({theme}) => `0 ${theme.screenMargin}px`};
`;

class CarouselWidget extends Component<ICarouselWidget> {
  render() {
    const {blocks, header} = this.props;

    return (
      <View>
        {header ? <ListHeader {...header} /> : null}
        <Carousel {...this.props} data={blocks} />
      </View>
    );
  }
}

export default CarouselWidget;
