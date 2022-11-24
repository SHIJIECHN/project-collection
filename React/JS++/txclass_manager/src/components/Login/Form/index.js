import React, { Component } from "react";

import './index.scss'

import Title from "./Title/index.js";
import LoginForm from "./LoginForm/index.js";

export default class Form extends Component {

  render() {

    const { history } = this.props;
    return (
      <div className="form-wrapper">
        <Title />
        <LoginForm history={history} />
      </div>
    )
  }
}