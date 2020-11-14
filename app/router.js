'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;

  const {login} = controller.user;
  router.post('/user/login', login);
};
