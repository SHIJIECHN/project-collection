import React, { Component } from 'react'

import Login from '../components/Login';

export default class LoginPage extends Component {
  constructor(props) {
    super(props);

    this.state = {

    }
  }

  render() {
    // 只要在app.js注册过路由的组件，都会有history
    const { history } = this.props;

    return (
      <div className='container'>
        {/* 将history传递给子组件 */}
        <Login history={history} />
      </div>
    )
  }

  l
}