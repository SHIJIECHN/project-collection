import React, { Component } from 'react';
import HeaderLogo from '../Logo/index.js';
import HeaderTitle from '../Title/index.js';
import Logout from '../Logout/index.js';

import './index.scss';

export default class Header extends Component {
  render() {
    const { history } = this.props;

    return (
      <header className='header'>
        <HeaderLogo />
        <HeaderTitle />
        <Logout history={history} />
      </header>
    )
  }
}