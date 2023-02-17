import React, { Component } from 'react';
import './index.scss'

export default class TableBody extends Component {

  onStatusClick(id, index) {
    this.props.onStatusClick(id, index);
  }

  onStarClick(id, index) {
    this.props.onStarClick(id, index);
  }

  render() {
    const { teacherData } = this.props;
    return (
      <tbody>
        {
          teacherData.map((item, index) => {
            return (
              <tr key={index}>
                <td>{item.id}</td>
                <td className='img-td'>
                  <a
                    href={item.href}
                    target="_blank"
                    rel='noopener noreferrer'
                  >
                    <img
                      className='teacher-img'
                      src={item.teacherImgKey}
                      alt={item.teacherName} />
                  </a>
                </td>
                <td>
                  <a
                    href={item.href}
                    target="_blank"
                    rel='noopener noreferrer'
                  >{item.teacherName}</a>
                </td>
                <td>{item.courseCount}</td>
                <td>{item.studentCount}</td>
                <td className='intro-td'>{item.intro}</td>
                <td>
                  <button
                    className={['btn', item.isStar ? 'btn-danger' : 'btn-success'].join(' ')}
                    onClick={this.onStarClick.bind(this, item.id, index)}
                  >
                    {item.isStar ? '下线明星' : '上线明星'}
                  </button>
                </td>
                <td>
                  <button
                    className={['btn', item.status ? 'btn-danger' : 'btn-success'].join(' ')}
                    onClick={this.onStatusClick.bind(this, item.id, index)}
                  >
                    {item.status ? '下线' : '上线'}
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