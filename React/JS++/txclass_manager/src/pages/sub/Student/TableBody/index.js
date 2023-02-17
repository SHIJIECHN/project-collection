import React, { Component } from 'react';
import './index.scss'

export default class TableBody extends Component {

  onStatusClick(id, index) {
    this.props.onStatusClick(id, index);
  }

  render() {
    const { studentData } = this.props;
    return (
      <tbody>
        {
          studentData.map((item, index) => {
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
                      className='student-img'
                      src={item.studentImgKey}
                      alt={item.studentName} />
                  </a>
                </td>
                <td>{item.studentName}</td>
                <td className='intro-td'>{item.intro}</td>
                <td>
                  <a
                    href={item.courseLink}
                    target="_blank"
                    rel='noopener noreferrer'
                  >{item.courseName}</a>
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