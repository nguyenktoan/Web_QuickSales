"use strict";

/**
 * A set of functions called "actions" for `best-sellers`
 */

module.exports = {
  bestsellers: async (ctx, next) => {
    try {
      // Không cần sử dụng user ở đây nếu không liên quan đến logic
      // const user = ctx.state.user;

      const data = await strapi
        .service("api::best-sellers.best-sellers")
        .bestsellers();

      ctx.body = data;
    } catch (err) {
      ctx.body = err;
    }
  },
};
