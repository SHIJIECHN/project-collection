import React, { Component } from 'react';

import TeacherService from 'services/Teacher.js';
import CommonService from 'services/Common.js';

import { getDatas } from 'utils/tools';
import { TEACHER_TH } from '../../../config/table_config.js';

import ListTitle from 'components/common/ListTitle/index.js';
import TableHead from 'components/common/TableHead'
import TableBody from './TableBody'

import './index.scss';

const teacherService = new TeacherService(),
  commonService = new CommonService();

export default class Teacher extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '老师管理',
      teacherData: []
    }
  }

  /** 请求推荐课程管理列表 */
  async getTeacherData() {
    const result = await teacherService.getTeacherData(),
      errorCode = result.error_code,
      data = result.data,
      { histoty } = this.props;

    getDatas(errorCode, data, histoty, () => {
      this.setState({
        teacherData: data
      })
    })
  }

  // 上下架
  onStatusClick(cid, index) {
    const { teacherData } = this.state,
      st = teacherData[index].status;

    const cfm = window.confirm(`确定要${st ? '下架' : '上架'}该轮播图吗？`)

    if (cfm) {
      switch (st) {
        case 1:
          teacherData[index].status = 0;
          break;
        case 0:
          teacherData[index].status = 1;
          break;
        default:
          break;
      }

      // 需要采用回调函数的形式，因为要用到设置成功后的status，
      this.setState({
        teacherData: this.state.teacherData
      }, async () => {
        const result = await commonService.changeStatus({
          id: cid,
          status: this.state.teacherData[index].status,
          field: 'TEACHER'
        })
        console.log(result)
        const errorCode = result.error_code;

        if (errorCode !== 0) {
          const status = this.state.teacherData[index].status
          alert(
            status ? '该老师上线失败' : '该老师下线失败'
          );
          return;
        }
      })
    }
  }

  onStarClick(id, index) {
    const { teacherData } = this.state,
      isStar = teacherData[index].isStar;

    const cfm = window.confirm(`确定要设置该老师为${isStar ? '非明星老师吗' : '明星老师吗'}？`)

    if (cfm) {
      switch (isStar) {
        case 1:
          teacherData[index].isStar = 0;
          break;
        case 0:
          teacherData[index].isStar = 1;
          break;
        default:
          break;
      }

      // 需要采用回调函数的形式，因为要用到设置成功后的status，
      this.setState({
        teacherData: this.state.teacherData
      }, async () => {
        const result = await teacherService.selectStarTeacher({
          id: id,
          isStar: this.state.teacherData[index].isStar,
        })
        console.log(result)
        const errorCode = result.error_code;

        if (errorCode !== 0) {
          const isStar = this.state.teacherData[index].isStar
          alert(
            isStar ? '设置该老师为明星老师失败' : '设置该老师为非明星老师失败'
          );
          return;
        }
      })
    }
  }

  componentDidMount() {
    this.getTeacherData();
  }

  render() {
    const { title, teacherData } = this.state;

    return (
      <div className='list-container'>
        <ListTitle
          title={title}
          onRefreshData={this.getTeacherData.bind(this)}
        />

        <table className='list-table'>
          <TableHead thData={TEACHER_TH}></TableHead>
          <TableBody
            teacherData={teacherData}
            onStatusClick={this.onStatusClick.bind(this)}
            onStarClick={this.onStarClick.bind(this)}
          ></TableBody>

        </table>
      </div>
    )
  }
}