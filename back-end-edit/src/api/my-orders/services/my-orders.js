"use strict";

/**
 * my-orders service
 */
const addMoreProductDetail = async (products) => {
  for (let i = 0; i < products.length; i++) {
    const amount = products[i].amount;
    products[i] = await strapi.entityService.findOne(
      "api::product.product",
      products[i].productId,
      {
        populate: { category: true, image: true },
      }
    );
    products[i].amount = amount;
  }
};

module.exports = () => ({
  myorders: async (user) => {
    try {
      const entries = await strapi.entityService.findMany("api::order.order", {
        filters: { user: user.id }, // Không cần ép kiểu về số ở đây
        populate: { products: { populate: { category: true, image: true } } }, // Đảm bảo cấu trúc đúng cho populate
        sort: { id: "desc" }, // Thêm tùy chọn sort theo id từ lớn đến nhỏ
      });

      for (let i = 0; i < entries.length; i++) {
        await addMoreProductDetail(entries[i].products);
      }
      return entries;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
});
