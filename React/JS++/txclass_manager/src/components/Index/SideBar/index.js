import React, { Component } from 'react';
import NavItem from './NavItem/index.js'; // 侧边栏每一项组件

import { NAV } from '../../../config/config.js';

import './index.scss'

export default class SideBar extends Component {
  render() {
    const { curIdx, onNavItemClick } = this.props;
    return (
      <aside className='side-bar'>
        {
          // 遍历NAV，将每一项都渲染出来
          NAV.map((item, index) => {
            return (
              <NavItem
                dataItem={item}
                index={index}
                key={index}
                curIdx={curIdx}
                onNavItemClick={onNavItemClick}
              />
            )
          })
        }
      </aside>
    )
  }
}