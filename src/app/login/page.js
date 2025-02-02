"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function LoginPage() {
  const router = useRouter();
  const [user, setUser] = React.useState({
    email: "",
    password: "",
  });
  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const onLogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", user);
      console.log("Login success", response.data);
      toast.success("Login success");
      router.push("/profile");
    } catch (error) {
      console.log("Login failed", error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 text-black flex flex-col dark:text-white bg-gray-200 dark:bg-gray-600 h-screen w-full flex">
      <div className=" max-w-md m-auto border rounded-lg  border-gray-300 dark:border-white shadow-sm">
        <div className="bg-gray-300 dark:bg-gray-700 max-w-md p-6 rounded-lg flex ">
          <h1 className="justify-center">{loading ? "Processing" : "Login"}</h1>
        </div>
        <div className=" flex flex-col p-6 ">
          <div className="flex flex-row ">
            <label
              htmlFor="email"
              class="block mb-2 w-full text-sm font-medium mt-3"
            >
              Email
            </label>
            <input
              className="p-2 border border-gray-300 rounded-lg mb-4 mx-2 focus:outline-none focus:border-gray-600 text-black"
              id="email"
              type="text"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              placeholder="email"
            />
          </div>
          <div className="flex flex-row ">
            <label
              htmlFor="password"
              className="block mb-2 w-full text-sm font-medium mt-3"
            >
              Password
            </label>
            <input
              className="p-2 border border-gray-300 rounded-lg mb-4 mx-2 focus:outline-none focus:border-gray-600 text-black"
              id="password"
              type="password"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              placeholder="password"
            />
          </div>
          <div className="flex flex-row ">
            <button
              onClick={onLogin}
              className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
            >
              Login here
            </button>
            <Link href="/signup" className="m-2">
              Visit Signup page
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
