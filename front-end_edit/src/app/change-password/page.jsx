"use client";
import { isLogined } from "@/utils/helper";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();
  const handleSubmit = async () => {
    const token = localStorage.getItem("token");

    setError("");
    setSuccess("");

    if (newPassword !== confirmPassword) {
      setError("New password and confirm password do not match");
      return;
    }

    try {
      const response = await fetch(`http://localhost:1337/api/user/me`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          currentPassword: currentPassword || "",
          password: newPassword,
          confirmPassword: confirmPassword || "",
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error.message || "An error occurred");
      } else {
        setSuccess("Password updated successfully");
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
      }
    } catch (error) {
      setError("An error occurred while updating the password");
    }
  };
  useEffect(() => {
    if (!isLogined()) {
      router.replace("/");
    }
  }, []);
  return (
    <div className="flex flex-col justify-center  text-[#333] mt-10 ">
      <div className="relative w-full max-w-md p-6 mx-auto border border-gray-300 rounded-md">
        <div className="w-full h-full p-4 text-3xl font-semibold font-bold text-left text-center text-gray-700 bg-gradient-to-tr f shrink-0 ">
          <span> Change Password</span>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block mb-2 text-sm">Current Password</label>
            <input
              name="currentPassword"
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="w-full px-4 py-3 text-sm bg-white border border-gray-300 rounded-md outline-blue-500"
              placeholder="Enter current password"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm">New Password</label>
            <input
              name="newPassword"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full px-4 py-3 text-sm bg-white border border-gray-300 rounded-md outline-blue-500"
              placeholder="Enter new password"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm">Confirm Password</label>
            <input
              name="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-3 text-sm bg-white border border-gray-300 rounded-md outline-blue-500"
              placeholder="Confirm new password"
            />
          </div>
        </div>
        {error && <p className="mt-4 text-red-500">{error}</p>}
        {success && <p className="mt-4 text-green-500">{success}</p>}
        <div className="!mt-10">
          <button
            onClick={handleSubmit}
            className="w-full px-4 py-3 text-sm font-semibold text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none"
          >
            SAVE CHANGES
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
