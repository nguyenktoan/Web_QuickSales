"use client";
import ProductComponent from "@/components/product-component";
import { callAPI } from "@/utils/api-caller";
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
      <h1 className="text-3xl font-bold text-left ml-10 mt-5  text-gray-900">
        Products
      </h1>
      <section
        id="Projects"
        className="w-fit mx-auto grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-14 mt-10 mb-5"
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
      {/* <div className="flex flex-col items-center">
        <div className="inline-flex mt-2 xs:mt-0">
          <button
            disabled={+page <= 1}
            onClick={() => prev()}
            className={`flex items-center justify-center px-3 h-8 text-sm font-medium text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 ${
              page === 1
                ? "pointer-events-none opacity-50"
                : "hover:bg-blue-600 hover:text-white hover:rounded-xl"
            }`}
          >
            <svg
              className="w-3.5 h-3.5 me-2 rtl:rotate-180"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 10"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M13 5H1m0 0 4 4M1 5l4-4"
              />
            </svg>
            Prev
          </button>
          <span className="ml-5 mr-5 font-bold">
            {" "}
            {page}/ {pageCount}
          </span>
          <button
            disabled={+page >= +pageCount}
            onClick={() => next()}
            className={`flex items-center justify-center px-3 h-8 text-sm font-medium text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 ${
              page >= pageCount
                ? "pointer-events-none opacity-50"
                : "hover:bg-blue-600 hover:text-white hover:rounded-xl"
            }`}
          >
            Next
            <svg
              className="w-3.5 h-3.5 ms-2 rtl:rotate-180"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 10"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M1 5h12m0 0L9 1m4 4L9 9"
              />
            </svg>
          </button>
        </div>
      </div> */}
    </div>
  );
};
export default ProductsPage;
