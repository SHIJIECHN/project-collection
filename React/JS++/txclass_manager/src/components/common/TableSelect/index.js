import React, { Component } from 'react'


import './index.scss'

export default class TableSelect extends Component {
  constructor(props) {
    super(props);

    this.state = {
      listShow: false
    }
  }

  showList() {
    this.setState({
      listShow: !this.state.listShow,
      selectValue: ''
    })
  }

  onSelectChange(data, index) {
    this.setState({
      listShow: false,
      selectValue: data.title
    })

    this.props.onSelectChange(data, this.props.cid, index)
  }

  componentDidMount() {
    this.setState({
      selectValue: this.props.defaultValue
    })
  }

  render() {
    const { fieldData, selectIdx } = this.props,
      { listShow, selectValue } = this.state;


    return (
      <div className='table-select'>
        <i className='iconfont icon-arrow-down'></i>
        <div
          className='value-show'
          onClick={this.showList.bind(this)}
        >{selectValue}</div>
        <ul
          className={['option-list', listShow ? 'show' : ''].join(' ')}
        >
          <li
            className='option-item'
            onClick={this.onSelectChange.bind(this, { id: 0, title: '无分类' }, selectIdx)}
          >
            无分类
          </li>
          {
            fieldData.map((item, index) => {
              return (
                <li
                  className='option-item'
                  key={index}
                  onClick={this.onSelectChange.bind(this, item, selectIdx)}
                >
                  {item.title}
                </li>
              )
            })
          }
        </ul>
      </div>
    )
  }
}