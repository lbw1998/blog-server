/* eslint-disable strict */

const BaseController = require('./base');
const md5 = require('md5');

class UserController extends BaseController {
  // 登陆
  async login() {
    const { ctx, app } = this;
    const { username, password } = ctx.request.body;
    const user = await ctx.model.User.findOne({
      username,
      password: md5(password),
    });
    if (user) {
      const { nickname } = user;
      const token = app.jwt.sign({
        username,
        nickname,
        id: user._id,
      }, app.config.jwt.secret, {
        expiresIn: '1h',
      });
      this.success({ token, nickname, username });
    } else {
      this.error('用户名或密码错误');
    }
  }
  // 修改密码
  async changePass() {
    const { ctx } = this;
    const { pass, newPass } = ctx.request.body;
    const me = await ctx.model.User.findOne({ _id: ctx.state.userid, password: md5(pass) });
    console.log(me);
    if (me) {
      me.password = md5(newPass);
      me.save();
      this.success('修改成功');
    } else {
      this.error('原密码错误');
    }
  }
}

module.exports = UserController;
