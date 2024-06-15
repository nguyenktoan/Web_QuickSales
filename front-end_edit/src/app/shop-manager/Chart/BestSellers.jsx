import React from "react";

const URL_SERVER = process.env.NEXT_PUBLIC_BACKEND_SERVER_MEDIA;

const BestSellers = ({
  index,
  productName,
  price,
  imageUrl,
  in_stock,
  amount,
}) => {
  // Kiểm tra nếu amount là null thì gán bằng 0
  const displayInStock = in_stock !== null ? in_stock : 0;

  return (
    <tr>
      <td className="p-4 text-sm">
        <div className="flex items-center cursor-pointer">
          <input
            id={`checkbox${index}`}
            type="checkbox"
            className="hidden peer"
          />
          <span className="mr-2 text-gray-500">{index + 1}.</span>{" "}
          {/* Hiển thị số thứ tự */}
          <img
            src={URL_SERVER + imageUrl}
            alt={productName}
            className="w-10 h-10 p-1.5 shrink-0 bg-gray-100"
          />
          <div className="mx-4">
            <p className="text-sm text-black">{productName}</p>
          </div>
        </div>
      </td>
      <td className="p-4 text-sm">
        {price.toLocaleString("vi-VN", {
          style: "currency",
          currency: "VND",
        })}
      </td>
      <td className="p-4 text-sm">{displayInStock}</td>
      <td className="p-4 text-sm">{amount}</td>
    </tr>
  );
};

export default BestSellers;
