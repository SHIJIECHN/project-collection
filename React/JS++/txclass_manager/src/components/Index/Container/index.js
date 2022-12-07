import React, { Component } from 'react';
import Board from './Board/index.js';

import './index.scss';

export default class Container extends Component {
  render() {
    const { children } = this.props;

    return (
      <div className='board-container'>
        <Board children={children} />

      </div>
    )
  }
}