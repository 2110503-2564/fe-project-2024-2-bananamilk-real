'use client'
import { useState } from "react";
const API_BASE = process.env.NEXT_PUBLIC_API_BASE || '';

const Signup = () => {
    const [formData, setFormData] = useState({ name: "", email: "", password: "" });
    const [message, setMessage] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage("");

        try {
            const response = await fetch(`${API_BASE}/auth/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ ...formData, role: "user" }),
            });

            const data = await response.json();
            if (response.ok) {
                setMessage("Account created successfully! You can now log in.");
                setFormData({ name: "", email: "", password: "" });
            } else {
                setMessage(data.message || "Failed to create account.");
            }
        } catch (error) {
            setMessage("An error occurred. Please try again.");
        }
    };

    return (
        <div className="flex items-center justify-center h-screen dark:bg-[#1A2026]">
            <div className="bg-white text-black dark:bg-[#11141A] dark:text-white !p-6 w-1/5 mx-auto rounded-xl flex flex-col items-center shadow-md">
                <h1 className="text-center text-xl font-bold">Sign Up</h1>
                {message && (
                    <p className={`text-center !mt-2 ${message.startsWith("Account") ? "text-green-500" : "text-red-500"}`}>
                        {message}
                    </p>
                )}
                <form onSubmit={handleSubmit} className="w-full">
                    <div className="!mb-4">
                        <label className="block">Name:</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="w-full !p-2 rounded border border-gray-300 dark:border-gray-600 bg-transparent"
                        />
                    </div>
                    <div className="!mb-4">
                        <label className="block">Email:</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full !p-2 rounded border border-gray-300 dark:border-gray-600 bg-transparent"
                        />
                    </div>
                    <div className="!mb-4">
                        <label className="block">Password:</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            className="w-full !p-2 rounded border border-gray-300 dark:border-gray-600 bg-transparent"
                        />
                    </div>
                    <button type="submit" className="w-full !p-2 !my-4 bg-white-800 shadow-md dark:shadow-[#181C20] dark:bg-[#11141A] dark:border-white text-black dark:text-white rounded">
                        Sign Up
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Signup;