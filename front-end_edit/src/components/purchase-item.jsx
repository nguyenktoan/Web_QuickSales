const URL_SERVER = process.env.NEXT_PUBLIC_BACKEND_SERVER_MEDIA;
import { format, addDays } from "date-fns";

const PurchaseItem = ({ date, orderId, products, totalPrice }) => {
  const dateP = format(new Date(date), "HH:mm:ss dd/MM/yyyy");
  const deliveryDate = addDays(new Date(date), 5);
  const formattedDeliveryDate = format(deliveryDate, "dd/MM/yyyy");
  return (
    <section className="relative py-2">
      <div className="w-full px-4 mx-auto max-w-7xl md:px-5 lg-6">
        <div className="max-w-xl pt-6 border border-gray-200 main-box rounded-xl max-lg:mx-auto lg:max-w-full">
          <div className="flex flex-col justify-between px-6 pb-6 border-b border-gray-200 lg:flex-row lg:items-center">
            <div className="data">
              <p className="text-base font-semibold leading-7 text-black">
                Order Id:{" "}
                <span className="font-medium text-indigo-600">#{orderId}</span>
              </p>
              <p className="mt-4 text-base font-semibold leading-7 text-black">
                Order Payment :{" "}
                <span className="font-medium text-gray-400"> {dateP}</span>
              </p>
            </div>
          </div>

          {products.map((product, index) => {
            return (
              <div
                className="w-full px-3 min-[400px]:px-6"
                key={index + product.name}
              >
                <div className="flex flex-col items-center w-full gap-6 py-6 border-b border-gray-200 lg:flex-row">
                  <div className="img-box max-lg:w-full">
                    <img
                      src={URL_SERVER + product.image[0].url}
                      className="aspect-square w-full lg:max-w-[140px]"
                    />
                  </div>
                  <div className="flex flex-row items-center w-full ">
                    <div className="grid w-full grid-cols-1 lg:grid-cols-2">
                      <div className="flex items-center">
                        <div className="">
                          <h2 className="mb-3 text-xl font-semibold leading-8 text-black">
                            {product.name} {/* Use the product name */}
                          </h2>
                          <p className="mb-3 text-lg font-normal leading-8 text-gray-500 ">
                            By: {product.brand} {/* Use the product brand */}
                          </p>

                          <div className="flex items-center ">
                            <p className="pr-4 mr-4 text-base font-medium leading-7 text-black border-r border-gray-200">
                              Size:{" "}
                              <span className="text-gray-500">
                                {product.size}
                              </span>{" "}
                              {/* Add product size if available */}
                            </p>
                            <p className="text-base font-medium leading-7 text-black ">
                              Qty:{" "}
                              <span className="text-gray-500">
                                {product.amount}
                              </span>{" "}
                              {/* Use the product quantity */}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="grid grid-cols-5">
                        <div className="flex items-center col-span-5 lg:col-span-1 max-lg:mt-3">
                          <div className="flex gap-3 lg:block">
                            <p className="text-sm font-medium leading-7 text-black">
                              Unit Price
                            </p>
                            <p className="text-sm font-medium leading-7 text-indigo-600 lg:mt-4">
                              {product.price.toLocaleString("vi-VN", {
                                style: "currency",
                                currency: "VND",
                              })}{" "}
                            </p>
                          </div>
                        </div>
                        <div class="col-span-5 lg:col-span-2 flex items-center max-lg:mt-3 ">
                          <div class="flex gap-3 lg:block">
                            <p class="font-medium text-sm leading-7 text-black">
                              Status
                            </p>
                            <p class="font-medium text-sm leading-6 whitespace-nowrap py-0.5 px-3 rounded-full lg:mt-3 bg-emerald-50 text-emerald-600">
                              Ready for Delivery
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center col-span-5 lg:col-span-2 max-lg:mt-3">
                          <div className="flex gap-3 lg:block">
                            <p className="text-sm font-medium leading-6 text-black whitespace-nowrap">
                              Expected Delivery Time
                            </p>
                            <p className="text-base font-medium leading-7 whitespace-nowrap lg:mt-3 text-emerald-500">
                              {formattedDeliveryDate}{" "}
                              {/* Replace this with dynamic data if available */}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          <div className="flex flex-col items-center justify-between w-full px-6 border-t border-gray-200 lg:flex-row">
            <div className="flex-grow"></div>{" "}
            {/* Tạo ra một phần trống để căn phải */}
            <p className="py-6 text-lg font-semibold text-black">
              Total Price:{" "}
              <span className="text-indigo-600">
                {totalPrice.toLocaleString("vi-VN", {
                  style: "currency",
                  currency: "VND",
                })}{" "}
              </span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
export default PurchaseItem;
