const CollectionModel = require('../db/models/collection.js');

class CollectionService {
  async addCollection(data) {
    const cid = data.cid;

    const result = await CollectionModel.findOne({
      where: { cid }
    })

    if (result) {
      return await CollectionModel.update(data, {
        where: { cid }
      })
    } else {
      return await CollectionModel.create(data);
    }
  }

  async getCollectionsData() {
    return await CollectionModel.findAll({
      attributes: {
        exclude: ['posterUrl', 'corseIdList']
      }
    })
  }

  async changeCollectionsStatus(id, status) {
    const ret = await CollectionModel.update({ status }, {
      where: { id }
    })

    return ret[0];
  }

}

module.exports = new CollectionService();