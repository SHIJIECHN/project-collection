import React, { Component } from 'react';

export default class TableBody extends Component {

  onStatusClick(id, index) {
    this.props.onStatusClick(id, index);
  }

  render() {
    const { sliderData } = this.props;
    return (
      <tbody>
        {
          sliderData.map((item, index) => {
            return (
              <tr key={index}>
                <td>{item.id}</td>
                <td>{item.cid}</td>
                <td>
                  <a
                    href={item.imgUrl}
                    target="_blank"
                    rel='noopener noreferrer'
                  >
                    <img
                      src={item.imgKey}
                      alt={item.title} />
                  </a>
                </td>
                <td className='course-name'>
                  <a
                    href="/aa"
                    target="_blank"
                    rel='noopener noreferrer'>{item.title}</a>
                </td>

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