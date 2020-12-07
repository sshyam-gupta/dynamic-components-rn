import React from 'react';
import styled from 'styled-components/native';
import LinearGradient from 'react-native-linear-gradient';

import _ from 'lodash';
import {ImageBackground} from 'react-native';
import {LayoutProps, DividerProps, GradientProps} from '../../types/canvas';

const Container = styled.View<{layoutProps: LayoutProps}>`
  ${({layoutProps}) => `
    ${
      layoutProps.margin
        ? `
      ${
        _.isNumber(layoutProps.margin.top)
          ? `margin-top: ${layoutProps.margin.top}px;`
          : ''
      }
      ${
        _.isNumber(layoutProps.margin.bottom)
          ? `margin-bottom: ${layoutProps.margin.bottom}px;`
          : ''
      }
      ${
        _.isNumber(layoutProps.margin.left)
          ? `margin-left: ${layoutProps.margin.left}px;`
          : ''
      }
      ${
        _.isNumber(layoutProps.margin.right)
          ? `margin-right: ${layoutProps.margin.right}px;`
          : ''
      }
    `
        : ''
    }
  `}
`;

const InnerContainer = styled.View<{layoutProps: LayoutProps}>`
  ${({layoutProps}) => `
    ${
      layoutProps.background
        ? `
      ${
        layoutProps.background.color && !layoutProps.background.url
          ? `background-color: ${layoutProps.background.color};`
          : ''
      }
    `
        : ''
    }
    ${
      layoutProps.padding
        ? `
      ${
        _.isNumber(layoutProps.padding.top)
          ? `padding-top: ${layoutProps.padding.top}px;`
          : ''
      }
      ${
        _.isNumber(layoutProps.padding.bottom)
          ? `padding-bottom: ${layoutProps.padding.bottom}px;`
          : ''
      }
      ${
        _.isNumber(layoutProps.padding.left)
          ? `padding-left: ${layoutProps.padding.left}px;`
          : ''
      }
      ${
        _.isNumber(layoutProps.padding.right)
          ? `padding-right: ${layoutProps.padding.right}px;`
          : ''
      }
    `
        : ''
    }
  `}
`;

const Divider = styled.View<{dividerProps: DividerProps}>`
  ${({theme, dividerProps: {color, width, height, align, margin}}) => `
    ${_.isNumber(width) ? `width: ${width}px;` : ''}
    background-color: ${color || theme.tokens.colors.base.grayLightest};
    height: ${height || 5}px;
    /* margin-bottom: ${theme.screenMargin}px; */

    ${
      align
        ? `
      align-self: ${
        align === 'right'
          ? 'flex-end'
          : align === 'center'
          ? 'center'
          : 'flex-start'
      };
    `
        : ''
    }
    ${
      margin
        ? `
      ${_.isNumber(margin.left) ? `margin-left: ${margin.left}px;` : ''}
      ${_.isNumber(margin.right) ? `margin-right: ${margin.right}px;` : ''}
    `
        : ''
    }
  `}
`;

const BGImage = styled(ImageBackground)`
  width: 100%;
`;

const Gradient = (props: GradientProps) => {
  if (!_.isEmpty(props)) {
    const {
      height = '100%',
      width = '100%',
      top,
      bottom,
      left,
      right,
      borderRadius,
      ...gradientProps
    } = props;

    return (
      <LinearGradient
        style={{
          position: 'absolute',
          height,
          width,
          top,
          bottom,
          right,
          left,
          borderRadius,
        }}
        {...gradientProps}
      />
    );
  }
  return null;
};

const getURL = ({url}: {url: string}) => {
  return url;
};

const CanvasBlockWrapper = ({
  layoutProps,
  children,
}: {
  layoutProps?: LayoutProps;
  children: React.ReactNode;
}) => {
  const innerContainer = (
    <InnerContainer layoutProps={layoutProps || {}}>
      {children}
      {layoutProps?.gradient && <Gradient {...layoutProps.gradient} />}
    </InnerContainer>
  );

  return (
    <Container layoutProps={layoutProps || {}}>
      {layoutProps?.divider ? (
        <Divider dividerProps={layoutProps.divider || {}} />
      ) : null}
      {layoutProps?.background?.url ? (
        <BGImage source={{uri: getURL({url: layoutProps.background.url})}}>
          {innerContainer}
        </BGImage>
      ) : (
        innerContainer
      )}
    </Container>
  );
};

const withCanvasLayout = (
  CanvasWidgetComponent: React.ComponentClass<any> | React.FC<any>,
) => {
  return ({layoutProps, ...props}: {layoutProps?: LayoutProps}) => (
    <CanvasBlockWrapper layoutProps={layoutProps}>
      <CanvasWidgetComponent {...props} />
    </CanvasBlockWrapper>
  );
};

export default withCanvasLayout;
