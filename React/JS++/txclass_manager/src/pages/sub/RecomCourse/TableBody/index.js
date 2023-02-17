import React, { Component } from 'react';

import './index.scss'

export default class TableBody extends Component {

  onStatusClick(cid, index) {
    this.props.onStatusClick(cid, index);
  }

  render() {
    const { recomCourseData } = this.props;
    return (
      <tbody>
        {
          recomCourseData.map((item, index) => {
            return (
              <tr key={index}>
                <td>{item.cid}</td>
                <td>
                  <a
                    href={item.href}
                    target="_blank"
                    rel='noopener noreferrer'
                  >
                    <img
                      className='recom-course-img'
                      src={item.posterKey}
                      alt={item.title} />
                  </a>
                </td>
                <td className='course-name'>
                  <a
                    href={item.href}
                    target="_blank"
                    rel='noopener noreferrer'>{item.title}</a>
                </td>
                <td>{item.teacherName}</td>
                <td>
                  <span className={item.price === '0' ? 'free' : 'price'}>
                    {item.price === '0' ? '免费' : `￥${item.price}`}
                  </span>
                </td>
                <td>{item.studentCount}</td>
                <td>
                  <button
                    className={['btn', item.status ? 'btn-danger' : 'btn-success'].join(' ')}
                    onClick={this.onStatusClick.bind(this, item.cid, index)}
                  >
                    {item.status ? '下架' : '上架'}
                  </button>
                </td>
              </tr>

            )
          })
        }
      </tbody>
    )
  }
}