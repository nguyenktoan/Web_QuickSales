/**
 * A set of functions called "actions" for `my-orders`
 */
module.exports = {
  routes: [
    {
      method: "GET",
      path: "/best-sellers",
      handler: "best-sellers.bestsellers",
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};
