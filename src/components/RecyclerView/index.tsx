import React from 'react';
import {RecyclerListView, DataProvider, LayoutProvider} from 'recyclerlistview';

interface RecyclerViewProps<T> {
  data: T[];
  rowRenderer(
    type: string | number,
    data: any,
    index: number,
  ): JSX.Element | JSX.Element[] | null;
  rowWidth: number;
  rowHeight: number;
  rowHasChanged?(r1: T, r2: T): boolean;
  getLayoutTypeForIndex?(index: number): string | number;
  setLayoutForType?(
    type: string | number,
    dimension: Dimension,
    index: number,
  ): void;
  // rest of the props are passed along to the underlying RecyclerListView
  [key: string]: any;
}

interface Dimension {
  height: number;
  width: number;
}

function defaultRowHasChanged(row1: any, row2: any): boolean {
  return row1 !== row2;
}

function defaultGetLayoutTypeForIndex(_index: number) {
  return 0;
}

function RecyclerView<T>({
  data,
  rowRenderer,
  rowWidth,
  rowHeight,
  rowHasChanged = defaultRowHasChanged,
  getLayoutTypeForIndex = defaultGetLayoutTypeForIndex,
  setLayoutForType = (_type, dimension) => {
    dimension.width = rowWidth;
    dimension.height = rowHeight;
  },
  ...restProps
}: RecyclerViewProps<T>) {
  const layoutProvider = React.useRef(
    new LayoutProvider(getLayoutTypeForIndex, setLayoutForType),
  ).current;
  const dataProviderFactory = React.useRef(new DataProvider(rowHasChanged))
    .current;
  const [dataProvider, setDataProvider] = React.useState<DataProvider>();

  React.useEffect(() => {
    setDataProvider(dataProviderFactory.cloneWithRows(data));
  }, [data, dataProviderFactory]);

  return dataProvider ? (
    <RecyclerListView
      useWindowScroll
      {...{layoutProvider, dataProvider, rowRenderer}}
      {...restProps}
    />
  ) : null;
}

export default RecyclerView;
