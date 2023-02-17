import React, { Component } from 'react';

import StudentService from 'services/Student.js';
import CommonService from 'services/Common.js';

import { getDatas } from 'utils/tools';
import { STUDENT_TH } from '../../../config/table_config.js';

import ListTitle from 'components/common/ListTitle/index.js';
import TableHead from 'components/common/TableHead'
import TableBody from './TableBody'

import './index.scss';

const studentService = new StudentService(),
  commonService = new CommonService();

export default class Student extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '学生管理',
      studentData: []
    }
  }

  /** 请求推荐课程管理列表 */
  async getStudentData() {
    const result = await studentService.getStudentData(),
      errorCode = result.error_code,
      data = result.data,
      { histoty } = this.props;

    getDatas(errorCode, data, histoty, () => {
      this.setState({
        studentData: data
      })
    })
  }

  // 上下架
  onStatusClick(cid, index) {
    const { studentData } = this.state,
      st = studentData[index].status;

    const cfm = window.confirm(`确定要${st ? '下线' : '上线'}该学生吗？`)

    if (cfm) {
      switch (st) {
        case 1:
          studentData[index].status = 0;
          break;
        case 0:
          studentData[index].status = 1;
          break;
        default:
          break;
      }

      // 需要采用回调函数的形式，因为要用到设置成功后的status，
      this.setState({
        studentData: this.state.studentData
      }, async () => {
        const result = await commonService.changeStatus({
          id: cid,
          status: this.state.studentData[index].status,
          field: 'STUDENT'
        })
        console.log(result)
        const errorCode = result.error_code;

        if (errorCode !== 0) {
          const status = this.state.studentData[index].status
          alert(
            status ? '该学生上线失败' : '该学生下线失败'
          );
          return;
        }
      })
    }
  }


  componentDidMount() {
    this.getStudentData();
  }

  render() {
    const { title, studentData } = this.state;

    return (
      <div className='list-container'>
        <ListTitle
          title={title}
          onRefreshData={this.getStudentData.bind(this)}
        />

        <table className='list-table'>
          <TableHead thData={STUDENT_TH}></TableHead>
          <TableBody
            studentData={studentData}
            onStatusClick={this.onStatusClick.bind(this)}
          ></TableBody>

        </table>
      </div>
    )
  }
}