const SliderModel = require('../db/models/slider.js')

class SliderService {
  async addSliderData(data) {
    // 如果cid在数据库中存在，则更新数据
    // 查找一条数据，where cid是不是data传进来的cid。
    const result = await SliderModel.findOne({
      where: {
        cid: data.cid
      }
    })
    // 如果存在，则更新这条数据，where cid和data传进来的cid相等
    if (result) {
      return await SliderModel.update(data, {
        where: {
          cid: data.cid
        }
      })
    } else {
      // 如果不存在，则增加一条
      return await SliderModel.create(data);
    }
  }

  // 轮播图
  async getSliderData() {
    return await SliderModel.findAll({
      attributes: {
        exclude: ['imgUrl']
      }
    })
  }

  // 上下架
  async changeSliderStatus(id, status) {
    const ret = await SliderModel.update({ status }, {
      where: { id }
    });
    return ret[0];
  }
}

module.exports = new SliderService();