"use strict";

/**
 * get-revenue service
 */
const sumOf = (orders) => {
  return orders.reduce((sum, order) => sum + +order.totalPrice, 0);
};

const countOrders = (orders) => {
  return orders.length;
};

const groupBy = (array, keyGetter) => {
  const map = new Map();
  array.forEach((item) => {
    const key = keyGetter(item);
    const collection = map.get(key);
    if (!collection) {
      map.set(key, [item]);
    } else {
      collection.push(item);
    }
  });
  return map;
};

const getStartOfWeek = (date) => {
  const start = new Date(date);
  const day = start.getDay();
  const diff = start.getDate() - day + (day === 0 ? -6 : 1); // Adjust when day is Sunday
  return new Date(start.setDate(diff));
};

module.exports = () => ({
  getRevenue: async () => {
    try {
      const orders = await strapi.entityService.findMany("api::order.order");

      // Calculate total revenue and total order count
      const totalRevenue = sumOf(orders);
      const totalOrders = countOrders(orders);

      // Group orders by month and calculate revenue and count
      const ordersByMonth = groupBy(orders, (order) => {
        const date = new Date(order.createdAt);
        return `${date.getFullYear()}-${date.getMonth() + 1}`;
      });

      const revenueByMonth = {};
      const ordersCountByMonth = {};
      ordersByMonth.forEach((orders, month) => {
        revenueByMonth[month] = sumOf(orders);
        ordersCountByMonth[month] = countOrders(orders);
      });

      // Group orders by day and calculate revenue and count
      const ordersByDay = groupBy(orders, (order) => {
        const date = new Date(order.createdAt);
        return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
      });

      // const revenueByDay = {};
      const ordersCountByDay = {};
      ordersByDay.forEach((orders, day) => {
        // revenueByDay[day] = sumOf(orders);
        ordersCountByDay[day] = countOrders(orders);
      });

      // Calculate revenue and count for current and previous week
      const now = new Date();
      const startOfCurrentWeek = getStartOfWeek(now);
      const startOfPreviousWeek = new Date(startOfCurrentWeek);
      startOfPreviousWeek.setDate(startOfPreviousWeek.getDate() - 7);

      const currentWeekOrders = orders.filter((order) => {
        const orderDate = new Date(order.createdAt);
        return orderDate >= startOfCurrentWeek && orderDate < now;
      });

      const previousWeekOrders = orders.filter((order) => {
        const orderDate = new Date(order.createdAt);
        return (
          orderDate >= startOfPreviousWeek && orderDate < startOfCurrentWeek
        );
      });

      const currentWeekRevenue = {};
      currentWeekOrders.forEach((order) => {
        const date = new Date(order.createdAt);
        const key = `${date.getFullYear()}-${
          date.getMonth() + 1
        }-${date.getDate()}`;
        currentWeekRevenue[key] =
          (currentWeekRevenue[key] || 0) + +order.totalPrice;
      });

      const previousWeekRevenue = {};
      previousWeekOrders.forEach((order) => {
        const date = new Date(order.createdAt);
        const key = `${date.getFullYear()}-${
          date.getMonth() + 1
        }-${date.getDate()}`;
        previousWeekRevenue[key] =
          (previousWeekRevenue[key] || 0) + +order.totalPrice;
      });

      // Get the total number of users with the role 'customer'
      const customerRole = await strapi.entityService.findMany(
        "plugin::users-permissions.role",
        {
          filters: { name: "Customer" },
        }
      );

      let totalCustomers = 0;
      if (customerRole.length > 0) {
        const customerRoleId = customerRole[0].id;
        totalCustomers = await strapi.entityService.count(
          "plugin::users-permissions.user",
          {
            filters: { role: customerRoleId },
          }
        );
      } else {
        console.warn("Customer role not found");
      }

      // Get the total number of products
      const totalProducts = await strapi.entityService.count(
        "api::product.product"
      );

      // Calculate revenue for today
      const startOfToday = new Date(now);
      startOfToday.setHours(0, 0, 0, 0);
      const endOfToday = new Date(now);
      endOfToday.setHours(23, 59, 59, 999);

      const todayOrders = orders.filter((order) => {
        const orderDate = new Date(order.createdAt);
        return orderDate >= startOfToday && orderDate <= endOfToday;
      });

      const revenueToday = sumOf(todayOrders);

      return {
        totalRevenue,
        totalOrders,
        revenueByMonth,
        ordersCountByMonth,
        ordersCountByDay,
        currentWeekRevenue,
        previousWeekRevenue,
        revenueToday,
        totalCustomers,
        totalProducts,
      };
    } catch (error) {
      console.log(error);
      return error;
    }
  },
});
