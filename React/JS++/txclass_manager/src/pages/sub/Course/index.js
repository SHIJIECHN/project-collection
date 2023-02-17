import React, { Component } from 'react';
import ListTitle from 'components/common/ListTitle/index.js';
import TableHead from 'components/common/TableHead/index.js';
import TableBody from './TableBody/index.js';
import CourseService from 'services/Course';
import CommonService from 'services/Common.js';
import { getDatas } from 'utils/tools.js'
import { COURSE_TH } from "../../../config/table_config.js";

import './index.scss';

const courseService = new CourseService(),
  commonService = new CommonService();

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

  // 课程分类
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

  // 课程上下架
  async onStatusClick(cid, index) {
    const { courseData } = this.state,
      st = courseData[index].status;

    const cfm = window.confirm(`确定要${st ? '下架' : '上架'}该课程吗？`)

    if (cfm) {
      switch (st) {
        case 1:
          courseData[index].status = 0;
          break;
        case 0:
          courseData[index].status = 1;
          break;
        default:
          break;
      }

      // 需要采用回调函数的形式，因为要用到设置成功后的status，
      this.setState({
        courseData: this.state.courseData
      }, async () => {
        const result = await commonService.changeStatus({
          id: cid,
          status: this.state.courseData[index].status,
          field: 'COURSE'
        })
        console.log(result)
        const errorCode = result.error_code;

        if (errorCode !== 0) {
          const status = this.state.courseData[index].status
          alert(
            status ? '该课程上架失败' : '该课程下架失败'
          );
          return;
        }
      })
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
            onStatusClick={this.onStatusClick.bind(this)}
          ></TableBody>

        </table>
      </div>
    )
  }
}