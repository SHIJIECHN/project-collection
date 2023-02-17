import React, { Component } from 'react';

import RecomCourseService from 'services/RecomCourse.js';
import CommonService from 'services/Common.js';

import { getDatas } from 'utils/tools';
import { RECOM_COURSE_TH } from '../../../config/table_config.js';

import ListTitle from 'components/common/ListTitle/index.js';
import TableHead from 'components/common/TableHead'
import TableBody from './TableBody'

import './index.scss';

const recomCourseService = new RecomCourseService(),
  commonService = new CommonService();

export default class RecomCourse extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '推荐课程管理',
      recomCourseData: []
    }
  }

  /** 请求推荐课程管理列表 */
  async getRecomCourseData() {
    const result = await recomCourseService.getRecomCourseData(),
      errorCode = result.error_code,
      data = result.data,
      { histoty } = this.props;

    getDatas(errorCode, data, histoty, () => {
      this.setState({
        recomCourseData: data
      })
    })
  }

  // 上下架
  onStatusClick(cid, index) {
    const { recomCourseData } = this.state,
      st = recomCourseData[index].status;

    const cfm = window.confirm(`确定要${st ? '下架' : '上架'}该课程吗？`)

    if (cfm) {
      switch (st) {
        case 1:
          recomCourseData[index].status = 0;
          break;
        case 0:
          recomCourseData[index].status = 1;
          break;
        default:
          break;
      }

      // 需要采用回调函数的形式，因为要用到设置成功后的status，
      this.setState({
        recomCourseData: this.state.recomCourseData
      }, async () => {
        const result = await commonService.changeStatus({
          id: cid,
          status: this.state.recomCourseData[index].status,
          field: 'RECOM_COURSE'
        })
        console.log(result)
        const errorCode = result.error_code;

        if (errorCode !== 0) {
          const status = this.state.recomCourseData[index].status
          alert(
            status ? '该课程上架失败' : '该课程下架失败'
          );
          return;
        }
      })
    }
  }

  componentDidMount() {
    this.getRecomCourseData();
  }

  render() {
    const { title, recomCourseData } = this.state;

    return (
      <div className='list-container'>
        <ListTitle
          title={title}
          onRefreshData={this.getRecomCourseData.bind(this)}
        />

        <table className='list-table'>
          <TableHead thData={RECOM_COURSE_TH}></TableHead>
          <TableBody
            recomCourseData={recomCourseData}
            onStatusClick={this.onStatusClick.bind(this)}
          ></TableBody>

        </table>
      </div>
    )
  }
}