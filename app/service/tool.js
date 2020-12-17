// eslint-disable-next-line strict
const Service = require('egg').Service;
const nodemailer = require('nodemailer');
const iconv = require('iconv-lite');

const userEmail = 'luobowen19980104@foxmail.com';
const pass = 'jqaulbcgvwmhbhgd';
const transporter = nodemailer.createTransport({
  service: 'qq',
  port: 465,
  secureConnetion: true,
  auth: {
    user: userEmail,
    pass,
  },
});
class ToolService extends Service {
  // 获取QQ信息
  async parseQQ(qq) {
    const { ctx } = this;
    const avatar = `https://q4.qlogo.cn/g?b=qq&nk=${qq}&s=100`;
    const result = await ctx.curl('https://r.qzone.qq.com/fcg-bin/cgi_get_portrait.fcg?uins=' + qq, {
      // dataType: 'text',
      timeout: 10000,
    });
    let nickname = result.data;
    nickname = iconv.decode(nickname, 'gbk').split('"')[5];
    if (nickname === '') {
      return false;
    }
    return {
      avatar,
      nickname,
    };
  }
  // 获取IP信息
  async getIP() {
    const { ctx } = this;
    const ip = ctx.request.ip;
    const { data } = await ctx.curl(`https://www.ip.cn/api/index?ip=${ip}&type=1`, {
      dataType: 'text',
      timeout: 10000,
    });
    return JSON.parse(data);
  }
  // 发邮件
  async sendEmail(title, html, email = userEmail) {
    const mailOptions = {
      from: userEmail,
      to: email,
      subject: title,
      test: '',
      html,
    };
    try {
      await transporter.sendMail(mailOptions);
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}

module.exports = ToolService;
