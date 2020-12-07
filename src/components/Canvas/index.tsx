import {cpuUsage} from 'process';
import React, {Component} from 'react';
import {View, FlatList} from 'react-native';
import styled from 'styled-components/native';
import {getWidgetByType} from '../../lib/widget-mapper';

import {CanvasData, CanvasBlock} from '../../types/canvas';

interface ICanvasProps {
  canvasData: CanvasData;
}

const CanvasContainer = styled(FlatList)`
  flex-direction: column;
  padding-bottom: ${({theme}) => theme.screenMargin}px;
`;

export function renderBlock({type: blockType, ...blockProps}: CanvasBlock) {
  const BlockWidget:
    | React.FC<any>
    | React.ComponentClass<any> = getWidgetByType(blockType);

  return BlockWidget ? (
    <BlockWidget {...blockProps} renderTemplate={renderBlock} />
  ) : null;
}

const CanvasItem = React.memo(({block}: {block: any}) => (
  <View>{renderBlock(block)}</View>
));

class Canvas extends Component<ICanvasProps, any> {
  render() {
    const {canvasData} = this.props;

    return canvasData ? (
      <CanvasContainer
        data={canvasData.blocks}
        renderItem={({item}) => <CanvasItem block={item} />}
        keyExtractor={(_item, index) => index.toString()}
      />
    ) : null;
  }
}

export default Canvas;
