"use client";
import { useEffect, useState } from "react";
import { callAPI } from "@/utils/api-caller";
import { useSearchParams } from "next/navigation";
import ProductComponent from "@/components/product-component";
import { useRouter } from "next/navigation";
import { setUser } from "@/utils/helper";
import axios from "axios";
const ProfilePage = () => {
  const [user, setUser] = useState({});
  const router = useRouter(); // Khai báo useRouter

  useEffect(() => {
    const token = localStorage.getItem("token");

    const getProfileData = async () => {
      try {
        if (!token) {
          router.push("/login");
          return;
        }
        const { data } = await axios.get(`http://localhost:1337/api/users/me`, {
          headers: {
            Authorization: `Bearer  ${token}`,
          },
        });
        setUser(data);
      } catch (error) {
        console.log(error);
      }
    };
    getProfileData();
  }, []);
  return (
    <div className="flex  ">
      <div className=" flex-col items-center min-w-40 max-h-full flex justify-center border border-yellow-500 border-solid mx-5 m-auto">
        <div className="mt-5 relative w-20 h-20 overflow-hidden bg-gray-100 rounded-full mx-auto mb-4">
          <svg
            className="absolute top-0 left-0 w-full h-full text-gray-400"
            fill="currentColor"
            viewBox="0 0 20 15"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
              clipRule="evenodd"
            ></path>
          </svg>
        </div>
        <button
          type="button"
          class="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
        >
          Upload
        </button>
      </div>

      {/* Đối tượng trong code phía trước chiếm 2/3 diện tích */}
      <div className="container w-2/3 px-6 mt-5 max-h-full">
        <form className="space-y-6 px-4 max-w-sm mx-auto font-[sans-serif]">
          <div className="flex items-center">
            <label className="text-gray-400 w-36 text-sm">Name</label>
            <input
              type="text"
              placeholder={user.name}
              className="px-2 py-2 text-black w-full border-b-2 focus:border-[#333] outline-none text-sm bg-white"
            />
          </div>
          <div className="flex items-center">
            <label className="text-gray-400 w-36 text-sm">Email</label>
            <input
              type="email"
              placeholder={user.email}
              className="px-2 py-2 w-full border-b-2 focus:border-[#333] outline-none text-sm bg-white"
            />
          </div>
          <div className="flex items-center">
            <label className="text-gray-400 w-36 text-sm">Phone No.</label>
            <input
              type="number"
              placeholder={user.phone}
              className="px-2 py-2 w-full border-b-2 focus:border-[#333] outline-none text-sm bg-white"
            />
          </div>
          <div className="flex items-center">
            <label className="text-gray-400 w-36 text-sm">State</label>
            <input
              type="text"
              placeholder="Enter your state"
              className="px-2 py-2 w-full border-b-2 focus:border-[#333] outline-none text-sm bg-white"
            />
          </div>
          <button
            type="button"
            className="px-6 py-2 w-full bg-[#333] text-sm text-white hover:bg-[#444] mx-auto block"
          >
            Submit
          </button>
        </form>
      </div>
      {/* Đối tượng trong code phía sau */}
    </div>
  );
};

export default ProfilePage;
