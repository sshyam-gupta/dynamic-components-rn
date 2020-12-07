import React, {Component} from 'react';
import {View, Dimensions} from 'react-native';
import Carousel, {
  Pagination as CarouselPagination,
} from 'react-native-snap-carousel';

import {CarouselProps} from './index';
const {width: viewportWidth} = Dimensions.get('window');

interface CarouselState {
  carouselActiveSlide: number;
}

class SnapCarousel extends Component<CarouselProps, CarouselState> {
  private _slider1Ref: any;

  constructor(props: CarouselProps) {
    super(props);

    this.state = {
      carouselActiveSlide: 0,
    };
  }

  _renderItem = ({item}: {item: any; index: number}) => {
    const {renderTemplate} = this.props;

    return <View>{renderTemplate(item)}</View>;
  };

  snapToPrev() {
    if (this._slider1Ref) {
      this._slider1Ref.snapToPrev();
    }
  }

  snapToNext() {
    if (this._slider1Ref) {
      this._slider1Ref.snapToNext();
    }
  }

  updateSlide() {
    /*
     *  Implement update slide if required
     */
  }

  render() {
    const {
      data,
      showDots = false,
      loop,
      autoplayInterval,
      initialNumToRender,
      windowSize,
      itemWidth,
      itemHeight,
      firstItem,
      slideUpdated,
      dotElement,
      inactiveDotElement,
      dotsContainerStyle,
      autoPlay,
    } = this.props;

    const {carouselActiveSlide} = this.state;

    return (
      <>
        <Carousel
          initialNumToRender={initialNumToRender}
          // @ts-ignore
          windowSize={windowSize}
          data={data}
          renderItem={this._renderItem}
          sliderWidth={viewportWidth}
          ref={(_slider1Ref: any) => (this._slider1Ref = _slider1Ref)}
          itemWidth={itemWidth ? itemWidth : viewportWidth}
          itemHeight={itemHeight ? itemHeight : 0}
          inactiveSlideScale={1}
          inactiveSlideOpacity={1}
          removeClippedSubviews={false}
          loop={loop}
          autoplay={autoPlay}
          autoplayInterval={autoplayInterval}
          firstItem={firstItem}
          onSnapToItem={(index: number) => {
            if (slideUpdated) {
              slideUpdated(index);
            }
            this.setState({carouselActiveSlide: index});
          }}
        />
        {showDots && (
          <CarouselPagination
            dotElement={dotElement}
            inactiveDotElement={inactiveDotElement}
            dotsLength={data.length}
            activeDotIndex={carouselActiveSlide}
            dotColor={'#000'}
            inactiveDotColor={'#000'}
            inactiveDotOpacity={0.3}
            inactiveDotScale={1.0}
            carouselRef={this._slider1Ref}
            tappableDots={!!this._slider1Ref}
            containerStyle={{
              paddingTop: 15,
              paddingBottom: 0,
              ...dotsContainerStyle,
            }}
          />
        )}
      </>
    );
  }
}

export default SnapCarousel;
