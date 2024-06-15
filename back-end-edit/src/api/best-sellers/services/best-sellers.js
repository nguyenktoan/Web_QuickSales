"use strict";

/**
 * best-sellers service
 */

module.exports = {
  async bestsellers() {
    try {
      // Calculate the date 30 days ago from today
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

      // Fetch all orders from Strapi within the last 30 days
      const orders = await strapi.entityService.findMany("api::order.order", {
        populate: { products: true }, // Ensure product data is fetched
        filters: {
          createdAt: {
            $gte: thirtyDaysAgo.toISOString(),
          },
        },
      });

      // Create an object to store the total amount for each product
      const productTotals = {};

      // Iterate through each order and calculate the total amount for each product
      orders.forEach((order) => {
        order.products.forEach((product) => {
          if (!productTotals[product.productId]) {
            productTotals[product.productId] = {
              productId: product.productId,
              totalAmount: 0,
            };
          }
          productTotals[product.productId].totalAmount += product.amount;
        });
      });

      // Convert the object to an array to return
      let bestSellers = Object.values(productTotals);

      // Sort products by totalAmount in descending order
      bestSellers.sort((a, b) => b.totalAmount - a.totalAmount);

      // Take the top 10 products
      bestSellers = bestSellers.slice(0, 10);

      // Get additional product details for each best seller
      const bestSellersWithDetails = await Promise.all(
        bestSellers.map(async (item) => {
          const product = await strapi.entityService.findOne(
            "api::product.product",
            item.productId,
            { populate: { category: true, image: true } } // Ensure the image field is populated
          );
          return {
            ...item,
            productDetails: product,
          };
        })
      );

      return bestSellersWithDetails;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
};
