/* eslint-disable strict */

const BaseController = require('./base');

class CommentController extends BaseController {
  async index() {
    const { ctx } = this;
    const { article_id } = ctx.query;
    const res = await ctx.model.Comment.find({ article_id }).populate('vid');
    this.success(res);
  }
  async create() {
    const { ctx } = this;
    const { nickname, qq, avatar, email, article_id, content } = ctx.request.body;
    let visitor = await ctx.model.Visitor.findOne({ qq });
    try {
      if (visitor) {
        await ctx.model.Visitor.update({ qq }, { avatar, email });
      } else {
        visitor = await ctx.model.Visitor.create({ nickname, qq, avatar, email });
      }
      const vid = visitor._id;
      await ctx.model.Comment.create({ article_id, vid, content, children: [] });
      await ctx.model.Article.findOneAndUpdate({ _id: article_id }, { $inc: { count: 1 } });
      this.message('评论成功');
    } catch (error) {
      this.error(error);
    }
  }
  async getInfo() {
    const { ctx } = this;
    const { qq } = ctx.query;
    try {
      const res = await ctx.service.comment.parseQQ(qq);
      this.success(res);
    } catch (error) {
      this.error(error);
    }
  }
}

module.exports = CommentController;
