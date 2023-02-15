import React, { Component } from 'react';
import ListTitle from 'components/common/ListTitle/index.js';
import TableHead from 'components/common/TableHead/index.js';
import TableBody from './TableBody/index.js';
import CourseService from 'services/Course';
import { getDatas } from 'utils/tools.js'
import { COURSE_TH } from "../../../config/table_config.js";

import './index.scss';

const courseService = new CourseService();

export default class Course extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '课程管理',
      courseData: [],
      fieldData: []
    }
  }

  async getData() {
    const result = await courseService.getCourseData(),
      errorCode = result.error_code,
      data = result.data,
      { history } = this.props;

    getDatas(errorCode, data, history, () => {
      const { courseData, fieldData } = data;

      // 数据格式化
      courseData.forEach((cItem, cIndex) => {
        if (cItem.field === 0) {
          cItem.fieldTitle = '无分类';
        }

        fieldData.forEach((fItem, fIndex) => {
          if (cItem.field === fItem.id) {
            cItem.fieldTitle = fItem.title
          }
        })
      })

      this.setState({
        courseData,
        fieldData
      })
    })
  }

  async onSelectChange(data, cid, index) {
    const { courseData } = this.state;
    courseData[index].field = data.id;
    courseData[index].fieldTitle = data.title;

    this.setState({
      courseData: this.state.courseData
    })

    const result = await courseService.changeCourseField({
      cid,
      field: data.id
    })

    const errorCode = result.error_code;

    if (errorCode !== 0) {
      alert('修改课程分类失败');
      return;
    }
  }

  componentDidMount() {
    this.getData();
  }

  onRefreshData() {
    this.getData();
  }

  render() {
    const { title, courseData, fieldData } = this.state;

    return (
      <div className='list-container'>
        <ListTitle title={title} onRefreshData={this.getData.bind(this)} />

        <table className='list-table'>
          <TableHead thData={COURSE_TH}></TableHead>
          <TableBody
            courseData={courseData}
            fieldData={fieldData}
            onSelectChange={this.onSelectChange.bind(this)}
          ></TableBody>

        </table>
      </div>
    )
  }
}