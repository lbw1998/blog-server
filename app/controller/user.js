
const BaseController = require('./base');
const md5 = require('md5');

class UserController extends BaseController {
  // 登陆
  async login() {
    const { ctx, app } = this;
    const {username, password} = ctx.request.body;
    console.log(username, password);
    const user = await ctx.model.User.findOne({
      username,
      password: md5(password)
    });
    console.log(user);
    if (user) {
      const { nickname } = user;
      const token = app.jwt.sign({
        username,
        nickname,
        id: user._id
      }, app.config.jwt.secret, {
        expiresIn: '10s'
      });
      this.success({token, nickname, username});
    } else {
      this.error('用户名或密码错误');
    }
  }
}

module.exports = UserController;