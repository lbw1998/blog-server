// eslint-disable-next-line strict
const Service = require('egg').Service;
const iconv = require('iconv-lite');

class CommentService extends Service {
  async parseQQ(qq) {
    const { ctx } = this;
    const avatar = `https://q4.qlogo.cn/g?b=qq&nk=${qq}&s=100`;
    const result = await ctx.curl('https://r.qzone.qq.com/fcg-bin/cgi_get_portrait.fcg?uins=' + qq, {
      // dataType: 'text',
      timeout: 10000,
    });
    let nickname = result.data;
    nickname = iconv.decode(nickname, 'gbk').split('"')[5];
    if (nickname === '') {
      throw ('QQ号错误');
    }
    return {
      avatar,
      nickname,
    };
  }
}

module.exports = CommentService;
