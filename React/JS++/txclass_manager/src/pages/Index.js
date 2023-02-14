import React, { Component } from 'react';
import LoginService from '../services/Login.js';
import Header from '../components/Index/Header/index.js';
import SideBar from '../components/Index/SideBar/index.js';
import Container from '../components/Index/Container/index.js';

import { NAV } from '../config/config.js';

const loginService = new LoginService(); // 实例化

// 创建组件
// 1. constructor
// 2. super(props)
export default class IndexPage extends Component {
  constructor(props) {
    super(props);
    // 数据
    this.state = {
      curIdx: 0,
      field: NAV[0].field,
      title: NAV[0].title
    }
  }

  /** 登录验证 */
  async loginCheck() {
    const result = await loginService.loginCheck(),
      { history } = this.props;

    const errorCode = result.error_code;
    // 没有登录，则跳转到登录页面
    if (errorCode === 10006) {
      // 跳转到login页面
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
    this.loginCheck(); // 登录验证
  }

  // render函数
  render() {
    const { children, history } = this.props, // 解构出history
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