import _ from 'lodash';
import React from 'react';
import {View} from 'react-native';
import styled from 'styled-components/native';
import Header, {IHeaderProps} from '../components/Header';
import HorizontalList, {IHorizontalList} from '../components/HorizontalList';

const TEXT_HEIGHT = 72;
const ASPECT_RATIO = 3 / 4;

interface IHorizontalListWidget extends IHorizontalList, IHeaderProps {
  blocks: any[];
  padding?: number;
  showDivider?: boolean;
  useRecyclerView?: boolean;
  getRecyclerRowHeight?: (rowWidth: number) => number;
}

const ListHeaderContainer = styled(View)`
  padding: ${({theme}) => `0 ${theme.screenMargin}px`};
`;

const Divider = styled(View)`
  background-color: ${({theme}) => theme.tokens.colors.base.grayLightest};
  height: 8px;
  margin-bottom: ${({theme}) => theme.screenMargin}px;
`;

const HorizontalListWidget: React.FC<IHorizontalListWidget> = (props) => {
  const {
    title,
    blocks,
    header,
    showDivider,
    useRecyclerView = _.some(blocks, (block) => block.type === 'PRODUCT_TILE'),
  } = props;
  const getRecyclerRowHeight = (rowWidth: number) =>
    Math.floor(rowWidth / ASPECT_RATIO) + TEXT_HEIGHT;

  return (
    <View>
      {showDivider && <Divider />}
      <ListHeaderContainer>
        {header ? <Header {...header} /> : title ? <Header {...props} /> : null}
      </ListHeaderContainer>
      <HorizontalList
        {...{useRecyclerView, getRecyclerRowHeight}}
        {...props}
        data={blocks}
      />
    </View>
  );
};

export default HorizontalListWidget;
