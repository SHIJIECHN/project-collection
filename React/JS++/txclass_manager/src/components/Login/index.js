import React, { Component } from 'react';

import './index.scss'
import Logo from './Logo/index.js';
import Form from './Form/index.js';

export default class Login extends Component {

  render() {
    const { history } = this.props;

    return (
      <div className='login-container'>
        <Logo />
        <Form history={history} />
      </div>
    )
  }
}