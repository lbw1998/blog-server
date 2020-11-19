'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;

  const jwt = app.middleware.jwt({ app });

  // 用户
  const { login } = controller.user;
  router.post('/user/login', login);

  // 类型
  router.resources('type', '/types', jwt, controller.type);
  // 文件上传
  router.resources('file', '/files', controller.file);
  // 文章
  router.resources('article', '/articles', jwt, controller.article);
  // 游客(无token)查看列表
  router.get('/type/list', controller.type.index);
  router.get('/type/articles', controller.type.articles);
  router.get('/article/list', controller.article.index);
  router.get('/article/detail/:id', controller.article.show);
  // 查看上一篇和下一篇
  router.get('/article/recentRecord/', controller.article.recentRecord);
  // 根据QQ获取头像昵称
  router.get('/comment/index', controller.comment.index);
  router.get('/comment/getInfo', controller.comment.getInfo);
  router.post('/comment/create', controller.comment.create);
  // const { add, delType, upload, getList } = controller.type;
  // router.post('/type/add', jwt, add);
  // // router.delete('/type/delType', jwt, delType);
  // router.put('/type/upload/:id', jwt, upload);
  // router.get('/type/getList', jwt, getList);

};
