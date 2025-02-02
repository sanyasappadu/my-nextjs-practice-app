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
        <div className="flex flex-col items-center justify-center min-h-screen py-2 text-black dark:text-white bg-gray-200 dark:bg-gray-600 h-screen w-full">
            <div className="max-w-md m-auto border rounded-lg border-gray-300 dark:border-white shadow-md">
                <div className="bg-gray-300 dark:bg-gray-700 p-6 rounded-t-lg text-center">
                    <h1 className="text-xl font-semibold">{loading ? "Processing..." : "Signup"}</h1>
                </div>

                <div className="p-6">
                    <div className="mb-4 flex flex-row">
                        <label htmlFor="username" className="block text-sm m-2 font-medium">Username</label>
                        <input 
                            className="p-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:border-gray-600 text-black"
                            id="username"
                            type="text"
                            value={user.username}
                            onChange={(e) => setUser({ ...user, username: e.target.value })}
                            placeholder="Username"
                        />
                    </div>

                    <div className="mb-4 flex flex-row">
                        <label htmlFor="email" className="block text-sm m-2 font-medium">Email</label>
                        <input 
                            className="p-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:border-gray-600 text-black"
                            id="email"
                            type="email"
                            value={user.email}
                            onChange={(e) => setUser({ ...user, email: e.target.value })}
                            placeholder="Email"
                        />
                    </div>

                    <div className="mb-4 flex flex-row">
                        <label htmlFor="password" className="block text-sm m-2 font-medium">Password</label>
                        <input 
                            className="p-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:border-gray-600 text-black"
                            id="password"
                            type="password"
                            value={user.password}
                            onChange={(e) => setUser({ ...user, password: e.target.value })}
                            placeholder="Password"
                        />
                    </div>

                    <button
                        onClick={onSignup}
                        disabled={buttonDisabled}
                        className={`p-2 w-full border rounded-lg transition duration-300 focus:outline-none focus:border-gray-600 ${
                            buttonDisabled
                                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                                : "bg-blue-500 text-white hover:bg-blue-600"
                        }`}
                    >
                        {buttonDisabled ? "Enter details to sign up" : "Sign Up"}
                    </button>

                    <div className="mt-4 text-center">
                        <Link href="/login" className="text-blue-500 hover:underline">Already have an account? Login</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
