import React, { Component } from 'react';

import CollectionService from 'services/Collection.js';
import CommonService from 'services/Common.js';

import { getDatas } from 'utils/tools';
import { COLLECTION_TH } from '../../../config/table_config.js';

import ListTitle from 'components/common/ListTitle/index.js';
import TableHead from 'components/common/TableHead'
import TableBody from './TableBody'

import './index.scss';

const collectionService = new CollectionService(),
  commonService = new CommonService();

export default class Collection extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '课程集合管理',
      collectionData: []
    }
  }

  /** 请求推荐课程管理列表 */
  async getCollectionData() {
    const result = await collectionService.getCollectionData(),
      errorCode = result.error_code,
      data = result.data,
      { histoty } = this.props;

    getDatas(errorCode, data, histoty, () => {
      this.setState({
        collectionData: data
      })
    })
  }

  // 上下架
  onStatusClick(cid, index) {
    const { collectionData } = this.state,
      st = collectionData[index].status;

    const cfm = window.confirm(`确定要${st ? '下架' : '上架'}该轮播图吗？`)

    if (cfm) {
      switch (st) {
        case 1:
          collectionData[index].status = 0;
          break;
        case 0:
          collectionData[index].status = 1;
          break;
        default:
          break;
      }

      // 需要采用回调函数的形式，因为要用到设置成功后的status，
      this.setState({
        collectionData: this.state.collectionData
      }, async () => {
        const result = await commonService.changeStatus({
          id: cid,
          status: this.state.collectionData[index].status,
          field: 'COLLECTION'
        })
        console.log(result)
        const errorCode = result.error_code;

        if (errorCode !== 0) {
          const status = this.state.collectionData[index].status
          alert(
            status ? '该集合上架失败' : '该集合下架失败'
          );
          return;
        }
      })
    }
  }

  componentDidMount() {
    this.getCollectionData();
  }

  render() {
    const { title, collectionData } = this.state;

    return (
      <div className='list-container'>
        <ListTitle
          title={title}
          onRefreshData={this.getCollectionData.bind(this)}
        />

        <table className='list-table'>
          <TableHead thData={COLLECTION_TH}></TableHead>
          <TableBody
            collectionData={collectionData}
            onStatusClick={this.onStatusClick.bind(this)}
          ></TableBody>

        </table>
      </div>
    )
  }
}