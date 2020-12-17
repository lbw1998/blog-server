// eslint-disable-next-line strict
const Service = require('egg').Service;


class CommentService extends Service {
  async create() {
    const { ctx } = this;
    const { nickname, qq, avatar, email, article_id, content, cid, to_vid } = ctx.request.body;
    let visitor = await ctx.model.Visitor.findOne({ qq });
    // 查询评论人是否已存在
    const { address } = await ctx.service.tool.getIP();
    if (visitor) {
      await ctx.model.Visitor.update({ qq }, { avatar, email, address });
    } else {
      visitor = await ctx.model.Visitor.create({ nickname, qq, avatar, email, address });
    }
    const vid = visitor._id;
    const visitorName = visitor.nickname;
    const article = await ctx.model.Article.findById(article_id);
    // 发送邮件
    if (to_vid) {
      const comment = await ctx.model.Comment.findOne({ _id: cid });
      comment.children.unshift({ vid, to_vid, content });
      comment.save();
      // 有文章评论@用户
      const toVisitor = await ctx.model.Visitor.findById(to_vid);
      const toVisitorEmail = toVisitor.email;
      const title = `你在文章《${article.title}》中的评论有新回复啦~`;
      const html = `
      <h3>${visitorName}在《${article.title}》中回复你的评论说：</h3>
      <h2>
        ${content}
      </h2>
      `;
      await ctx.service.tool.sendEmail(title, html, toVisitorEmail);
    } else {
      await ctx.model.Comment.create({ article_id, vid, content, children: [] });
      // 有文章评论给作者发送邮件
      const title = `你发表的文章《${article.title}》新回复啦~`;
      const html = `
      <h3>${visitorName}在《${article.title}》中说：</h3>
      <h2>
        ${content}
      </h2>
      `;
      await ctx.service.tool.sendEmail(title, html);
    }
    return await ctx.model.Article.findOneAndUpdate({ _id: article_id }, { $inc: { count: 1 } });
  }

}

module.exports = CommentService;
