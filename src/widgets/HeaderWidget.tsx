import React, {Component} from 'react';
import Header, {IHeaderProps} from '../components/Header';

class HeaderWidget extends Component<IHeaderProps> {
  render() {
    return <Header {...this.props} />;
  }
}

export default HeaderWidget;
