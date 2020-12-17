/* eslint-disable strict */

const BaseController = require('./base');

class ArticleController extends BaseController {
  async index() {
    const { ctx } = this;
    const { pageNum, pageSize, search } = ctx.query;
    const res = await ctx.model.Article.find({
      $or: [ // 多字段同时匹配
        { title: { $regex: search || '', $options: '$i' } }, //  $options: '$i' 忽略大小写
      ],
    }).populate([ 'type', 'author' ])
      .skip(((pageNum || 1) - 1) * (pageSize || 10))
      .limit(Number(pageSize) || 10)
      .sort({ _id: -1 });
    this.success(res);
  }
  async create() {
    const { ctx } = this;
    const { type, article, article_html, title, desc, imgUrl } = ctx.request.body;
    await ctx.model.Article.create({ title, type, article, imgUrl, article_html, author: ctx.state.userid, desc });
    this.message('创建成功');

  }
  async show() {
    const { ctx } = this;
    const { id } = ctx.params;
    const res = await ctx.model.Article.findOneAndUpdate({ _id: id }, { $inc: { views: 1 } }).populate('author');
    this.success(res);
  }
  async update() {
    const { ctx } = this;
    const { id } = ctx.params;
    const { type, article, article_html, title, desc, imgUrl } = ctx.request.body;
    await ctx.model.Article.update({ _id: id }, { title, type, article, imgUrl, article_html, desc });
    this.message('更新成功');

  }
  async destroy() {
    const { ctx } = this;
    const { id } = ctx.params;
    await ctx.model.Article.remove({ _id: id });
    this.message('删除成功');
  }
  // 获取文章上下两篇文章
  async recentRecord() {
    const { ctx } = this;
    const { id } = ctx.query;
    const prev = await ctx.model.Article.find({ _id: { $lt: id } }).sort({ _id: -1 }).limit(1);
    const next = await ctx.model.Article.find({ _id: { $gt: id } }).sort({ _id: 1 }).limit(1);
    this.success({ prev: prev[0], next: next[0] });
  }
}

module.exports = ArticleController;
