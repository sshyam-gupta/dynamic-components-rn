import React, {Component} from 'react';
import styled from 'styled-components/native';
import {ImageURISource, ImageBackground, Image as RNImage} from 'react-native';

export interface ImageProps {
  url: string;
  width?: number;
  ar?: string | number;
  grayscale?: boolean;
  gAuto?: boolean;
  style?: object;
  resizeMode?: 'cover' | 'contain' | 'stretch' | 'repeat' | 'center';
  imageStyle?: object;
  children?: React.ReactNode;
  showPlaceHolder?: boolean;
  memoizeImage?: boolean;
  loadWithCachedImage?: boolean;
}

interface State {
  imageLoaded: boolean;
  imageUrl: string;
  currentUrl: string | null;
}

interface IMemoizedImage {
  width?: number;
  url: string;
}
interface IMemoizedImages {
  [identifier: string]: IMemoizedImage;
}

class Image extends Component<ImageProps, State> {
  static memoizedImageURLs: IMemoizedImages = {};

  static defaultProps = {
    ar: '1:1',
    showPlaceHolder: true,
    memoizeImage: false,
    loadWithCachedImage: false,
  };

  constructor(props: ImageProps) {
    super(props);
    const imageUrl: string = this.getImageUrl(props);

    this.state = {
      imageLoaded: false,
      imageUrl,
      currentUrl: props.url,
    };
  }

  // https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html#fetching-external-data-when-props-change
  static getDerivedStateFromProps(nextProps: ImageProps, prevState: State) {
    if (nextProps.url !== prevState.currentUrl) {
      return {
        currentUrl: null,
      };
    }

    return null;
  }

  componentDidUpdate() {
    if (this.state.currentUrl === null) {
      const imageUrl = this.getImageUrl(this.props);
      this.setState({
        imageUrl,
        currentUrl: this.props.url,
      });
    }
  }

  getImageUrl = (props: ImageProps) => {
    let imageUrl: string = '';
    const memoizedVersion = this.getMemoizedImageVersion();
    if (props.loadWithCachedImage && memoizedVersion) {
      // display memoized version, while loading actual version in the background
      imageUrl = memoizedVersion.url;
      this.loadImageAsync(); // TODO: Load current version only if memoized version is lower res?
    } else {
      imageUrl = this._getUrl();
      this.memoizeImageVersion({width: props.width, url: imageUrl});
    }

    return imageUrl;
  };

  private loadImageAsync() {
    const {width} = this.props;

    // Load required version of image
    const imageUrl = this._getUrl();
    const imageInfo = {width, url: imageUrl};

    RNImage.prefetch(imageUrl).then(() => {
      this.setState({imageUrl});
      this.memoizeImageVersion(imageInfo);
    });
  }

  memoizeImageVersion = (imageInfo: IMemoizedImage) => {
    const {memoizeImage, url: identifier, width} = this.props;
    if (!memoizeImage) {
      return;
    }

    // compare versions and memoize only the higher res version
    const memoizedVersion = this.getMemoizedImageVersion();

    // @ts-ignore
    if (!memoizedVersion || memoizedVersion.width < width) {
      Image.memoizedImageURLs[identifier] = imageInfo;
    }
  };

  getMemoizedImageVersion = (): IMemoizedImage | undefined => {
    const {url: identifier} = this.props;
    if (identifier in Image.memoizedImageURLs) {
      const cachedImage = Image.memoizedImageURLs[identifier];
      return cachedImage;
    }
  };

  private _getUrl() {
    const props = this.props;
    if (/^https/.test(props.url)) {
      return props.url;
    }

    const url = props.url;

    return url;
  }

  onLoadEnd = () => this.setState({imageLoaded: true});

  renderDefaultImageView() {
    const {showPlaceHolder} = this.props;
    const {imageUrl} = this.state;

    const source: ImageURISource = {uri: imageUrl, cache: 'force-cache'};

    return (
      <StyledImage
        showPlaceHolder={showPlaceHolder && !this.state.imageLoaded}
        style={this.props.style}
        resizeMode={this.props.resizeMode || 'cover'}
        imageStyle={this.props.imageStyle}
        source={source}
        onLoad={this.onLoadEnd}>
        {this.props.children}
      </StyledImage>
    );
  }

  render() {
    return this.renderDefaultImageView();
  }
}

const StyledImage = styled(ImageBackground)<{
  showPlaceHolder: boolean | undefined;
}>`
  overflow: hidden;
  background-color: ${({theme, showPlaceHolder}) =>
    showPlaceHolder ? theme.tokens.colors.base.grayLightest : 'transparent'};
`;

export default Image;
