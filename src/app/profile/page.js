"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
// import React, {useState} from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
// import { useAuth } from '../context/AuthContext';

export default function ProfilePage() {
  const router = useRouter();
  // const { logout } = useAuth();

  const [data, setData] = useState("nothing");
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
    const res = await axios.get("/api/users/me");
    console.log(res.data);
    setData(res.data.data._id);
  };
  const [todos, setTodos] = useState([]);

  useEffect(() => {}, []);

  return (
    <div className="bg-gray-100 dark:bg-gray-500 h-screen text-black dark:text-white ">
      <h1>hii</h1>
      <button onClick={handleLogout}>logout</button>
    </div>
  );
}
