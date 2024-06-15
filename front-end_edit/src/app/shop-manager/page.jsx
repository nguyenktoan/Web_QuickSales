"use client";
import { callAPI } from "@/utils/api-caller";
import { getUser, isLogined } from "@/utils/helper";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import RevenueByDayChart from "./Chart/RevenueByDayChart";
import BestSellers from "./Chart/BestSellers";
import RevenueByMonthChart from "./Chart/RevenueByMonth";
const URL_SERVER = process.env.NEXT_PUBLIC_BACKEND_SERVER_MEDIA;

const ShopManager = () => {
  const [data, setData] = useState({
    totalRevenue: 0,
    totalOrders: 0,
    totalCustomers: 0,
    totalProducts: 0,
    revenueToday: 0,
    currentWeekRevenue: {},
    previousWeekRevenue: {},
    revenueByMonth: {},
  });

  const [bestSellersData, setBestSellersData] = useState([]);
  const router = useRouter();
  useEffect(() => {
    fetchData();
    fetchBestSellersData();
    if (getUser()?.role?.name !== "ShopManager") {
      router.replace("/");
    }
  }, []);

  const fetchData = async () => {
    try {
      const res = await callAPI("/get-revenue", "GET");
      setData({
        totalRevenue: res.data.totalRevenue,
        totalOrders: res.data.totalOrders,
        totalCustomers: res.data.totalCustomers,
        totalProducts: res.data.totalProducts,
        revenueToday: res.data.revenueToday,
        currentWeekRevenue: res.data.currentWeekRevenue,
        previousWeekRevenue: res.data.previousWeekRevenue,
        revenueByMonth: res.data.revenueByMonth,
      });
    } catch (error) {
      console.error("Failed to fetch revenue", error);
    }
  };

  const fetchBestSellersData = async () => {
    try {
      const res = await callAPI("/best-sellers", "GET");
      setBestSellersData(res.data); // Assuming res.data is an array of best sellers
    } catch (error) {
      console.error("Failed to fetch best sellers", error);
    }
  };

  return (
    <div className="grid bg-[#F6F6F7]">
      <div className="h-screen p-8 overflow-auto ">
        <h1 className="w-full p-4 text-3xl font-semibold font-bold text-left text-center text-gray-700 bg-gradient-to-tr f shrink-0 ">
          Shop Manager Dashboard
        </h1>
        <div className="flex justify-center gap-20 p-5 rounded-lg ">
          {/* Total Revenue */}
          <div className="items-center p-6 text-center bg-white rounded-md shadow-md w-52">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="inline-block size-6 "
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z"
              />
            </svg>
            <h2 className="inline-block p-3 text-sm font-medium text-gray-600">
              Total Revenue
            </h2>
            <p className="text-2xl font-bold">
              {" "}
              {data.totalRevenue.toLocaleString("vi-VN", {
                style: "currency",
                currency: "VND",
              })}
            </p>
          </div>
          {/* Total Orders */}
          <div className="items-center p-6 text-center bg-white rounded-md shadow-md w-52">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="inline-block size-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
              />
            </svg>

            <h2 className="inline-block p-3 text-sm font-medium text-gray-600">
              Total Orders
            </h2>
            <p className="text-2xl font-bold"> {data.totalOrders}</p>
          </div>
          {/*Customers */}
          <div className="items-center p-6 text-center bg-white rounded-md shadow-md w-52">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="inline-block size-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
              />
            </svg>

            <h2 className="inline-block p-3 text-sm font-medium text-gray-600">
              Customers{" "}
            </h2>
            <p className="text-2xl font-bold"> {data.totalCustomers}</p>
          </div>
          {/* Products */}
          <div className="items-center p-6 text-center bg-white rounded-md shadow-md w-52">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="inline-block size-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z"
              />
            </svg>

            <h2 className="inline-block p-3 text-sm font-medium text-gray-600">
              Products{" "}
            </h2>
            <p className="text-2xl font-bold"> {data.totalProducts}</p>
          </div>
          {/* Revenue By Month */}
          <div className="items-center p-6 text-center bg-white rounded-md shadow-md w-52">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="inline-block size-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z"
              />
            </svg>

            <h2 className="inline-block p-3 text-sm font-medium text-gray-600">
              Products{" "}
            </h2>
            <p className="text-2xl font-bold"> {data.totalProducts}</p>
          </div>
        </div>
        <div className="flex grid grid-cols-2">
          {/* RevenueChartByDay */}
          <div>
            <div className="inline-block w-full p-4 m-5 bg-white border rounded-md shadow-lg h-fit ">
              <h1 className="ml-16 text-xl font-bold text-gray-800 ">
                Revenue
              </h1>
              <span className="ml-16 font-semibold text-gray-600">
                Todays Earning:{" "}
                <span className="text-[#22C55E]">
                  {data.revenueToday.toLocaleString("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  })}
                </span>
              </span>
              <RevenueByDayChart
                currentWeekRevenue={data.currentWeekRevenue}
                previousWeekRevenue={data.previousWeekRevenue}
              />
            </div>{" "}
            <div className="w-full p-4 m-4 bg-white border rounded-md shadow-lg h-fit">
              <h1 className="ml-16 text-xl font-bold text-gray-800 ">
                Monthly Sales
              </h1>
              <RevenueByMonthChart revenueByMonth={data.revenueByMonth} />
            </div>
          </div>
          {/* BestSellers */}
          <div className="inline-block w-full p-4 mt-5 ml-8 bg-white border rounded-md shadow-lg h-fit ">
            <h1 className="mb-5 text-xl font-semibold font-bold text-center text-gray-800">
              Best Sellers
            </h1>
            <div className="overflow-x-auto font-[sans-serif]">
              <table className="min-w-full bg-white">
                {/* Hàng tiêu đề */}
                <thead className="bg-gray-100 whitespace-nowrap">
                  <tr>
                    <th className="p-4 text-sm font-semibold text-left text-black">
                      Product
                    </th>
                    <th className="p-4 text-sm font-semibold text-left text-black">
                      Price
                    </th>
                    <th className="p-4 text-sm font-semibold text-left text-black">
                      In stock
                    </th>
                    <th className="p-4 text-sm font-semibold text-left text-black">
                      Sales
                    </th>
                  </tr>
                </thead>
                {/* Body = sản phẩm */}
                <tbody className="divide-y divide-gray-200">
                  {bestSellersData.map((item, index) => (
                    <BestSellers
                      key={index}
                      index={index}
                      productName={item.productDetails.name} // Adjust to use correct nested property
                      price={item.productDetails.price} // Adjust to use correct nested property
                      imageUrl={item.productDetails.image[0].url} // Adjust to use correct nested property
                      in_stock={item.productDetails.in_stock} // Adjust to use correct nested property
                      amount={item.totalAmount} // Use totalAmount directly
                    />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopManager;
