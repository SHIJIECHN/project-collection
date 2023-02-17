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
      curIdx: 0, // 侧边栏默认显示弟0项
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

    // 如果登录，直接跳转到course页面
    history.push('/crawler');
  }

  onNavItemClick(dataItem, index) {
    const { field, title } = dataItem;
    // 点击侧边栏修改
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
    // children获取子页面的内容
    const { children, history } = this.props, // 解构出history
      { curIdx } = this.state;

    return (
      <div className='container'>
        <Header history={history} />
        {/* 侧边栏 */}
        <SideBar
          curIdx={curIdx}
          onNavItemClick={this.onNavItemClick.bind(this)}
        />
        {/* 右侧内容 */}
        <Container
          children={children}
        />
      </div>

    )
  }
}