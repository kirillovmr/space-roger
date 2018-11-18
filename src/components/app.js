import React, { Component } from 'react';

import Background from './background';
import Rockets from './rockets';
import TopUI from './ui-top';
import MiddleUI from './ui-middle';
import BottomUI from './ui-bottom';

require('./test');

export default class App extends Component {
  render() {
    return (
      <div>
        <Background />
        <TopUI />
        <MiddleUI />
        <Rockets />
        <BottomUI />
      </div>
    );
  }
}

