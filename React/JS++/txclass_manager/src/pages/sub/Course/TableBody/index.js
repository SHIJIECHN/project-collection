import React, { Component } from "react";
import TableSelect from "components/common/TableSelect/index.js";

import './index.scss'

export default class TableBody extends Component {
  render() {
    const { courseData, fieldData, onSelectChange } = this.props;

    return (
      <tbody>
        {
          courseData.map((item, index) => {
            return (
              <tr key={index}>
                <td> {item.cid} </td>
                <td>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <img src={item.posterKey} alt={item.courseName} />
                    {/* <img src={`http://tximg.jsplusplus.com/${item.posterKey}`} alt={item.courseName} /> */}
                  </a>
                </td>
                <td className="course-name">
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {item.courseName}
                  </a>
                </td>
                <td>
                  <span className={item.price === '0' ? 'free' : 'price'}>
                    {item.price === '0' ? '免费' : `￥${item.price}`}
                  </span>
                </td>
                <td>{item.studentCount}</td>
                <td>
                  <TableSelect
                    fieldData={fieldData}
                    selectIdx={index}
                    cid={item.cid}
                    defaultValue={item.fieldTitle}
                    onSelectChange={onSelectChange}
                  ></TableSelect>
                </td>
                <td>
                  <button className={['btn', item.status ? 'btn-danger' : 'btn-success'].join(' ')}>
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