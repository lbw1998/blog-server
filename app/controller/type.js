/* eslint-disable strict */
const BaseController = require('./base');

class TypeController extends BaseController {
  async index() {
    const { ctx } = this;
    const res = await ctx.model.Type.find();
    this.success(res);
  }
  // 根据类型名称搜索文章
  async articles() {
    const { ctx } = this;
    const { typeName } = ctx.query;
    try {
      const type = await ctx.model.Type.findOne({ typeName });
      const list = await ctx.model.Article.find({ type: type._id }).sort({ _id: -1 });
      this.success(list);
    } catch (error) {
      this.error(error);
    }
  }
  async create() {
    const { ctx } = this;
    const { typeName } = ctx.request.body;
    const res = await ctx.model.Type.findOne({ typeName });
    if (res) {
      this.error('重复名称');
    } else {
      await ctx.model.Type.create({ typeName });
      this.message('创建成功');
    }
  }
  async update() {
    const { ctx } = this;
    const { id } = ctx.params;
    const { typeName } = ctx.request.body;
    const res = await ctx.model.Type.findOne({ typeName });
    if (res) {
      if (res._id === id) {
        this.message('更新成功');
      } else {
        this.error('命名重复');
      }
    } else {
      await ctx.model.Type.update({ _id: id }, { typeName });
      this.message('创建成功');
    }
  }
  async destroy() {
    const { ctx } = this;
    const { id } = ctx.params;
    const res = await ctx.model.Type.remove({ _id: id });
    if (res) {
      this.message('删除成功');
    } else {
      this.error(res.message);
    }
  }
}

module.exports = TypeController;
