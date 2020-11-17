/* eslint-disable strict */
// app.js

const md5 = require('md5');
const username = 'admin';
const password = md5(md5('luobowen0104.'));
const avatar = 'http://127.0.0.1:7001/public/avatar/default.png';
const nickname = '取暖';

module.exports = app => {
  app.ready(async () => {
    const User = app.mongoose.model('User');
    const user = await User.findOne({
      username,
      password,
    });
    // 如果数据库没有admin用户，则创建
    if (!user) {
      await User.create({
        username,
        password,
        nickname,
        avatar,
      });
    }
  });
};
