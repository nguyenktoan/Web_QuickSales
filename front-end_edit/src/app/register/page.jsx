/* eslint-disable @next/next/no-img-element */
"use client";
import { callAPI } from "@/utils/api-caller";
import { isLogined } from "@/utils/helper";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
const RegisterPage = () => {
  const [errorText, setErrorText] = useState({
    general: "",
    email: "",
    password: "",
    cpassword: "",
    terms: "",
  });

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    cpassword: "",
    username: "",
    name: "",
    termsAccepted: false,
  });
  const router = useRouter();
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const onSignUpClick = async () => {
    if (
      !formData.email ||
      !formData.password ||
      !formData.cpassword ||
      !formData.username ||
      !formData.name
    ) {
      setErrorText({ ...errorText, general: "All fields are required" });
      return;
    }

    if (formData.password.length < 6) {
      setErrorText({
        ...errorText,
        password: "Password must be at least 6 characters long",
      });
      return;
    }

    if (formData.password !== formData.cpassword) {
      setErrorText({ ...errorText, general: "Passwords do not match" });
      return;
    }

    if (!formData.termsAccepted) {
      setErrorText({
        ...errorText,
        terms: "You must accept the Terms and Conditions",
      });
      return;
    }

    try {
      const data = {
        username: formData.username,
        email: formData.email,
        password: formData.password,
        cpassword: formData.cpassword,
        name: formData.name,
        shoppingcart: [],
      };
      const res = await callAPI("/auth/local/register", "POST", data);
      console.log("User profile", res.data.user);
      console.log("User token", res.data.jwt);
      router.replace("/login");
    } catch (error) {
      if (error.response) {
        // Log chi tiết lỗi từ phản hồi máy chủ
        console.log("Error details:", error.response.data);
        // Hiển thị thông báo lỗi cụ thể
        setErrorText({
          ...errorText,
          general: error.response.data.error.message,
        });
      } else {
        // Log lỗi chung
        console.log("Error:", error.message);
        setErrorText({
          ...errorText,
          general: "Error occurred during registration",
        });
      }
    }
  };
  useEffect(() => {
    if (isLogined()) {
      router.replace("/");
    }
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const inputValue = type === "checkbox" ? checked : value;
    setFormData({ ...formData, [name]: inputValue });

    if (name === "email" && value && !isValidEmail(value)) {
      setErrorText({ ...errorText, email: "Invalid email format" });
    } else if (name === "password" && value && value.length < 6) {
      setErrorText({
        ...errorText,
        password: "Password must be at least 6 characters long",
      });
    } else if (name === "cpassword" && value && value !== formData.password) {
      setErrorText({ ...errorText, cpassword: "Passwords do not match" });
    } else {
      setErrorText({ ...errorText, [name]: "" }); // Clear error message if the current input is valid
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;

    if (name === "email" && value && !isValidEmail(value)) {
      setErrorText({ ...errorText, email: "Invalid email format" });
    } else if (name === "password" && value && value.length < 6) {
      setErrorText({
        ...errorText,
        password: "Password must be at least 6 characters long",
      });
    } else if (name === "cpassword" && value && value !== formData.password) {
      setErrorText({ ...errorText, cpassword: "Passwords do not match" });
    }
  };

  return (
    <div className="flex flex-col justify-center font-[sans-serif] text-[#333] p-4">
      <div className="max-w-md w-full mx-auto shadow-[0_2px_10px_-3px_rgba(6,81,237,0.5)] p-8 relative mt-12">
        <div className="bg-white w-20 h-20 border-[8px] p-1.5 absolute left-0 right-0 mx-auto -top-10 rounded-full overflow-hidden">
          <a href="javascript:void(0)">
            <img
              src="/logo-res.png"
              alt="logo"
              className="inline-block w-full"
            />
          </a>
        </div>

        <form className="mt-8" onSubmit={(e) => e.preventDefault()}>
          <h3 className="mb-8 text-xl font-bold text-center text-gray-800">
            Create free account
          </h3>
          <div className="space-y-4">
            <input
              name="name"
              type="text"
              className="w-full px-4 py-4 text-sm transition-all bg-gray-100 focus:bg-transparent outline-orange-300"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <input
              name="username"
              type="text"
              className="w-full px-4 py-4 text-sm transition-all bg-gray-100 focus:bg-transparent outline-orange-300"
              placeholder="Enter username"
              value={formData.username}
              onChange={handleChange}
              required
            />
            {/* Email */}
            <div>
              <input
                name="email"
                type="text"
                className={`w-full px-4 py-4 text-sm transition-all bg-gray-100 focus:bg-transparent outline-orange-300 ${
                  errorText.email && "border-red-500"
                }`}
                placeholder="Enter email"
                value={formData.email}
                onChange={handleChange}
                onBlur={handleBlur}
                required
              />
              {errorText.email && (
                <p className="mt-1 text-sm text-red-500">{errorText.email}</p>
              )}
            </div>
            {/* Password */}
            <div>
              <input
                name="password"
                type="password"
                className={`w-full px-4 py-4 text-sm transition-all bg-gray-100 focus:bg-transparent outline-orange-300 ${
                  errorText.password && "border-red-500"
                }`}
                placeholder="Enter password"
                value={formData.password}
                onChange={handleChange}
                onBlur={handleBlur}
                required
              />
              {errorText.password && (
                <p className="mt-1 text-sm text-red-500">
                  {errorText.password}
                </p>
              )}
            </div>
            {/* Confirm Password */}
            <div>
              <input
                name="cpassword"
                type="password"
                className={`w-full px-4 py-4 text-sm transition-all bg-gray-100 focus:bg-transparent outline-orange-300 ${
                  errorText.cpassword && "border-red-500"
                }`}
                placeholder="Enter confirm password"
                value={formData.cpassword}
                onChange={handleChange}
                onBlur={handleBlur}
                required
              />
              {errorText.cpassword && (
                <p className="mt-1 text-sm text-red-500">
                  {errorText.cpassword}
                </p>
              )}
            </div>
            <div className="flex items-center">
              <input
                id="termsAccepted"
                name="termsAccepted"
                type="checkbox"
                className="w-4 h-4 border-gray-300 rounded shrink-0"
                checked={formData.termsAccepted}
                onChange={handleChange}
              />
              <label htmlFor="termsAccepted" className="block ml-3 text-sm">
                I accept the{" "}
                <a
                  href="javascript:void(0);"
                  className="text-[#54b09f] font-semibold hover:underline ml-1"
                >
                  Terms and Conditions
                </a>
              </label>
            </div>
            {/* Display terms error message if any */}
            {errorText.terms && (
              <p className="mt-4 text-sm text-center text-red-500">
                {errorText.terms}
              </p>
            )}
          </div>
          {/* Display general error message if any */}
          {errorText.general && (
            <p className="mt-4 text-sm text-center text-red-500">
              {errorText.general}
            </p>
          )}
          {/* SignUp Button */}
          <div className="mt-8">
            <button
              type="button"
              onClick={onSignUpClick}
              className="w-full py-4 px-4 text-sm font-semibold text-white bg-[#54b09f] hover:bg-[#428f81] focus:outline-none"
            >
              Create an account
            </button>
          </div>

          <p className="mt-8 text-sm text-center">
            Already have an account?{" "}
            <a
              href="/login"
              className="text-[#54b09f] font-semibold hover:underline ml-1"
            >
              Login here
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
