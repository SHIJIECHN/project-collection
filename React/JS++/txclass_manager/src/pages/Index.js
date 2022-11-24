import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class IndexPage extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    const { children } = this.props;

    return (
      <div>
        {/* <h1>Index Page</h1> */}
        <ul>
          <li>
            <Link to='/sub/list'>列表页</Link>
          </li>
          <li>
            <Link to='/sub/detail'>详情页</Link>
          </li>
        </ul>
        <div>{children}</div>

      </div>

    )
  }
}