// eslint-disable-next-line strict
module.exports = ({ app }) => {
  return async function verify(ctx, next) {
    const token = ctx.request.header.authorization.replace('Bearer ', '');
    try {
      const res = await app.jwt.verify(token, app.config.jwt.secret);
      ctx.state.userid = res.id;
      ctx.state.nickname = res.nickname;
      ctx.state.username = res.username;
      await next();
    } catch (err) {
      if (err.name === 'TokenExpiredError') {
        ctx.state.userid = '';
        ctx.state.nickname = '';
        ctx.state.username = '';
        // eslint-disable-next-line no-return-assign
        return ctx.body = {
          code: 401,
          message: 'token过期',
        };
      }
    }
  };
};
