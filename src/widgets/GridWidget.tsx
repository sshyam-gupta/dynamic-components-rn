import React, {Component} from 'react';
import Grid, {IGrid} from '../components/Grid';

interface IGridWidget extends IGrid {
  title?: string;
  theme: any;
  padding?: number;
}

class GridWidget extends Component<IGridWidget> {
  render() {
    return <Grid {...this.props} />;
  }
}

export default GridWidget;
