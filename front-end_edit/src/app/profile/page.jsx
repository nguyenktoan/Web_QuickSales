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
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [showModal, setShowModal] = useState(false); // State to manage modal visibility
  const router = useRouter();

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
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(data);
        setName(data.name);
        setEmail(data.email);
        setPhone(data.phone);
      } catch (error) {
        console.log(error);
      }
    };
    getProfileData();
  }, [router]);

  const handleUpdate = async () => {
    const token = localStorage.getItem("token");
    try {
      await axios.put(
        `http://localhost:1337/api/users/me`,
        { name, email, phone },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // Fetch updated profile data
      const { data } = await axios.get(`http://localhost:1337/api/users/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUser(data);
      setName(data.name);
      setEmail(data.email);
      setPhone(data.phone);
      setShowModal(true); // Show modal on successful update
    } catch (error) {
      console.log(error);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false); // Hide modal
  };

  return (
    <div className="font-[sans-serif]">
      <div className="w-full bg-gradient-to-r from-[#369f8b] to-[#81c4b8] h-28"></div>
      <div className="px-4 mb-6 -mt-14">
        <div className="relative max-w-6xl px-6 py-8 mx-auto bg-white rounded shadow-lg">
          <h2 className="text-xl text-[#333] font-bold">My Profile</h2>
          <span className="text-gray-500">Manage and protect your account</span>

          <form className="grid gap-3 mt-6 sm:grid-cols-1">
            {/* Username */}
            <div>
              <input
                type="text"
                id="disabled-input"
                placeholder={user.username}
                value={user.username}
                disabled
                className="w-full rounded py-2.5 px-4 border-2 text-sm outline-[#007bff] cursor-not-allowed"
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded py-2.5 px-4 border-2 text-sm outline-[#007bff]"
              />
            </div>

            <div>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded py-2.5 px-4 border-2 text-sm outline-[#007bff]"
              />
            </div>
            <div>
              <input
                type="number"
                placeholder="Phone No."
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full rounded py-2.5 px-4 border-2 text-sm outline-[#007bff]"
              />
            </div>
            <button
              type="button"
              className="text-white w-max bg-[#81c4b8] hover:bg-[#369f8b] font-semibold rounded text-sm px-6 py-3"
              onClick={handleUpdate}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16px"
                height="16px"
                fill="#fff"
                className="inline mr-2"
                viewBox="0 0 548.244 548.244"
              >
                <path
                  fillRule="evenodd"
                  d="M392.19 156.054 211.268 281.667 22.032 218.58C8.823 214.168-.076 201.775 0 187.852c.077-13.923 9.078-26.24 22.338-30.498L506.15 1.549c11.5-3.697 24.123-.663 32.666 7.88 8.542 8.543 11.577 21.165 7.879 32.666L390.89 525.906c-4.258 13.26-16.575 22.261-30.498 22.338-13.923.076-26.316-8.823-30.728-22.032l-63.393-190.153z"
                  clipRule="evenodd"
                  data-original="#000000"
                />
              </svg>
              Update
            </button>
          </form>
        </div>
      </div>
      {showModal && (
        <div className="fixed inset-0 px-4 flex flex-wrap justify-center items-center w-full h-full z-[1000] before:fixed before:inset-0 before:w-full before:h-full before:bg-[rgba(0,0,0,0.5)] overflow-auto font-[sans-serif]">
          <div className="relative w-full max-w-md px-5 py-10 mx-auto text-center bg-white rounded-md shadow-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="absolute top-0 w-24 h-24 -translate-x-1/2 -translate-y-1/2 fill-green-500 left-1/2"
              viewBox="0 0 60 60"
            >
              <circle cx="30" cy="30" r="29" className="success-circle" />
              <path
                className="success-check-mark"
                fill="none"
                stroke="#fff"
                strokeWidth="3"
                strokeLinecap="round"
                d="m24.262 42.07-6.8-6.642a1.534 1.534 0 0 1 0-2.2l2.255-2.2a1.621 1.621 0 0 1 2.256 0l4.048 3.957 11.353-17.26a1.617 1.617 0 0 1 2.2-.468l2.684 1.686a1.537 1.537 0 0 1 .479 2.154L29.294 41.541a3.3 3.3 0 0 1-5.032.529z"
              />
            </svg>

            <div className="mt-8">
              <h3 className="flex-1 text-2xl font-semibold">Great!</h3>
              <p className="mt-2 text-sm text-gray-500">
                Your profile update was successful!
              </p>
              <div className="relative mt-8">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-6 py-2.5 mt-4 w-full rounded text-white text-sm font-semibold border-none outline-none bg-green-500 hover:bg-green-600"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
