import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import LoginService from '../services/Login.js';
import Header from '../components/Index/Header/index.js';
import SideBar from '../components/Index/SideBar/index.js';
import Container from '../components/Index/Container/index.js';

import { NAV } from '../config/config.js';

const loginService = new LoginService();

export default class IndexPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      curIdx: 0,
      field: NAV[0].field,
      title: NAV[0].title
    }
  }

  async loginCheck() {
    const result = await loginService.loginCheck(),
      { history } = this.props;

    const errorCode = result.error_code;
    // 没有登录，则跳转到登录页面
    if (errorCode === 10006) {

      history.push('/login');
      return;
    }

    history.push('./course');
  }

  onNavItemClick(dataItem, index) {
    const { field, title } = dataItem;
    this.setState({
      field: field,
      title: title,
      curIdx: index
    })
  }

  componentDidMount() {
    this.loginCheck();
  }

  render() {
    const { children, history } = this.props,
      { curIdx } = this.state;

    return (
      <div className='container'>
        <Header history={history} />
        <SideBar
          curIdx={curIdx}
          onNavItemClick={this.onNavItemClick.bind(this)}
        />
        <Container
          children={children}
        />
      </div>

    )
  }
}