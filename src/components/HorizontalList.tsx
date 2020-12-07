import React from 'react';
import {Dimensions, FlatList} from 'react-native';
import styled, {withTheme} from 'styled-components/native';
import {Action} from '../types/action';

import RecyclerView from './RecyclerView';

const {width} = Dimensions.get('window');

const CarouselItem = styled.View<{
  index: number;
  tileSpacing: number;
  elementWidth: number;
  useRecyclerView: boolean;
}>`
  margin-left: ${({index, useRecyclerView, tileSpacing}) =>
    useRecyclerView || index ? tileSpacing : 0}px;
  width: ${({elementWidth}) => elementWidth}px;
`;

const ListContainer: any = styled(FlatList).attrs({
  // @ts-ignore
  contentContainerStyle: ({theme, hasHorizontalPadding}: any): any => ({
    paddingHorizontal: hasHorizontalPadding ? theme.screenMargin : 0,
  }),
})``;

const RecyclerContainer = styled.View<{rowHeight: number}>`
  height: ${({rowHeight}) => rowHeight}px;
`;

export interface IListHeader {
  title: string;
  subtitle: string;
  action: Action;
}

export interface IHorizontalList {
  data: any[];
  tileSpacing?: number;
  tilesPerRow?: number;
  leftPadding?: boolean;
  renderTemplate: (data: any) => React.ReactNode;
  theme: any;
  header?: IListHeader;
  style?: any;
  useRecyclerView?: boolean;
  getRecyclerRowHeight?: (rowWidth: number) => number;
}

const HorizontalList: React.FC<IHorizontalList> = ({
  data,
  tileSpacing = 10,
  tilesPerRow = 2,
  renderTemplate,
  theme,
  style,
  useRecyclerView = false,
  getRecyclerRowHeight = () => 0,
  leftPadding,
}) => {
  if (!Array.isArray(data) || !data.length) {
    return null;
  }

  let elementWidth: number;
  if (tilesPerRow === 1) {
    elementWidth = width;
  } else if (tilesPerRow >= 1 && tilesPerRow <= 2) {
    elementWidth = Math.floor(
      (width - tileSpacing - 2 * theme.screenMargin) / tilesPerRow,
    );
  } else {
    elementWidth = Math.floor(width / tilesPerRow) - tileSpacing;
  }

  const renderItem = ({item, index}: any) => (
    <CarouselItem
      index={index}
      tileSpacing={tileSpacing}
      elementWidth={elementWidth}
      useRecyclerView={useRecyclerView}>
      {renderTemplate({
        ...item,
        elementWidth,
      })}
    </CarouselItem>
  );

  const keyExtractor = (_item: any, index: number) => index.toString();

  if (useRecyclerView) {
    const recyclerRowWidth = Math.floor(width / tilesPerRow);
    const recyclerRowHeight = getRecyclerRowHeight(recyclerRowWidth);
    return (
      <RecyclerContainer rowHeight={recyclerRowHeight}>
        <RecyclerView
          isHorizontal
          useWindowScroll
          scrollViewProps={{showsHorizontalScrollIndicator: false}}
          renderAheadOffset={250}
          data={data}
          rowRenderer={(_type, item, index) => renderItem({item, index})}
          rowWidth={recyclerRowWidth}
          rowHeight={recyclerRowHeight}
        />
      </RecyclerContainer>
    );
  }

  return (
    <ListContainer
      hasHorizontalPadding={leftPadding ?? tilesPerRow > 1}
      data={data}
      horizontal
      showsHorizontalScrollIndicator={false}
      removeClippedSubviews
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      style={style}
    />
  );
};

export default withTheme(HorizontalList);
