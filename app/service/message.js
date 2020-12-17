// eslint-disable-next-line strict
const Service = require('egg').Service;


class MessageService extends Service {
  async create(info) {
    const { ctx } = this;
    const { vid, content, cid, to_vid } = info;
    const visitor = await ctx.model.Visitor.findById(vid);
    const visitorName = visitor.nickname;
    if (to_vid) {
      const message = await ctx.model.Message.findOne({ _id: cid });
      message.children.unshift({ vid, to_vid, content });
      message.save();
      // 有文章评论@用户
      const toVisitor = await ctx.model.Visitor.findById(to_vid);
      const toVisitorEmail = toVisitor.email;
      const title = '你在留言板中的评论有新回复啦~';
      const html = `
      <h3>${visitorName}在留言板中回复你的评论说：</h3>
      <h2>
        ${content}
      </h2>
      `;
      await ctx.service.tool.sendEmail(title, html, toVisitorEmail);
    } else {
      await ctx.model.Message.create({ vid, content, children: [] });
      // 有文章评论给作者发送邮件
      const title = '你的留言板有新回复啦~';
      const html = `
      <h3>${visitorName}在留言板中说：</h3>
      <h2>
        ${content}
      </h2>
      `;
      await ctx.service.tool.sendEmail(title, html);
    }
    return true;
  }

}

module.exports = MessageService;
