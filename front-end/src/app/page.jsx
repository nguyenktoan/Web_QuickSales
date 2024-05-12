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
        <div className="bg-white font-[sans-serif]  text-black text-[15px]">
          <div className="px-4 sm:px-10">
            <div className="min-h-[500px]">
              <div className="grid md:grid-cols-2 justify-center items-center gap-10">
                <div className="max-md:order-1">
                  <p className="mt-4 mb-2 font-semibold text-blue-600">
                    <span className="rotate-90 inline-block mr-2">|</span> ALL
                    NEW COLLECTION FOR SNEAKERS{" "}
                  </p>
                  <h1 className="md:text-5xl text-4xl font-bold mb-4 md:!leading-[55px]">
                    Sneakers And Athletic Shoes{" "}
                  </h1>
                  <p className="mt-4 text-base leading-relaxed">
                    Sneakers and Athletic Shoes is a diverse and extensive
                    collection of sports footwear, ranging from sleek sneakers
                    to specialized shoes for specific athletic activities. With
                    modern designs and high-quality materials, the products in
                    this collection not only provide comfort and style but also
                    help wearers express their unique personal style. Enjoy the
                    versatility and functionality of sneakers and athletic
                    shoes, suitable for everything from casual daily wear to
                    intense sports training.
                  </p>
                  <div className="bg-white mt-10 flex px-1 py-1.5 rounded-full shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] overflow-hidden">
                    <input
                      type="email"
                      placeholder="Search Something..."
                      className="w-full outline-none bg-white pl-4"
                    />
                    <button
                      type="button"
                      className="bg-blue-600 hover:bg-blue-700 transition-all text-white rounded-full px-5 py-2.5"
                    >
                      Search
                    </button>
                  </div>

                  <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4 items-center">
                    <img
                      src="https://readymadeui.com/google-logo.svg"
                      className="w-28 mx-auto"
                      alt="google-logo"
                    />
                    <img
                      src="https://readymadeui.com/facebook-logo.svg"
                      className="w-28 mx-auto"
                      alt="facebook-logo"
                    />
                    <img
                      src="https://readymadeui.com/linkedin-logo.svg"
                      className="w-28 mx-auto"
                      alt="linkedin-logo"
                    />
                    <img
                      src="https://readymadeui.com/pinterest-logo.svg"
                      className="w-28 mx-auto"
                      alt="pinterest-logo"
                    />
                  </div>
                </div>
                <div className="max-md:mt-12 h-full">
                  <img
                    src="/image_1.webp"
                    alt="banner img"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>

            <div className="mt-28 bg-gray-50 px-4 sm:px-10 py-12">
              <div className="max-w-7xl mx-auto">
                <div className="md:text-center max-w-2xl mx-auto">
                  <h2 className="md:text-4xl text-3xl font-bold mb-6">
                    Featured Products
                  </h2>
                  <p>
                    Unlock a world of possibilities with our exclusive features.
                    Explore how our unique offerings can transform your journey
                    and empower you to achieve more.
                  </p>
                </div>
                <div className="grid lg:grid-cols-3 sm:grid-cols-2 gap-10 mt-14">
                  <div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-8 fill-blue-600 mb-4 inline-block"
                      viewBox="0 0 32 32"
                    >
                      <path
                        d="M28.068 12h-.128a.934.934 0 0 1-.864-.6.924.924 0 0 1 .2-1.01l.091-.091a2.938 2.938 0 0 0 0-4.147l-1.511-1.51a2.935 2.935 0 0 0-4.146 0l-.091.091A.956.956 0 0 1 20 4.061v-.129A2.935 2.935 0 0 0 17.068 1h-2.136A2.935 2.935 0 0 0 12 3.932v.129a.956.956 0 0 1-1.614.668l-.086-.091a2.935 2.935 0 0 0-4.146 0l-1.516 1.51a2.938 2.938 0 0 0 0 4.147l.091.091a.935.935 0 0 1 .185 1.035.924.924 0 0 1-.854.579h-.128A2.935 2.935 0 0 0 1 14.932v2.136A2.935 2.935 0 0 0 3.932 20h.128a.934.934 0 0 1 .864.6.924.924 0 0 1-.2 1.01l-.091.091a2.938 2.938 0 0 0 0 4.147l1.51 1.509a2.934 2.934 0 0 0 4.147 0l.091-.091a.936.936 0 0 1 1.035-.185.922.922 0 0 1 .579.853v.129A2.935 2.935 0 0 0 14.932 31h2.136A2.935 2.935 0 0 0 20 28.068v-.129a.956.956 0 0 1 1.614-.668l.091.091a2.935 2.935 0 0 0 4.146 0l1.511-1.509a2.938 2.938 0 0 0 0-4.147l-.091-.091a.935.935 0 0 1-.185-1.035.924.924 0 0 1 .854-.58h.128A2.935 2.935 0 0 0 31 17.068v-2.136A2.935 2.935 0 0 0 28.068 12ZM29 17.068a.933.933 0 0 1-.932.932h-.128a2.956 2.956 0 0 0-2.083 5.028l.09.091a.934.934 0 0 1 0 1.319l-1.511 1.509a.932.932 0 0 1-1.318 0l-.09-.091A2.957 2.957 0 0 0 18 27.939v.129a.933.933 0 0 1-.932.932h-2.136a.933.933 0 0 1-.932-.932v-.129a2.951 2.951 0 0 0-5.028-2.082l-.091.091a.934.934 0 0 1-1.318 0l-1.51-1.509a.934.934 0 0 1 0-1.319l.091-.091A2.956 2.956 0 0 0 4.06 18h-.128A.933.933 0 0 1 3 17.068v-2.136A.933.933 0 0 1 3.932 14h.128a2.956 2.956 0 0 0 2.083-5.028l-.09-.091a.933.933 0 0 1 0-1.318l1.51-1.511a.932.932 0 0 1 1.318 0l.09.091A2.957 2.957 0 0 0 14 4.061v-.129A.933.933 0 0 1 14.932 3h2.136a.933.933 0 0 1 .932.932v.129a2.956 2.956 0 0 0 5.028 2.082l.091-.091a.932.932 0 0 1 1.318 0l1.51 1.511a.933.933 0 0 1 0 1.318l-.091.091A2.956 2.956 0 0 0 27.94 14h.128a.933.933 0 0 1 .932.932Z"
                        data-original="#000000"
                      />
                      <path
                        d="M16 9a7 7 0 1 0 7 7 7.008 7.008 0 0 0-7-7Zm0 12a5 5 0 1 1 5-5 5.006 5.006 0 0 1-5 5Z"
                        data-original="#000000"
                      />
                    </svg>
                    <h3 className="text-xl font-semibold mb-2">
                      Customization
                    </h3>
                    <p>Tailor our product to suit your needs.</p>
                    <a
                      href="javascript:void(0);"
                      className="text-blue-600 font-semibold inline-block mt-2 hover:underline"
                    >
                      Learn more
                    </a>
                  </div>
                  <div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-8 fill-blue-600 mb-4 inline-block"
                      viewBox="0 0 682.667 682.667"
                    >
                      <defs>
                        <clipPath id="a" clipPathUnits="userSpaceOnUse">
                          <path d="M0 512h512V0H0Z" data-original="#000000" />
                        </clipPath>
                      </defs>
                      <g
                        fill="none"
                        className="stroke-blue-600"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-miterlimit="10"
                        stroke-width="40"
                        clip-path="url(#a)"
                        transform="matrix(1.33 0 0 -1.33 0 682.667)"
                      >
                        <path
                          d="M256 492 60 410.623v-98.925C60 183.674 137.469 68.38 256 20c118.53 48.38 196 163.674 196 291.698v98.925z"
                          data-original="#000000"
                        />
                        <path
                          d="M178 271.894 233.894 216 334 316.105"
                          data-original="#000000"
                        />
                      </g>
                    </svg>
                    <h3 className="text-xl font-semibold mb-2">Security</h3>
                    <p>
                      Your data is protected by the latest security measures.
                    </p>
                    <a
                      href="javascript:void(0);"
                      className="text-blue-600 font-semibold inline-block mt-2 hover:underline"
                    >
                      Learn more
                    </a>
                  </div>
                  <div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-8 fill-blue-600 mb-4 inline-block"
                      viewBox="0 0 512.001 512.001"
                    >
                      <path
                        d="M271.029 0c-33.091 0-61 27.909-61 61s27.909 61 61 61 60-27.909 60-61-26.909-61-60-61zm66.592 122c-16.485 18.279-40.096 30-66.592 30-26.496 0-51.107-11.721-67.592-30-14.392 15.959-23.408 36.866-23.408 60v15c0 8.291 6.709 15 15 15h151c8.291 0 15-6.709 15-15v-15c0-23.134-9.016-44.041-23.408-60zM144.946 460.404 68.505 307.149c-7.381-14.799-25.345-20.834-40.162-13.493l-19.979 9.897c-7.439 3.689-10.466 12.73-6.753 20.156l90 180c3.701 7.423 12.704 10.377 20.083 6.738l19.722-9.771c14.875-7.368 20.938-25.417 13.53-40.272zM499.73 247.7c-12.301-9-29.401-7.2-39.6 3.9l-82 100.8c-5.7 6-16.5 9.6-22.2 9.6h-69.901c-8.401 0-15-6.599-15-15s6.599-15 15-15h60c16.5 0 30-13.5 30-30s-13.5-30-30-30h-78.6c-7.476 0-11.204-4.741-17.1-9.901-23.209-20.885-57.949-30.947-93.119-22.795-19.528 4.526-32.697 12.415-46.053 22.993l-.445-.361-21.696 19.094L174.28 452h171.749c28.2 0 55.201-13.5 72.001-36l87.999-126c9.9-13.201 7.2-32.399-6.299-42.3z"
                        data-original="#000000"
                      />
                    </svg>
                    <h3 className="text-xl font-semibold mb-2">Support</h3>
                    <p>24/7 customer support for all your inquiries.</p>
                    <a
                      href="javascript:void(0);"
                      className="text-blue-600 font-semibold inline-block mt-2 hover:underline"
                    >
                      Learn more
                    </a>

                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-8 fill-blue-600 mb-4 inline-block"
                      viewBox="0 0 682.667 682.667"
                    >
                      <defs>
                        <clipPath id="a" clipPathUnits="userSpaceOnUse">
                          <path d="M0 512h512V0H0Z" data-original="#000000" />
                        </clipPath>
                      </defs>
                      <g
                        fill="none"
                        className="stroke-blue-600"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-miterlimit="10"
                        stroke-width="40"
                        clip-path="url(#a)"
                        transform="matrix(1.33 0 0 -1.33 0 682.667)"
                      >
                        <path
                          d="M256 492 60 410.623v-98.925C60 183.674 137.469 68.38 256 20c118.53 48.38 196 163.674 196 291.698v98.925z"
                          data-original="#000000"
                        />
                        <path
                          d="M178 271.894 233.894 216 334 316.105"
                          data-original="#000000"
                        />
                      </g>
                    </svg>
                    <h3 className="text-xl font-semibold mb-2">Security</h3>
                    <p>
                      Your data is protected by the latest security measures.
                    </p>
                    <a
                      href="javascript:void(0);"
                      className="text-blue-600 font-semibold inline-block mt-2 hover:underline"
                    >
                      Learn more
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-28">
              <div className="md:text-center max-w-2xl mx-auto">
                <h2 className="md:text-4xl text-3xl font-bold mb-6">
                  Best Sellers{" "}
                </h2>
                <p>
                  Discover a range of exclusive features designed to elevate
                  your experience. Learn how our distinct offerings can redefine
                  your journey and empower you to accomplish more.
                </p>
              </div>
              <div className="mt-14">
                <div className="grid md:grid-cols-2 items-center gap-16">
                  <div>
                    <img
                      src="https://readymadeui.com/image-1.webp"
                      className="w-full object-contain rounded-md shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)]"
                    />
                  </div>
                  <div className="max-w-lg">
                    <h3 className="text-xl font-semibold mb-4">
                      Tailored Customization
                    </h3>
                    <p>
                      Experience unparalleled customization options tailored to
                      suit your unique needs. Our platform provides a wide array
                      of features, ensuring you have the flexibility to
                      personalize your journey.
                    </p>
                    <button
                      type="button"
                      className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-5 py-2.5 mt-8 transition-all"
                    >
                      Learn More
                    </button>
                  </div>
                  <div className="max-md:order-1 max-w-lg">
                    <h3 className="text-xl font-semibold mb-4">
                      Optimized Performance
                    </h3>
                    <p>
                      Unlock top-notch performance with our advanced
                      optimization techniques. We prioritize speed, efficiency,
                      and reliability to ensure a seamless experience, no matter
                      the complexity of your tasks.
                    </p>
                    <button
                      type="button"
                      className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-5 py-2.5 mt-8 transition-all"
                    >
                      Learn More
                    </button>
                  </div>
                  <div>
                    <img
                      src="https://readymadeui.com/contact.webp"
                      className="w-full object-contain rounded-md shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)]"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
