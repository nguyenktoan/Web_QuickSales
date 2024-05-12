"use client";
import { callAPI } from "@/utils/api-caller";
import { setToken, setUser } from "@/utils/helper";
import { useRouter } from "next/navigation";
import { useState } from "react";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    cpassword: "",
    username: "",
  });
  const router = useRouter();
  const [successText, setSuccessText] = useState("");
  const [errorText, setErrorText] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const onSignUpClick = async () => {
    const { firstName, lastName, email, phone, password, cpassword } = formData;
    // Tạo username
    function generateUsername(user) {
      const randomNumber = Math.floor(10000 + Math.random() * 90000); // Số ngẫu nhiên từ 10000 đến 99999
      return user + randomNumber.toString().substring(1); // Chuyển số thành chuỗi và lấy 4 chữ số cuối cùng
    }
    const user = "user";
    const username = generateUsername(user);
    console.log("Generated username:", username);
    // Gán giá trị mới cho formData
    setFormData({ ...formData, username: username });

    console.table({
      "First Name": formData.firstName,
      "Last Name": formData.lastName,
      Email: formData.email,
      Phone: formData.phone,
      Password: formData.password,
      "Confirm Password": formData.cpassword,
      Username: username, // Sử dụng giá trị mới của username
    });

    try {
      if (password !== cpassword) {
        setErrorText("Mật khẩu và mật khẩu xác nhận phải giống nhau.");
        return;
      }
      const data = {
        firstName,
        lastName,
        email,
        phone,
        password,
        cpassword,
        username,
      };
      const res = await callAPI("/auth/local/register", "POST", data);

      if (res.ok) {
        router.replace("/login");
        setSuccessText("Đăng ký thành công");
      } else {
        // Registration failed, handle the error response
        const errorData = await res.json();
        setErrorText("Đăng ký thất bại: " + errorData.message);
        console.error("Registration failed:", errorData.message);
      }
    } catch (error) {
      // Handle other errors, e.g., network errors
      setErrorText("Đã xảy ra lỗi khi đăng ký.");
      console.error("Error registering:", error);
    }
  };
  return (
    <div className="max-w-4xl mx-auto font-[sans-serif] text-[#333] p-6">
      <div className="text-center mb-16">
        <a href="javascript:void(0)">
          <img src="/logoH.png" alt="logo" className="w-52 inline-block" />
        </a>
        <h4 className="text-base font-semibold mt-3">
          Sign up into your account
        </h4>
      </div>
      <form>
        <div className="grid sm:grid-cols-2 gap-y-7 gap-x-12">
          <div>
            <label className="text-sm mb-2 block">First Name</label>
            <input
              name="firstName"
              type="text"
              value={formData.firstName}
              onChange={handleChange}
              className="bg-gray-100 w-full text-sm px-4 py-3.5 rounded-md outline-blue-500"
              placeholder="Enter name"
            />
          </div>
          <div>
            <label className="text-sm mb-2 block">Last Name</label>
            <input
              name="lastName"
              type="text"
              value={formData.lastName}
              onChange={handleChange} //
              className="bg-gray-100 w-full text-sm px-4 py-3.5 rounded-md outline-blue-500"
              placeholder="Enter last name"
            />
          </div>
          <div>
            <label className="text-sm mb-2 block">Email Id</label>
            <input
              name="email"
              type="text"
              value={formData.email}
              onChange={handleChange}
              className="bg-gray-100 w-full text-sm px-4 py-3.5 rounded-md outline-blue-500"
              placeholder="Enter email"
            />
          </div>
          <div>
            <label className="text-sm mb-2 block">Mobile No.</label>
            <input
              name="phone"
              type="number"
              value={formData.phone}
              onChange={handleChange}
              pattern="[0-9]*"
              className="bg-gray-100 w-full text-sm px-4 py-3.5 rounded-md outline-blue-500"
              placeholder="Enter mobile number"
            />
          </div>
          <div>
            <label className="text-sm mb-2 block">Password</label>
            <input
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              className="bg-gray-100 w-full text-sm px-4 py-3.5 rounded-md outline-blue-500"
              placeholder="Enter password"
            />
          </div>
          <div>
            <label className="text-sm mb-2 block">Confirm Password</label>
            <input
              name="cpassword"
              type="password"
              value={formData.cpassword}
              onChange={handleChange}
              className="bg-gray-100 w-full text-sm px-4 py-3.5 rounded-md outline-blue-500"
              placeholder="Enter confirm password"
            />
          </div>
        </div>
        {successText && <p className="text-green-500 mt-3">{successText}</p>}
        {errorText && <p className="text-red-500 mt-5 ">{errorText}</p>}
        <div className="!mt-10">
          <button
            type="button"
            onClick={onSignUpClick}
            className="min-w-[150px] py-3 px-4 text-sm font-semibold rounded text-white bg-blue-500 hover:bg-blue-600 focus:outline-none"
          >
            Sign up
          </button>
        </div>
      </form>
    </div>
  );
};
export default RegisterPage;
