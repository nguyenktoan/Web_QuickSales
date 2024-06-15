import Link from "next/link";
import { useAppContext } from "./context";
import { callAPI } from "@/utils/api-caller";
import { useState } from "react";
const URL_SERVER = process.env.NEXT_PUBLIC_BACKEND_SERVER_MEDIA;

const ProductComponent = ({
  brand,
  productName,
  price,
  imageUrl,
  id,
  in_stock,
  isBestSeller, // Thêm thuộc tính isBestSeller
}) => {
  const { setShoppingCart } = useAppContext();
  const [showAlert, setShowAlert] = useState(false);

  const addToCart = async (productId) => {
    try {
      const res = await callAPI("/add-to-shopping-cart", "POST", {
        productId,
        amount: 1,
      });
      console.log(res);
      setShoppingCart(res.data);
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 2000);
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  return (
    <div className="relative duration-500 bg-white shadow-md w-72 rounded-xl hover:scale-105 hover:shadow-xl">
      {isBestSeller && ( // Thêm đoạn mã này để hiển thị nhãn Best Seller
        <div className="absolute px-2 py-1 text-xs font-bold text-white bg-red-500 rounded top-2 left-2">
          Best Sellers{" "}
        </div>
      )}
      <Link href={"/products/" + id}>
        <img
          src={URL_SERVER + imageUrl}
          alt="Product"
          className={`object-cover h-80 w-72 rounded-t-xl ${
            in_stock === 0 ? "opacity-50" : ""
          }`}
        />
        {in_stock === 0 && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-xl">
            <div className="px-4 py-2 text-black bg-white rounded-full">
              SOLD OUT
            </div>
          </div>
        )}
      </Link>
      {/* Wishlist */}
      <div className="absolute flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full cursor-pointer top-4 right-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16px"
          className="inline-block fill-gray-800"
          viewBox="0 0 64 64"
        >
          <path
            d="M45.5 4A18.53 18.53 0 0 0 32 9.86 18.5 18.5 0 0 0 0 22.5C0 40.92 29.71 59 31 59.71a2 2 0 0 0 2.06 0C34.29 59 64 40.92 64 22.5A18.52 18.52 0 0 0 45.5 4ZM32 55.64C26.83 52.34 4 36.92 4 22.5a14.5 14.5 0 0 1 26.36-8.33 2 2 0 0 0 3.27 0A14.5 14.5 0 0 1 60 22.5c0 14.41-22.83 29.83-28 33.14Z"
            data-original="#000000"
          ></path>
        </svg>
      </div>
      {/* info product: name, category, brand*/}
      <div className="px-4 py-3 w-72">
        {/* <span className="mr-3 text-xs text-gray-400 uppercase">{category}</span> */}

        <span className="mr-3 text-xs text-gray-400 uppercase">{brand}</span>
        <p className="block text-lg font-bold text-black capitalize truncate">
          {productName}
        </p>
        <div className="flex items-center">
          <p className="my-3 text-lg font-semibold text-black cursor-auto">
            {price.toLocaleString("vi-VN", {
              style: "currency",
              currency: "VND",
            })}
          </p>

          {/* Add to shopping cart */}
          <div className="flex items-center justify-center w-10 h-10 ml-auto bg-gray-100 rounded-full cursor-pointer">
            <button
              onClick={(e) => {
                addToCart(id);
                e.stopPropagation();
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                className="bi bi-bag-plus"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M8 7.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V12a.5.5 0 0 1-1 0v-1.5H6a.5.5 0 0 1 0-1h1.5V8a.5.5 0 0 1 .5-.5z"
                />
                <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      {showAlert && (
        <div
          className="bg-white absolute top-0 w-full shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] text-black flex items-center border-t-4 border-green-500 px-4 py-4 rounded"
          role="alert"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="inline w-5 mr-2 shrink-0 fill-green-500"
            viewBox="0 0 512 512"
          >
            <ellipse cx="256" cy="256" rx="256" ry="255.832" />
            <path
              className="fill-white"
              d="m235.472 392.08-121.04-94.296 34.416-44.168 74.328 57.904 122.672-177.016 46.032 31.888z"
            />
          </svg>
          <span className="block text-sm font-semibold sm:inline">
            Item has been added to your shopping cart!
          </span>
        </div>
      )}
    </div>
  );
};

export default ProductComponent;
