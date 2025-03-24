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
                body: JSON.stringify({ ...formData, role: "user" }), // Add 'role' to the body
            });

            const data = await response.json();
            console.log(data);
            if (response.ok) {
                setMessage("Account created successfully! You can now log in.");
                setFormData({ name: "", email: "", password: "" });
            } else {
                setMessage(data.message || "Failed to create account.");
            }
        } catch (error) {
            console.error(error);
            setMessage("An error occurred. Please try again.");
        }
    };

    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
            <div style={{ backgroundColor: "#1a1a1a", color: "#fff", padding: "2rem", maxWidth: "400px", margin: "auto", borderRadius: "8px", alignContent: "center", alignItems: "center" }}>
                <h1 style={{ textAlign: "center" }}>Sign Up</h1>
                {message && <p style={{ textAlign: "center", color: message.startsWith("Account") ? "green" : "red" }}>{message}</p>}
                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: "1rem" }}>
                        <label>Name:</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            style={{ width: "100%", padding: "0.5rem", borderRadius: "4px", border: "1px solid #333", marginTop: "0.5rem" }}
                        />
                    </div>
                    <div style={{ marginBottom: "1rem" }}>
                        <label>Email:</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                        required
                            style={{ width: "100%", padding: "0.5rem", borderRadius: "4px", border: "1px solid #333", marginTop: "0.5rem" }}
                        />
                    </div>
                    <div style={{ marginBottom: "1rem" }}>
                        <label>Password:</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            style={{ width: "100%", padding: "0.5rem", borderRadius: "4px", border: "1px solid #333", marginTop: "0.5rem" }}
                        />
                    </div>
                    <button type="submit" style={{ width: "100%", padding: "0.75rem", backgroundColor: "#333", color: "#fff", borderRadius: "4px", cursor: "pointer", border: "none" }}>
                        Sign Up
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Signup;
