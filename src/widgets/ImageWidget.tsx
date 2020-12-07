import React from 'react';

import {Action} from '../types/action';

import {Dimensions, Pressable} from 'react-native';
import styled, {withTheme} from 'styled-components/native';
import Image from '../components/Image';
import {triggerWidgetAction} from '../lib/action-handler';
import Header, {IHeaderProps} from '../components/Header';

interface ImageWidgetProps {
  imageURL: string;
  elementWidth?: number;
  borderRadius?: number;
  ar?: string;
  action?: Action;
  fullScreen?: boolean;
  theme: any;
  header?: IHeaderProps;
}

const ImageHeader = styled(Header)`
  padding: ${({theme}) => `0 ${theme.screenMargin}px`};
`;

const {width} = Dimensions.get('window');

class ImageWidget extends React.Component<ImageWidgetProps> {
  triggerAction = () => {
    const {action} = this.props;

    if (action) {
      triggerWidgetAction(action);
    }
  };

  renderCore() {
    const {
      imageURL,
      elementWidth,
      ar = '3:2',
      fullScreen,
      theme,
      borderRadius = 0,
    } = this.props;
    const [arW, arH] = ar.split(':').map(Number);
    const appliedPadding = fullScreen ? 0 : 2 * theme.screenMargin;
    const imageWidth = elementWidth || width - appliedPadding;

    return (
      <Image
        url={imageURL}
        ar={ar}
        width={imageWidth}
        style={{
          width: imageWidth,
          height: Math.floor((imageWidth * arH) / arW),
          borderRadius,
        }}
      />
    );
  }

  render() {
    const {header, action, fullScreen} = this.props;

    // use Image component here with prop injection
    return (
      <>
        {header ? <ImageHeader {...header} /> : null}
        <Container fullScreen={fullScreen}>
          {action ? (
            <Pressable onPress={this.triggerAction}>
              {this.renderCore()}
            </Pressable>
          ) : (
            this.renderCore()
          )}
        </Container>
      </>
    );
  }
}

const Container = styled.View<{fullScreen?: boolean}>`
  padding: 0
    ${(props: any) => (props.fullScreen ? 0 : props.theme.screenMargin)}px;
`;

export default withTheme(ImageWidget);
