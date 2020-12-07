import _ from 'lodash';
import React from 'react';
import {Dimensions} from 'react-native';
import styled, {withTheme} from 'styled-components/native';
import Header from './Header';
import RecyclerView from './RecyclerView';

const VERTICAL_SPACING_SCALE_FACTOR = 1.2;
const {width, height: windowHeight} = Dimensions.get('window');

const getContainerHorizontalPadding = ({
  theme,
  tileSpacing,
}: {
  theme: any;
  tileSpacing: number;
}) => theme.screenMargin - tileSpacing / 2;

const Container = styled.View<{tileSpacing: number}>`
  flex-direction: row;
  flex-wrap: wrap;
  padding-right: ${getContainerHorizontalPadding}px;
`;

const Item = styled.View<{
  index: number;
  tilesPerRow: number;
  tileSpacing: number;
  width: number;
}>`
  ${({index, tilesPerRow, tileSpacing, width: itemWidth}) => `
    padding-top: ${
      index < tilesPerRow ? 0 : tileSpacing * VERTICAL_SPACING_SCALE_FACTOR
    }px;
    width: ${itemWidth}px;
  `};
`;

const RecyclerContainer = styled.View<{
  tileSpacing: number;
  paddingTop?: number;
}>`
  flex: 1;
  padding-left: ${getContainerHorizontalPadding}px;
  padding-right: ${getContainerHorizontalPadding}px;
`;

const RecyclerItem = styled.View<{
  index: number;
  tilesPerRow: number;
  tileSpacing: number;
}>`
  padding: ${({tileSpacing}) => `0 ${tileSpacing / 2}px`};
`;

const ScrollContainer = styled.ScrollView<{paddingTop?: number}>`
  ${({paddingTop}) => `
    ${paddingTop ? `padding-top: ${paddingTop}px;` : ''}
  `}
`;

const GridHeader = styled(Header)`
  padding: ${({theme}) => `0 ${theme.screenMargin}px`};
`;

export interface IGrid {
  title?: string;
  data: any[];
  tilesPerRow?: number;
  tileSpacing?: number;
  renderTemplate: (data: any) => React.ReactNode;
  itemContainerProps?: (item: any, index: number) => Object;
  useRecyclerView?: boolean;
  theme: any;
  padding?: number;
  getRecyclerRowHeight?(rowWidth: number): number;
  onEndReached?: () => void;
  onScroll?: () => void;
  getItemDimensions?: (
    index: number,
  ) => {width: number; height: number} | undefined;
}

const Grid: React.FC<IGrid> = ({
  title,
  data,
  renderTemplate,
  useRecyclerView = true,
  getRecyclerRowHeight = () => 0,
  tilesPerRow = 2,
  tileSpacing = 10,
  theme,
  itemContainerProps,
  padding = theme.screenMargin,
  onScroll,
  onEndReached,
  getItemDimensions = () => {},
}) => {
  if (!Array.isArray(data) || data.length === 0) {
    return null;
  }

  const elementBoxWidth = Math.floor(
    (width - 2 * getContainerHorizontalPadding({theme, tileSpacing})) /
      tilesPerRow,
  );
  const elementWidth =
    elementBoxWidth - tileSpacing; /* padding excluded width */

  if (useRecyclerView) {
    return (
      <RecyclerContainer tileSpacing={tileSpacing}>
        <RecyclerView
          style={{paddingTop: padding}}
          data={data}
          rowHasChanged={(row1, row2) => {
            if (row1.id && row2.id) {
              return row1.id !== row2.id;
            }
            return row1 !== row2;
          }}
          rowRenderer={(_type, item, index) => (
            <RecyclerItem
              index={index}
              tileSpacing={tileSpacing}
              tilesPerRow={tilesPerRow}>
              {renderTemplate({
                ...item,
                elementWidth,
              })}
            </RecyclerItem>
          )}
          rowWidth={elementBoxWidth}
          rowHeight={getRecyclerRowHeight(elementBoxWidth)}
          setLayoutForType={(_type, dimension, index) => {
            const dim = getItemDimensions(index);
            dimension.width = dim ? dim.width : elementBoxWidth;
            dimension.height = dim
              ? dim.height
              : getRecyclerRowHeight(elementBoxWidth);
          }}
          onScroll={onScroll}
          onEndReached={onEndReached}
          onEndReachedThreshold={windowHeight}
          scrollViewProps={{showsVerticalScrollIndicator: false}}
        />
      </RecyclerContainer>
    );
  }

  const getProps = _.isFunction(itemContainerProps)
    ? itemContainerProps
    : _.noop;

  const onEndReachedHandler = () => {
    !_.isNil(onEndReached) && onEndReached();
  };

  const onScrollHandler = (nativeEvent: any) => {
    !_.isNil(onScroll) && onScroll();

    const {
      contentOffset: {y: offset},
      contentSize: {height},
    } = nativeEvent;

    if (windowHeight + offset >= height) {
      onEndReachedHandler();
    }
  };

  return (
    <ScrollContainer
      scrollEventThrottle={0.1}
      paddingTop={padding}
      {...((onScroll || onEndReached) && {
        onScroll: ({nativeEvent}: any) => onScrollHandler(nativeEvent),
      })}>
      {!!title && <GridHeader title={title} />}
      <Container tileSpacing={tileSpacing}>
        {data.map((result: any, index: number) => (
          <Item
            key={index}
            index={index}
            tileSpacing={tileSpacing}
            tilesPerRow={tilesPerRow}
            width={elementBoxWidth}
            {...getProps(result, index)}>
            {renderTemplate({
              ...result,
              elementWidth,
            })}
          </Item>
        ))}
      </Container>
    </ScrollContainer>
  );
};

export default withTheme(Grid);
