import React, { Component } from 'react';

import SliderService from 'services/Slider.js';
import CommonService from 'services/Common.js';

import { getDatas } from 'utils/tools';
import { SLIDER_TH } from '../../../config/table_config.js';

import ListTitle from 'components/common/ListTitle/index.js';
import TableHead from 'components/common/TableHead'
import TableBody from './TableBody'

import './index.scss';

const sliderService = new SliderService(),
  commonService = new CommonService();

export default class Slider extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '轮播图管理',
      sliderData: []
    }
  }

  /** 请求推荐课程管理列表 */
  async getSliderData() {
    const result = await sliderService.getSliderData(),
      errorCode = result.error_code,
      data = result.data,
      { histoty } = this.props;

    getDatas(errorCode, data, histoty, () => {
      this.setState({
        sliderData: data
      })
    })
  }

  // 上下架
  onStatusClick(cid, index) {
    const { sliderData } = this.state,
      st = sliderData[index].status;

    const cfm = window.confirm(`确定要${st ? '下架' : '上架'}该轮播图吗？`)

    if (cfm) {
      switch (st) {
        case 1:
          sliderData[index].status = 0;
          break;
        case 0:
          sliderData[index].status = 1;
          break;
        default:
          break;
      }

      // 需要采用回调函数的形式，因为要用到设置成功后的status，
      this.setState({
        sliderData: this.state.sliderData
      }, async () => {
        const result = await commonService.changeStatus({
          id: cid,
          status: this.state.sliderData[index].status,
          field: 'SLIDER'
        })
        console.log(result)
        const errorCode = result.error_code;

        if (errorCode !== 0) {
          const status = this.state.sliderData[index].status
          alert(
            status ? '该轮播图上架失败' : '该轮播图下架失败'
          );
          return;
        }
      })
    }
  }

  componentDidMount() {
    this.getSliderData();
  }

  render() {
    const { title, sliderData } = this.state;

    return (
      <div className='list-container'>
        <ListTitle
          title={title}
          onRefreshData={this.getSliderData.bind(this)}
        />

        <table className='list-table'>
          <TableHead thData={SLIDER_TH}></TableHead>
          <TableBody
            sliderData={sliderData}
            onStatusClick={this.onStatusClick.bind(this)}
          ></TableBody>

        </table>
      </div>
    )
  }
}