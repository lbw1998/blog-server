// 返回值规定格式类型

const Controller = require('egg').Controller;

class BaseController extends Controller {
  success(data) {
    this.ctx.body = {
      code: 0,
      data
    };
  }
  error(message, code = -1) {
    this.ctx.body = {
      code,
      message
    }
  }
  message(message) {
    this.ctx.body = {
      code: 0,
      message
    }
  }
}

module.exports = BaseController;