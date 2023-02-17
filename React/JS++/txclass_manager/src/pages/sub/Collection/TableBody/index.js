import React, { Component } from 'react';

import './index.scss'

export default class TableBody extends Component {

  onStatusClick(id, index) {
    this.props.onStatusClick(id, index);
  }

  render() {
    const { collectionData } = this.props;
    return (
      <tbody>
        {
          collectionData.map((item, index) => {
            return (
              <tr key={index}>
                <td>{item.id}</td>
                <td>
                  <a
                    href={item.qqQunLink}
                    target="_blank"
                    rel='noopener noreferrer'
                  >
                    <img
                      className='collection-img'
                      src={item.posterKey}
                      alt={item.posterKey} />
                  </a>
                </td>
                <td className='course-name'>
                  <a
                    href={item.qqQunLink}
                    target="_blank"
                    rel='noopener noreferrer'
                  >{item.title}</a>
                </td>
                <td>{item.info}</td>
                <td>
                  <button
                    className={['btn', item.status ? 'btn-danger' : 'btn-success'].join(' ')}
                    onClick={this.onStatusClick.bind(this, item.id, index)}
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