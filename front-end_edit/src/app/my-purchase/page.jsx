"use client";
import PurchaseItem from "@/components/purchase-item";
import ShoppingCartItem from "@/components/shopping-cart-item";
import { callAPI } from "@/utils/api-caller";
import { isLogined } from "@/utils/helper";
import { useEffect, useState } from "react";
const URL_SERVER = process.env.NEXT_PUBLIC_BACKEND_SERVER_MEDIA;
import { useRouter } from "next/navigation";

const MyPurchasePage = () => {
  const router = useRouter();
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      const res = await callAPI("/my-orders?&sort=id:DESC", "GET");

      console.log(res.data);
      setOrders(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (!isLogined()) {
      router.replace("/");
    }
  }, []);
  return (
    <div className="">
      <h1 className="w-full h-full p-4 text-3xl font-semibold font-bold text-left text-center text-gray-700 bg-gradient-to-tr f shrink-0 ">
        Order History
      </h1>
      <div>
        {orders.map((val, index) => {
          return (
            <PurchaseItem
              orderId={val.id}
              products={val.products}
              totalPrice={val.totalPrice}
              key={index}
              date={val.createdAt}
            />
          );
        })}
      </div>
    </div>
  );
};

export default MyPurchasePage;
