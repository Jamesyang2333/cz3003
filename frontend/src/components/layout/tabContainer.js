import React, { Component } from 'react';

class TabContainer extends Component {
  render() {
    return <React.Fragment>{this.props.children}</React.Fragment>;
  }
}

export default TabContainer;
