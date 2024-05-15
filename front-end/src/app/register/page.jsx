/* eslint-disable @next/next/no-img-element */
"use client";
import { callAPI } from "@/utils/api-caller";
import { setToken, setUser } from "@/utils/helper";
import { useRouter } from "next/navigation";
import { useState } from "react";

const RegisterPage = () => {
  const [errorText, setErrorText] = useState("");

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    cpassword: "",
    username: "",
    name: "",
  });
  const router = useRouter();

  const onSignUpClick = async () => {
    console.table({
      Email: formData.email,
      Password: formData.password,
      "Confirm Password": formData.cpassword,
      Username: formData.username,
      Name: formData.name,
    });
    try {
      const data = {
        username: formData.username,
        email: formData.email,
        password: formData.password,
        cpassword: formData.cpassword,
        Name: formData.name,
      };
      const res = await callAPI("/auth/local/register", "POST", data);
      console.log("User profile", res.data.user);
      console.log("User token", res.data.jwt);
      router.replace("/login");
    } catch (error) {
      console.log(error);
      setErrorText("Error occurred during registration");
    }
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  return (
    <div className="flex flex-col justify-center font-[sans-serif] text-[#333] p-4">
      <div className="max-w-md w-full mx-auto shadow-[0_2px_10px_-3px_rgba(6,81,237,0.5)] p-8 relative mt-12">
        <div className="bg-white w-20 h-20 border-[8px] p-1.5 absolute left-0 right-0 mx-auto -top-10 rounded-full overflow-hidden">
          <a href="javascript:void(0)">
            <img src="/logoH.png" alt="logo" className="w-full inline-block" />
          </a>
        </div>
        <form className="mt-12">
          <h3 className="text-xl font-bold text-gray-300 mb-8 text-center">
            Create free account
          </h3>
          <div className="space-y-4">
            <input
              name="name"
              type="text"
              className="bg-gray-100 w-full text-sm px-4 py-4 focus:bg-transparent outline-orange-300 transition-all"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <input
              name="username"
              type="text"
              className="bg-gray-100 w-full text-sm px-4 py-4 focus:bg-transparent outline-orange-300 transition-all"
              placeholder="Enter username"
              value={formData.username}
              onChange={handleChange}
              required
            />
            {/* email */}
            <input
              name="email"
              type="text"
              className="bg-gray-100 w-full text-sm px-4 py-4 focus:bg-transparent outline-orange-300 transition-all"
              placeholder="Enter email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <input
              name="password"
              type="password"
              className="bg-gray-100 w-full text-sm px-4 py-4 focus:bg-transparent outline-orange-300 transition-all"
              placeholder="Enter password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <input
              name="cpassword"
              type="password"
              className="bg-gray-100 w-full text-sm px-4 py-4 focus:bg-transparent outline-orange-300 transition-all"
              placeholder="Enter confirm password"
              value={formData.cpassword}
              onChange={handleChange}
              required
            />
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 shrink-0 border-gray-300 rounded"
              />
              <label for="remember-me" className="ml-3 block text-sm">
                I accept the{" "}
                <a
                  href="javascript:void(0);"
                  className="text-[#54b09f] font-semibold hover:underline ml-1"
                >
                  Terms and Conditions
                </a>
              </label>
            </div>
          </div>
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

          <p className="text-sm mt-8 text-center">
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
