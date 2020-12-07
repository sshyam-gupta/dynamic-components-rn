import React, {Component} from 'react';
import {ScrollViewProps} from 'react-native';
import PlatformCarousel from './Carousel';

type LazyLoadTypes = 'ondemand' | 'progressive';

export interface CarouselProps extends ScrollViewProps {
  /**
   * Flat List Data
   */
  data: any;
  /**
   * Auto Play Carousel
   */
  autoPlay?: boolean;
  /**
   * Show pagination dots
   */
  showDots?: boolean;
  /**
   * layout props
   * @default { autoplayInterval: 3000, firstItem: 0, loop: true, dotsInCarousel: false }
   */

  dotsContainerStyle?: any;
  autoplayInterval?: number;
  loop?: boolean;
  dotsInCarousel?: boolean;
  slidesToShow?: number;
  /*
   *  Carousel dimensions
   */
  itemWidth?: number;
  itemHeight?: number;
  /*
   *  First carousel item to display
   */
  firstItem?: number;
  /*
   *  Carousel slide updated callback
   */
  slideUpdated?(index: number): void;

  /*
   *  Update carousel to slide index
   */
  updateSlide?(index: number): void;

  dotElement?: React.ReactNode;
  inactiveDotElement?: React.ReactNode;
  dotsClass?: string;
  initialNumToRender?: number;
  windowSize?: number;
  lazyLoad?: LazyLoadTypes;
  renderTemplate: (data: any) => React.ReactNode;
}

class Carousel extends Component<CarouselProps> {
  slider: any;

  static defaultProps = {
    autoPlay: false,
    showDots: true,
    autoplayInterval: 3000,
    firstItem: 0,
    loop: true,
    dotsInCarousel: false,
    slidesToShow: 1,
  };

  /*
   * Update the slide using index
   */
  updateSlide(index: number) {
    this.slider?.updateSlide?.(index);
  }

  snapToPrev() {
    this.slider?.snapToPrev?.();
  }

  snapToNext() {
    this.slider?.snapToNext?.();
  }

  render() {
    return (
      <PlatformCarousel
        ref={(slider) => (this.slider = slider)}
        {...this.props}
      />
    );
  }
}

export default Carousel;
