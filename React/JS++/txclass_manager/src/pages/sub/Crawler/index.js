import React, { Component } from 'react';

import { getDatas } from 'utils/tools';
import { CRAWLER_TH } from '../../../config/table_config.js';
import crawlerData from '../../../config/crawler_config.js'

import CrawlerService from 'services/Crawler.js'

import ListTitle from 'components/common/ListTitle/index.js';
import TableHead from 'components/common/TableHead'
import TableBody from './TableBody'

import './index.scss';

const crawlerService = new CrawlerService();

export default class Crawler extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '数据爬取管理',
      crawlerData
    }
  }

  onCrawlClick(apiName, index) {
    console.log(index)
    const { crawlerData } = this.state,
      loading = crawlerData[index].loading;

    crawlerData[index].loading = !loading;

    this.setState({
      crawlerData: this.state.crawlerData
    }, async () => {
      const result = await crawlerService.crawlAction(apiName);

      console.log(result);

      crawlerData[index].loading = !this.state.crawlerData[index].loading;

      this.setState({
        crawlerData: this.state.crawlerData
      })
    })

  }

  componentDidMount() {
    crawlerService.crawlAction('crawlSiderData').then(res => {
      console.log(res)
    })
  }

  render() {
    const { title } = this.state;

    return (
      <div className='list-container'>
        <ListTitle
          title={title}
        />

        <table className='list-table'>
          <TableHead thData={CRAWLER_TH}></TableHead>

          <TableBody
            crawlerData={crawlerData}
            onCrawlClick={this.onCrawlClick.bind(this)}
          ></TableBody>

        </table>
      </div>
    )
  }
}