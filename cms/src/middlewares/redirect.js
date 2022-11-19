/**
 * `redirect` middleware.
 */

module.exports = (config, {strapi}) =>
  // Add your own logic here.
  async (ctx, next) => {
    if (ctx.request.url === "/") {
      ctx.redirect(strapi.config.get("server.admin.url", "/dashboard"));
    } else {
      await next();
    }
  };
