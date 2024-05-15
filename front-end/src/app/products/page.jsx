"use client";
import ProductComponent from "@/components/product-component";
import { callAPI } from "@/utils/api-caller";
import { helper } from "@/utils/api-caller";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

const pageSize = process.env.NEXT_PUBLIC_PAGE_SIZE;
const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const searchParams = useSearchParams();
  const [pageCount, setPageCount] = useState(1);
  const router = useRouter();
  const page =
    searchParams.get("page") !== null ? +searchParams.get("page") : 1;
  useEffect(() => {
    fetchData();
  }, [searchParams]);
  const fetchData = async () => {
    try {
      const res = await callAPI(
        `/products?populate=*&pagination[pageSize]=${pageSize}&pagination[page]=${page}`,
        "GET"
      );
      setProducts(res.data.data);
      setPageCount(res.data.meta.pagination.pageCount);
    } catch (error) {
      console.log(error);
    }
  };
  const prev = () => {
    router.push("/products?page=" + (+page - 1));
  };
  const next = () => {
    router.push("/products?page=" + (+page + 1));
  };
  return (
    <div>
      <div className=" text-3xl font-bold text-left ml-24 mt-5 text-gray-900">
        <span> Products</span>
      </div>
      <section
        style={{ minHeight: "400px" }}
        id="Projects"
        className="w-fit mx-auto grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-14 mt-10 mb-5"
      >
        {products.map((value, index) => {
          console.log(value.attributes.image.data[0].attributes.url);
          return (
            <ProductComponent
              id={value.id}
              key={index}
              productName={value.attributes.name}
              price={value.attributes.price}
              brand={value.attributes.category.data.attributes.name}
              imageUrl={value.attributes.image.data[0].attributes.url}
            />
          );
        })}
      </section>
      <div className="flex justify-center items-center gap-x-1">
        <button
          type="button"
          onClick={prev}
          disabled={page <= 1}
          className="min-h-[38px] min-w-[38px] py-2 px-2.5 inline-flex justify-center items-center gap-x-2 text-sm rounded-lg text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none"
        >
          <svg
            className="flex-shrink-0 size-3.5"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="m15 18-6-6 6-6"></path>
          </svg>
          <span aria-hidden="true" className="sr-only">
            Previous
          </span>
        </button>
        <div className="flex items-center gap-x-1">
          <span className="min-h-[38px] min-w-[38px] flex justify-center items-center border border-gray-200 text-gray-800 py-2 px-3 text-sm rounded-lg focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none">
            {""}
            {page}
          </span>
          <span className="min-h-[38px] flex justify-center items-center text-gray-500 py-2 px-1.5 text-sm">
            of
          </span>
          <span className="min-h-[38px] flex justify-center items-center text-gray-500 py-2 px-1.5 text-sm">
            {""}
            {pageCount}
          </span>
        </div>
        <button
          type="button"
          onClick={next}
          disabled={page >= pageCount}
          className="min-h-[38px] min-w-[38px] py-2 px-2.5 inline-flex justify-center items-center gap-x-2 text-sm rounded-lg text-gray-800 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none"
        >
          <span aria-hidden="true" className="sr-only">
            Next
          </span>
          <svg
            className="flex-shrink-0 size-3.5"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="m9 18 6-6-6-6"></path>
          </svg>
        </button>
      </div>
    </div>
  );
};
export default ProductsPage;
