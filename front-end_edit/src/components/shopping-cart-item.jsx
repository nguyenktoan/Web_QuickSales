import Link from "next/link";

const ShoppingCartItem = ({
  image,
  brand,
  productName,
  category,
  price,
  amount,
  productPrice,
  productId,
  add,
  remove,
  decrease,
}) => {
  return (
    <div className="p-2 bg-white shadow-[0_3px_20px_-10px_rgba(6,81,237,0.4)] rounded-md relative">
      <div className="grid items-center gap-1 sm:grid-cols-2">
        <div className="w-full h-full p-4 text-center bg-gradient-to-tr f shrink-0 ">
          <img src={image} className="aspect-square w-full lg:max-w-[300px]" />
        </div>

        <div className="p-2">
          <h3 className="text-lg font-bold text-blue-700">{productName} </h3>

          <ul className="pl-4 mt-3 space-y-2 text-sm text-gray-500 list-disc">
            <li>
              Category: <strong className="ml-2">{category}</strong>
            </li>
            <li>
              Brand: <strong className="ml-2">{brand}</strong>
            </li>
            <li>
              Price:{" "}
              <strong className="ml-2">
                {" "}
                {price.toLocaleString("vi-VN", {
                  style: "currency",
                  currency: "VND",
                })}
              </strong>
            </li>
          </ul>

          <div className="flex flex-wrap items-center justify-between gap-4 mt-6">
            <div className="flex items-center gap-3">
              <h4 className="text-sm text-gray-500">Quantity:</h4>
              {/* decrease */}
              <button
                type="button"
                onClick={() => decrease(productId)}
                disabled={amount === 1}
                className={`flex items-center justify-center w-5 h-5 bg-blue-600 rounded-full outline-none ${
                  amount === 1 ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-2 fill-white"
                  viewBox="0 0 124 124"
                >
                  <path
                    d="M112 50H12C5.4 50 0 55.4 0 62s5.4 12 12 12h100c6.6 0 12-5.4 12-12s-5.4-12-12-12z"
                    data-original="#000000"
                  ></path>
                </svg>
              </button>

              <span className="font-bold text-sm leading-[16px]">
                {" "}
                {amount >= 1 ? amount : 1}
              </span>
              {/* add */}
              <button
                type="button"
                onClick={() => {
                  add(productId);
                }}
                className="flex items-center justify-center w-5 h-5 bg-blue-600 rounded-full outline-none"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-2 fill-white"
                  viewBox="0 0 42 42"
                >
                  <path
                    d="M37.059 16H26V4.941C26 2.224 23.718 0 21 0s-5 2.224-5 4.941V16H4.941C2.224 16 0 18.282 0 21s2.224 5 4.941 5H16v11.059C16 39.776 18.282 42 21 42s5-2.224 5-4.941V26h11.059C39.776 26 42 23.718 42 21s-2.224-5-4.941-5z"
                    data-original="#000000"
                  ></path>
                </svg>
              </button>
            </div>

            <div>
              <h4 className="text-lg font-bold text-blue-700">
                {" "}
                {productPrice.toLocaleString("vi-VN", {
                  style: "currency",
                  currency: "VND",
                })}
              </h4>
            </div>
          </div>

          <div className="grid grid-cols-2 mt-6 text-center divide-x border-y">
            <button
              onClick={() => {
                window.location.href = "/products/" + productId;
              }}
              type="button"
              class="bg-transparent hover:bg-gray-100 flex items-center justify-center font-semibold py-3 text-gray-500 text-sm"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-3.5 fill-current mr-3 inline-block"
                viewBox="0 0 128 128"
              >
                <path
                  d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16z"
                  data-original="#000000"
                ></path>
              </svg>
              View details
            </button>

            <button
              type="button"
              onClick={() => remove(productId, -amount)}
              className="flex items-center justify-center py-3 text-sm font-semibold text-gray-500 bg-transparent hover:bg-gray-100"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="inline-block w-3 mr-3 fill-current"
                viewBox="0 0 390 390"
              >
                <path
                  d="M30.391 318.583a30.37 30.37 0 0 1-21.56-7.288c-11.774-11.844-11.774-30.973 0-42.817L266.643 10.665c12.246-11.459 31.462-10.822 42.921 1.424 10.362 11.074 10.966 28.095 1.414 39.875L51.647 311.295a30.366 30.366 0 0 1-21.256 7.288z"
                  data-original="#000000"
                ></path>
                <path
                  d="M287.9 318.583a30.37 30.37 0 0 1-21.257-8.806L8.83 51.963C-2.078 39.225-.595 20.055 12.143 9.146c11.369-9.736 28.136-9.736 39.504 0l259.331 257.813c12.243 11.462 12.876 30.679 1.414 42.922-.456.487-.927.958-1.414 1.414a30.368 30.368 0 0 1-23.078 7.288z"
                  data-original="#000000"
                ></path>
              </svg>
              Remove
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ShoppingCartItem;
