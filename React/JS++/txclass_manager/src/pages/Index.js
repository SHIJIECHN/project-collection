import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import LoginService from '../services/Login.js';
import Header from '../components/Index/Header/index.js';

const loginService = new LoginService();

export default class IndexPage extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  async loginCheck() {
    const result = await loginService.loginCheck();

    const errorCode = result.error_code;
    // 没有登录，则跳转到登录页面
    if (errorCode === 10006) {
      const { history } = this.props;
      history.push('/login')
    }
  }

  componentDidMount() {
    this.loginCheck();
  }

  render() {
    const { children, history } = this.props;

    return (
      <div className='container'>
        <Header history={history} />
      </div>

    )
  }
}