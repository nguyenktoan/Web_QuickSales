"use client";
import Success from "@/components/confirmation-modal";
import { useAppContext } from "@/components/context";

import ShoppingCartItem from "@/components/shopping-cart-item";
import { callAPI } from "@/utils/api-caller";
import Link from "next/link";
import { useEffect, useState } from "react";
const URL_SERVER = process.env.NEXT_PUBLIC_BACKEND_SERVER_MEDIA;

const ShoppingCartPage = () => {
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const { shoppingCart, setShoppingCart } = useAppContext();
  const [totalPrice, setTotalPrice] = useState(0);
  console.log(shoppingCart);
  useEffect(() => {
    calcTotalPrice();
  }, [shoppingCart]);
  const calcTotalPrice = () => {
    var sum = 0;
    for (var i = 0; i < shoppingCart.length; i++) {
      sum += +shoppingCart[i].price * +shoppingCart[i].amount;
    }
    console.log(sum);
    setTotalPrice(sum);
  };

  const add = async (productId) => {
    try {
      const res = await callAPI("/add-to-shopping-cart", "POST", {
        productId,
        amount: 1,
      });
      console.log(res);
      setShoppingCart(res.data);
      calcTotalPrice();
    } catch (error) {}
  };
  const decrease = async (productId) => {
    try {
      const res = await callAPI("/add-to-shopping-cart", "POST", {
        productId,
        amount: -1,
      });
      console.log(res);
      setShoppingCart(res.data);
      calcTotalPrice();
    } catch (error) {}
  };

  const remove = async (productId, amount) => {
    try {
      const res = await callAPI("/add-to-shopping-cart", "POST", {
        productId,
        amount,
      });
      console.log(res);
      setShoppingCart(res.data);
    } catch (error) {}
  };
  const onCheckout = async () => {
    try {
      const data = {};
      const res = await callAPI("/check-out", "POST", data);
      console.log(res.data);
      setShoppingCart([]);
      setPaymentSuccess(true);
      setTimeout(() => {
        setPaymentSuccess(false);
      }, 3000);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="font-[sans-serif] bg-white h-full">
      <div className="p-6 mx-auto max-w-7xl max-lg:max-w-3xl">
        <h2 className="text-2xl font-extrabold text-blue-700">
          Your shopping bag
        </h2>

        <div className="relative grid gap-4 mt-8 sm:grid-cols-3">
          <div className="space-y-4 sm:col-span-2">
            {shoppingCart.map((val, index) => {
              return (
                <ShoppingCartItem
                  key={index}
                  productId={val.id}
                  image={URL_SERVER + val.image[0].url}
                  productName={val.name}
                  price={val.price}
                  productPrice={val.price * val.amount}
                  category={val.category.name}
                  amount={val.amount}
                  brand={val.brand}
                  add={add}
                  decrease={decrease}
                  remove={remove}
                />
              );
            })}
          </div>

          {shoppingCart.length > 0 && (
            <div className="container flex flex-col gap-5 mx-auto">
              {/* Payment method */}
              <div className=" bg-white h-max rounded-md p-4 shadow-[0_3px_20px_-10px_rgba(6,81,237,0.4)]  top-0">
                <div className="lg:col-span-2 max-lg:order-1">
                  <form className="">
                    <h3 className="text-lg font-bold text-blue-700">
                      Payment method
                    </h3>

                    <div className="grid gap-4 mt-8 sm:grid-cols-2">
                      <div className="flex items-center">
                        <input
                          type="radio"
                          className="w-5 h-5 cursor-pointer"
                          id="card"
                          name="payment-method"
                        />
                        <label
                          for="card"
                          className="flex gap-2 ml-4 cursor-pointer"
                        >
                          <img
                            src="https://readymadeui.com/images/visa.webp"
                            className="w-12"
                            alt="card1"
                          />
                          <img
                            src="https://readymadeui.com/images/american-express.webp"
                            className="w-12"
                            alt="card2"
                          />
                          <img
                            src="https://readymadeui.com/images/master.webp"
                            className="w-12"
                            alt="card3"
                          />
                        </label>
                      </div>

                      <div className="flex items-center ml-10">
                        <input
                          type="radio"
                          className="w-4 h-5 cursor-pointer"
                          id="paypal"
                          name="payment-method"
                        />
                        <label
                          for="paypal"
                          className="flex gap-2 ml-4 cursor-pointer"
                        >
                          <img
                            src="https://readymadeui.com/images/paypal.webp"
                            className="w-20"
                            alt="paypalCard"
                          />
                        </label>
                      </div>
                    </div>

                    <div className="grid gap-4 mt-8">
                      <input
                        type="text"
                        placeholder="Cardholder's Name"
                        className="px-4 py-3.5 bg-white text-gray-800 w-full text-sm border-b-2 focus:border-gray-800 outline-none"
                      />

                      <div className="flex overflow-hidden bg-white border-b-2 focus-within:border-gray-800">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-12 ml-3"
                          viewBox="0 0 291.764 291.764"
                        >
                          <path
                            fill="#2394bc"
                            d="m119.259 100.23-14.643 91.122h23.405l14.634-91.122h-23.396zm70.598 37.118c-8.179-4.039-13.193-6.765-13.193-10.896.1-3.756 4.24-7.604 13.485-7.604 7.604-.191 13.193 1.596 17.433 3.374l2.124.948 3.182-19.065c-4.623-1.787-11.953-3.756-21.007-3.756-23.113 0-39.388 12.017-39.489 29.204-.191 12.683 11.652 19.721 20.515 23.943 9.054 4.331 12.136 7.139 12.136 10.987-.1 5.908-7.321 8.634-14.059 8.634-9.336 0-14.351-1.404-21.964-4.696l-3.082-1.404-3.273 19.813c5.498 2.444 15.609 4.595 26.104 4.705 24.563 0 40.546-11.835 40.747-30.152.08-10.048-6.165-17.744-19.659-24.035zm83.034-36.836h-18.108c-5.58 0-9.82 1.605-12.236 7.331l-34.766 83.509h24.563l6.765-18.08h27.481l3.51 18.153h21.664l-18.873-90.913zm-26.97 54.514c.474.046 9.428-29.514 9.428-29.514l7.13 29.514h-16.558zM85.059 100.23l-22.931 61.909-2.498-12.209c-4.24-14.087-17.533-29.395-32.368-36.999l20.998 78.33h24.764l36.799-91.021H85.059v-.01z"
                            data-original="#2394bc"
                          />
                          <path
                            fill="#efc75e"
                            d="M51.916 111.982c-1.787-6.948-7.486-11.634-15.226-11.734H.374L0 101.934c28.329 6.984 52.107 28.474 59.821 48.688l-7.905-38.64z"
                            data-original="#efc75e"
                          />
                        </svg>
                        <input
                          type="number"
                          placeholder="Card Number"
                          className="px-4 py-3.5 bg-white text-gray-800 w-full text-sm outline-none"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-6">
                        <input
                          type="number"
                          placeholder="EXP."
                          className="px-4 py-3.5 bg-white text-gray-800 w-full text-sm border-b-2 focus:border-gray-800 outline-none"
                        />
                        <input
                          type="number"
                          placeholder="CVV"
                          className="px-4 py-3.5 bg-white text-gray-800 w-full text-sm border-b-2 focus:border-gray-800 outline-none"
                        />
                      </div>

                      <div className="flex items-center">
                        <input
                          id="remember-me"
                          name="remember-me"
                          type="checkbox"
                          className="w-4 h-4 text-blue-600 border-gray-300 rounded shrink-0 focus:ring-blue-500"
                        />
                        <label for="remember-me" className="block ml-3 text-sm">
                          I accept the{" "}
                          <a
                            href="javascript:void(0);"
                            className="ml-1 font-semibold text-blue-600 hover:underline"
                          >
                            Terms and Conditions
                          </a>
                        </label>
                      </div>
                    </div>
                  </form>
                </div>
              </div>

              {/* Order summary */}
              <div className="mt-5 bg-white h-max rounded-md p-4 shadow-[0_3px_20px_-10px_rgba(6,81,237,0.4)] sticky top-0">
                <h3 className="text-lg font-bold text-blue-700">
                  Order Summary
                </h3>
                <ul className="mt-3 space-y-3 text-sm text-gray-500">
                  <li className="flex flex-wrap gap-4">
                    Shipping <span className="ml-auto font-bold">Free</span>
                  </li>
                  <li className="flex flex-wrap gap-4">
                    Tax{" "}
                    <span className="ml-auto font-bold">
                      {(totalPrice * 0.001).toLocaleString("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      })}
                    </span>
                  </li>
                  <li className="flex flex-wrap gap-4 font-bold">
                    Total{" "}
                    <span className="ml-auto">
                      {(totalPrice + totalPrice * 0.001).toLocaleString(
                        "vi-VN",
                        {
                          style: "currency",
                          currency: "VND",
                        }
                      )}
                    </span>
                  </li>
                </ul>
                <button
                  type="button"
                  onClick={() => onCheckout()}
                  className="mt-6 text-sm px-5 py-2.5 w-full bg-blue-700 hover:bg-blue-800 tracking-wide text-white rounded-md"
                >
                  Pay{" "}
                  {(totalPrice + totalPrice * 0.001).toLocaleString("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  })}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      {shoppingCart.length === 0 && (
        <div className="max-w-4xl px-10 py-4 mx-auto mt-20 mb-20 bg-white rounded-lg">
          <div className="flex flex-col items-center justify-center py-12 ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="w-24 h-24 mb-4 text-gray-400 animate-wiggle"
            >
              <path d="M4.00488 16V4H2.00488V2H5.00488C5.55717 2 6.00488 2.44772 6.00488 3V15H18.4433L20.4433 7H8.00488V5H21.7241C22.2764 5 22.7241 5.44772 22.7241 6C22.7241 6.08176 22.7141 6.16322 22.6942 6.24254L20.1942 16.2425C20.083 16.6877 19.683 17 19.2241 17H5.00488C4.4526 17 4.00488 16.5523 4.00488 16ZM6.00488 23C4.90031 23 4.00488 22.1046 4.00488 21C4.00488 19.8954 4.90031 19 6.00488 19C7.10945 19 8.00488 19.8954 8.00488 21C8.00488 22.1046 7.10945 23 6.00488 23ZM18.0049 23C16.9003 23 16.0049 22.1046 16.0049 21C16.0049 19.8954 16.9003 19 18.0049 19C19.1095 19 20.0049 19.8954 20.0049 21C20.0049 22.1046 19.1095 23 18.0049 23Z"></path>
            </svg>
            <p className="mb-4 text-lg font-semibold text-gray-600">
              Your shopping cart is empty.
            </p>

            <Link href="/">
              <button className="px-6 py-2 text-white transition-colors duration-300 bg-blue-500 rounded-md shadow-md hover:bg-blue-600">
                Let’s go shopping!
              </button>
            </Link>
          </div>
        </div>
      )}
      {paymentSuccess && <Success />}{" "}
    </div>
  );
};
export default ShoppingCartPage;
