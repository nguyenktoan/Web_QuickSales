"use client";

import { Suspense, useEffect, useState } from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import ModalAddProduct from "@/components/modal-component";
import ProductComponent from "@/components/product-component";
import { callAPI } from "@/utils/api-caller";
import { useRouter } from "next/navigation";
import { getUser, isLogined } from "@/utils/helper";

export default function Home() {
  const [bestSellers, setBestSellers] = useState([]);

  const router = useRouter();
  useEffect(() => {
    console.log(getUser());
    fetchData();
    if (getUser()?.role?.name === "ShopManager") {
      router.replace("/shop-manager");
    }
  }, []);

  const fetchData = async () => {
    try {
      const res = await callAPI(`/best-sellers`, "GET");
      setBestSellers(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="relative flex-col w-full min-h-screen">
      <Header />
      <div>
        {/* banner */}
        <div className="flex max-sm:flex-col items-center justify-center bg-[#88c8bc] text-white px-6 py-3.5 rounded font-[sans-serif]">
          <p className="text-base font-bold ">
            OUR BIGGEST SALE YET 50% OFF ALL SUMMER SHOES
          </p>
          <div className="flex gap-4 max-sm:mt-4 sm:ml-6"></div>
        </div>
        {/* cai hinh dau tien  */}

        <div
          className=" relative font-[sans-serif] before:absolute before:w-full before:h-full before:inset-0 before:bg-black before:opacity-50 before:z-10"
          style={{ width: "100%", height: "500px", objectFit: "contain" }}
        >
          <img
            src="/banner.jpg"
            alt="Banner Image"
            className="absolute inset-0 object-cover object-bottom w-full h-full "
          />
          <div className="min-h-[300px] relative z-50 h-full max-w-6xl mx-auto flex flex-col justify-center items-center text-center text-white p-6">
            <h2 className="mb-6 text-2xl font-bold sm:text-4xl"> MEN'S </h2>
            <p className="text-lg text-center text-gray-200">SHOES </p>
            <a
              href="javascript:void(0)"
              className="bg-[#88c8bc] rounded-3xl mt-8 bg-transparent text-white text-base font-semibold py-2.5 px-6 border-2 border-white rounded hover:bg-white hover:text-black transition duration-300 ease-in-out"
            >
              SHOP COLLECTION{" "}
            </a>
          </div>
        </div>

        {/* BEST SELLERS */}
        <div className="max-w-2xl mx-auto mt-5 text-center">
          <h2 className="text-3xl font-semibold text-gray-500 md:text-4xl">
            BEST SELLERS{" "}
          </h2>
        </div>
        <div className="flex items-center justify-center w-full shadow-sm ">
          <div className="grid w-full gap-8 px-8 mt-5 md:grid-cols-2 lg:grid-cols-4 justify-items-center">
            {bestSellers.map((val, index) => {
              const product = val.productDetails;
              return (
                <ProductComponent
                  id={val.productId}
                  key={index}
                  productName={product.name}
                  brand={product.category.name}
                  price={product.price}
                  imageUrl={val.productDetails.image[0].url}
                  in_stock={product.in_stock}
                  isBestSeller={true} // Truyền thuộc tính isBestSeller
                />
              );
            })}
          </div>
        </div>
        {/* NEW PRODUCTS */}
        <div className="max-w-2xl mx-auto mt-5 mb-16 text-center">
          <h2 className="mb-6 text-3xl font-extrabold md:text-4xl">
            NEW PRODUCTS{" "}
          </h2>
        </div>
      </div>
      <Footer />
    </div>
  );
}
