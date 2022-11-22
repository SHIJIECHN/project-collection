const { redisGet, redisSet } = require('../libs/redisClient.js')

class Index {
  async index(ctx, next) {
    const sess = ctx.session;
    console.log(sess)

    if (!sess.uid) {
      sess.uid = 1;
      sess.usename = 'jsjiajia';
      sess.nickname = 'js++';
      sess.gender = 'male';
    }

    // redisSet('a', 1);
    // redisSet('json', { a: 1, b: 2 });

    // redisGet('json').then(res => {
    //   console.log(res);
    // })

    ctx.body = {
      session: sess
    }

    // await ctx.render('index');
  }

}

module.exports = new Index();