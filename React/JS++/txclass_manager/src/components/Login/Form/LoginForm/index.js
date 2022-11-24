import React, { Component } from "react";
import { loginAction } from 'services/Login'
import { trimSpace } from 'utils/tools'
import LoginService from "services/Login.js";

import './index.scss'

const loginService = new LoginService();

export default class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    }
  }

  onInputTyping(e) {
    const id = e.target.id,
      val = e.target.value;

    this.setState({
      [id]: val
    });
  }

  async onLoginSubmit(e) {
    const { username, password } = this.state;
    if (trimSpace(username).length <= 0) {
      console.error('用户名长度不正确');
      return;
    }

    if (trimSpace(password).length <= 0) {
      console.error('密码长度不正确');
      return;
    }

    // 提交数据, 返回result
    const result = await loginService.loginAction({
      username: trimSpace(username),
      password: trimSpace(password),
    })

    const errorCode = result.error_code,
      errorMsg = result.error_msg;
    // 登录失败
    if (errorCode !== 0) {
      console.error(errorMsg + '(errorCode: ' + errorCode + ')');
      return;
    }

    const { history } = this.props;
    // 登录成功。跳转页面
    console.log('登录成功');
    history.push('/');
  }

  render() {
    return (
      <div className="login-form-wrapper">
        <div className="input-box">
          {/* htmlFor 与 id相等，则点击label input聚焦 */}
          <label htmlFor="username" className="iconfont icon-user"></label>
          <input
            className="login-input"
            id="username"
            type="text"
            placeholder="管理员用户名"
            onChange={(e) => this.onInputTyping(e)}
          />
        </div>
        <div className="input-box">
          <label htmlFor="password" className="iconfont icon-lock"></label>
          <input
            className="login-input"
            id="password"
            type="password"
            placeholder="管理员密码"
            onChange={(e) => this.onInputTyping(e)}
          />
        </div>
        <div className="input-box">
          <button
            className="btn btn-primary"
            onClick={(e) => this.onLoginSubmit(e)}
          >登录后台</button>
        </div>
      </div>
    )
  }
}