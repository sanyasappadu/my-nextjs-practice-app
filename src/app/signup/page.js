"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function SignupPage() {
    const router = useRouter();
    const [user, setUser] = useState({
        email: "",
        password: "",
        username: "",
    });
    const [buttonDisabled, setButtonDisabled] = useState(true);
    const [loading, setLoading] = useState(false);

    const onSignup = async () => {
        try {
            setLoading(true);
            console.log("user", user);
            const response = await axios.post("/api/users/register", user);
            console.log("Signup success", response.data);
            toast.success("Signup successful!");
            router.push("/login");
        } catch (error) {
            console.log("Signup failed", error.message);
            toast.error(error.response?.data?.error || error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (user.email.length > 0 && user.password.length > 0 && user.username.length > 0) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [user]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="text-2xl font-bold mb-4">{loading ? "Processing..." : "Signup"}</h1>
            <hr className="mb-4 w-full max-w-md" />
            <label htmlFor="username" className="self-start max-w-md w-full">Username</label>
            <input 
                className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black max-w-md w-full"
                id="username"
                type="text"
                value={user.username}
                onChange={(e) => setUser({...user, username: e.target.value})}
                placeholder="Username"
            />
            <label htmlFor="email" className="self-start max-w-md w-full">Email</label>
            <input 
                className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black max-w-md w-full"
                id="email"
                type="email"
                value={user.email}
                onChange={(e) => setUser({...user, email: e.target.value})}
                placeholder="Email"
            />
            <label htmlFor="password" className="self-start max-w-md w-full">Password</label>
            <input 
                className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black max-w-md w-full"
                id="password"
                type="password"
                value={user.password}
                onChange={(e) => setUser({...user, password: e.target.value})}
                placeholder="Password"
            />
            <button
                onClick={onSignup}
                disabled={buttonDisabled}
                className={`p-2 border rounded-lg mb-4 focus:outline-none max-w-md w-full ${buttonDisabled ? "border-gray-300 bg-gray-100 text-gray-500 cursor-not-allowed" : "border-gray-300 bg-blue-500 text-white hover:bg-blue-600"}`}
            >
                {buttonDisabled ? "No signup" : "Signup"}
            </button>
            <Link href="/login" className="text-blue-500 hover:underline">Visit login page</Link>
        </div>
    );
}
