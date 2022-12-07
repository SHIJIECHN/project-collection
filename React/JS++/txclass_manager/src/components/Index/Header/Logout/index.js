import React, { Component } from 'react';
import LoginService from 'services/Login.js';

import './index.scss';

const loginService = new LoginService();

export default class Logout extends Component {
  async onLogoutClick() {
    const cfm = window.confirm('确认退出登录吗？');
    if (cfm) {
      const result = await loginService.logoutAction();

      const errorCode = result.error_code;
      if (errorCode === 0) {
        const { history } = this.props;
        history.push('/login');
      }
    }
  }

  render() {
    return (
      <span
        className='header-logout'
        onClick={() => this.onLogoutClick()}
      >
        安全退出
      </span>
    )
  }
}