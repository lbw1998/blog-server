/* eslint-disable strict */

const BaseController = require('./base');

class MessageController extends BaseController {
  async index() {
    const { ctx } = this;
    let { pageNum } = ctx.query;
    pageNum = Number(pageNum);
    const list = await ctx.model.Message.find()
      .populate([ 'vid', 'children.vid', 'children.to_vid' ])
      .skip(((pageNum || 1) - 1) * 10)
      .limit(10)
      .sort({ _id: -1 });
    const total = await ctx.model.Message.count();
    this.success({ list, total });
  }
  async create() {
    const { ctx } = this;
    const { nickname, qq, avatar, email, content, cid, to_vid } = ctx.request.body;
    let visitor = await ctx.model.Visitor.findOne({ qq });
    // 判断游客是否已经存在
    if (visitor) {
      await ctx.model.Visitor.update({ qq }, { avatar, email });
    } else {
      visitor = await ctx.model.Visitor.create({ nickname, qq, avatar, email });
    }
    const vid = visitor._id;
    // 创建评论
    await ctx.service.message.create({ vid, content, cid, to_vid });
    this.message('留言成功');
  }
}

module.exports = MessageController;
