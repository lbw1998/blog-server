/* eslint-disable strict */

const BaseController = require('./base');

class CommentController extends BaseController {
  async index() {
    const { ctx } = this;
    let { pageNum, article_id } = ctx.query;
    pageNum = Number(pageNum);
    const list = await ctx.model.Comment.find({ article_id })
      .populate([ 'vid', 'children.vid', 'children.to_vid' ])
      .skip(((pageNum || 1) - 1) * 10)
      .limit(10)
      .sort({ _id: -1 });
    const total = await ctx.model.Comment.find({ article_id }).count();
    this.success({ list, total });
  }
  async create() {
    const { ctx } = this;
    // 创建评论
    await ctx.service.comment.create();
    this.message('评论成功');
  }
  async getInfo() {
    const { ctx } = this;
    const { qq } = ctx.query;
    const res = await ctx.service.tool.parseQQ(qq);
    if (res) {
      this.success(res);
    } else {
      this.error('QQ号错误');
    }
  }
}

module.exports = CommentController;
