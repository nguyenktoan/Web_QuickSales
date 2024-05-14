/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
"use client";

import { Suspense, useEffect, useState } from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import ModalAddProduct from "@/components/modal-component";
import ProductComponent from "@/components/product-component";
import { callAPI } from "@/utils/api-caller";

export default function Home() {
  return (
    <div className="flex-col relative w-full min-h-screen">
      <Header />
      <div>
        {/* banner */}
        <div className="flex max-sm:flex-col items-center justify-center bg-[#88c8bc] text-white px-6 py-3.5 rounded font-[sans-serif]">
          <p className="font-bold text-base ">
            OUR BIGGEST SALE YET 50% OFF ALL SUMMER SHOES
          </p>
          <div className="max-sm:mt-4 sm:ml-6 flex gap-4"></div>
        </div>
        {/* cai hinh dau tien  */}

        <div
          className=" relative font-[sans-serif] before:absolute before:w-full before:h-full before:inset-0 before:bg-black before:opacity-50 before:z-10"
          style={{ width: "100%", height: "500px", objectFit: "contain" }}
        >
          <img
            src="/landing1.jpg"
            alt="Banner Image"
            class="object-bottom absolute inset-0 w-full h-full object-cover "
          />
          <div className="min-h-[300px] relative z-50 h-full max-w-6xl mx-auto flex flex-col justify-center items-center text-center text-white p-6">
            <h2 className="sm:text-4xl text-2xl font-bold mb-6"> MEN'S </h2>
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
        <div className="mt-5 mb-16 max-w-2xl text-center mx-auto">
          <h2 className="md:text-4xl text-3xl font-extrabold mb-6">
            BEST SELLERS{" "}
          </h2>
        </div>
        {/* NEW PRODUCTS */}
        <div className="mt-5 mb-16 max-w-2xl text-center mx-auto">
          <h2 className="md:text-4xl text-3xl font-extrabold mb-6">
            NEW PRODUCTS{" "}
          </h2>
        </div>
      </div>
      <Footer />
    </div>
  );
}
