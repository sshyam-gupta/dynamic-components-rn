import React from 'react';

import _ from 'lodash';
import styled from 'styled-components/native';
import {View, Dimensions, Pressable} from 'react-native';
import {triggerWidgetAction} from '../lib/action-handler';
import {Action} from '../types/action';

interface CellWidgetProps {
  padding?: number;
  backgroundColor?: string;
  borderRadius?: number;
  withSpacing?: boolean;
  vertical?: boolean;
  justifyContent?: string;
  ar?: string;
  elementWidth?: number;
  blocks: any;
  renderTemplate: (data: any) => React.ReactNode;
  action?: Action;
}

const {width: viewportWidth} = Dimensions.get('window');

class CellWidget extends React.Component<CellWidgetProps> {
  triggerAction = () => {
    const {action} = this.props;

    if (action) {
      triggerWidgetAction(action);
    }
  };

  renderCore() {
    const {blocks, renderTemplate, vertical, ar} = this.props;
    const paddingProperty = vertical ? 'paddingTop' : 'paddingLeft';
    const cellProps: CellContainerProps = {...this.props};
    if (ar) {
      [cellProps.arWidth, cellProps.arHeight] = _.split(ar, ':').map(Number);
    }

    return (
      <CellContainer {...cellProps}>
        {_.map(blocks, (block: any, index: number) => (
          <View style={{[paddingProperty]: index ? 15 : 0}} key={index}>
            {renderTemplate(block)}
          </View>
        ))}
      </CellContainer>
    );
  }

  render() {
    const {action, withSpacing} = this.props;

    return (
      <Wrapper withSpacing={withSpacing}>
        {action ? (
          <Pressable onPress={this.triggerAction}>
            {this.renderCore()}
          </Pressable>
        ) : (
          this.renderCore()
        )}
      </Wrapper>
    );
  }
}

const Wrapper = styled.View<{withSpacing?: boolean}>`
  padding: ${(props: any) =>
      props.withSpacing ? props.theme.screenMargin : 0}px
    ${(props: any) => (props.withSpacing ? props.theme.screenMargin : 0)}px 0;
`;

interface CellContainerProps extends CellWidgetProps {
  arWidth?: number;
  arHeight?: number;
}
const CellContainer = styled.View<CellContainerProps>`
  ${({
    padding,
    backgroundColor,
    borderRadius,
    vertical,
    elementWidth,
    arWidth,
    arHeight,
    justifyContent,
  }) => `
    flex-direction: ${vertical ? 'column' : 'row'};
    align-items: ${vertical ? 'flex-start' : 'center'};
    justify-content: ${justifyContent || (vertical ? 'center' : 'flex-start')};
    padding: ${padding || 0}px;
    background: ${backgroundColor || 'transparent'};
    border-radius: ${borderRadius || 0}px;
    overflow: hidden;

    ${elementWidth ? `max-width: ${elementWidth}px;` : ''}
    ${
      arWidth && arHeight
        ? `height: ${(elementWidth || viewportWidth) / (arWidth / arHeight)}px;`
        : ''
    }
  `}
`;

export default CellWidget;
