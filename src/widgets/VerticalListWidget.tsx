import React from 'react';
import {FlatList} from 'react-native';
import styled from 'styled-components/native';

interface IVerticalListWidget {
  blocks: any[];
  elementWidth: number;
  maxWidth?: string;
  tileSpacing: number;
  renderTemplate: (data: any) => React.ComponentClass | React.FunctionComponent;
}

class VerticalListWidget extends React.Component<IVerticalListWidget> {
  constructor(props: IVerticalListWidget) {
    super(props);
  }

  renderItem = ({item, index}: any) => {
    const {renderTemplate, elementWidth, tileSpacing} = this.props;

    return (
      <Tile tileSpacing={tileSpacing} index={index}>
        {renderTemplate({
          ...item,
          elementWidth,
        })}
      </Tile>
    );
  };

  render() {
    return (
      <VerticalList
        alwaysBounceVertical={false}
        data={this.props.blocks}
        renderItem={this.renderItem}
        maxWidth={this.props.maxWidth}
        keyExtractor={(_item: any, index: number) => index.toString()}
      />
    );
  }
}

const VerticalList = styled(FlatList)<{maxWidth?: string}>`
  ${({maxWidth}) => `
    ${maxWidth ? `max-width: ${maxWidth};` : ''}
  `}
`;

const Tile = styled.View<{tileSpacing: number; index: number}>`
  margin-top: ${({tileSpacing, index}) => (index ? tileSpacing || 0 : 0)}px;
`;

export default VerticalListWidget;
