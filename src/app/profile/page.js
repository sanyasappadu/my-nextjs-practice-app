"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const router = useRouter();
  const [data, setData] = useState({ username: "", email: "" });

  const handleLogout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("Logout successful");
      router.push("/login");
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  const getUserDetails = async () => {
    try {
      const res = await axios.get("/api/users/me");
      console.log(res.data.data);
      setData({
        username: res.data.data.username,
        email: res.data.data.email,
      });
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  useEffect(() => {
    getUserDetails();
  }, []);

  return (
    <div className="flex items-center justify-center h-screen w-full bg-gray-200 dark:bg-gray-600 text-black dark:text-white">
      <div className="max-w-md w-full border rounded-lg border-gray-300 dark:border-white shadow-md bg-white dark:bg-gray-800 p-6">
        <h1 className="text-xl font-semibold text-center mb-4">
          Profile Details
        </h1>

        <div className="mb-4">
          <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
            <span className="font-semibold">Username:</span> {data.username || "N/A"}
          </p>
        </div>

        <div className="mb-4">
          <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
            <span className="font-semibold">Email:</span> {data.email || "N/A"}
          </p>
        </div>

        <button
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 w-full rounded-md transition duration-300"
          type="button"
          onClick={handleLogout}
        >
          Log Out
        </button>
      </div>
    </div>
  );
}
