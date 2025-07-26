import React, { useState, FormEvent, ChangeEvent, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import Password from "../../components/customer/useraccess/password";
import { ValidateEmail } from "../../utils/validation";
import { FaUserAlt } from "react-icons/fa";
import TokenAPI from "../../api/tokenApi";
import { setToken } from "../../utils/auth";
import { AuthContext } from "../../components/context/AuthContext";
import { Clapperboard } from "lucide-react";

export default function Auth() {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<string | null>(null);
    const [submitting, setSubmitting] = useState<boolean>(false);

    const navigate = useNavigate();
    const { setAuth } = useContext(AuthContext)!;

    const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!ValidateEmail(email)) {
            setError("Please enter a valid email address.");
            return;
        }

        if (!password) {
            setError("Please enter the password.");
            return;
        }

        setError(null);
        setSubmitting(true);

        try {
            const res = await TokenAPI.post("/manager/login", {
                email,
                password,
            });

            const { token, ...userData } = res.data;

            // Save token and user info to localStorage
            localStorage.setItem("token", token);
            localStorage.setItem("user", JSON.stringify(userData));

            setToken(token);
            TokenAPI.defaults.headers.common["Authorization"] = `Bearer ${token}`;
            setAuth(userData);

            navigate("/manager");
        } catch (err: any) {
            console.error("Login error:", err);
            setError(err.response?.data?.message || "Login failed. Please try again.");
        } finally {
            setSubmitting(false);
        }
    };

    const isLoginFormValid = (): boolean => {
        return ValidateEmail(email) && password.trim().length > 0;
    };

    return (
        <div className="min-h-screen bg-gray-950 flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                {/* Branding */}
                <div className="text-center mb-8">
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <Clapperboard className="w-8 h-8 text-blue-400" />
                        <span className="text-2xl font-bold text-blue-400 tracking-wide">GRAND CINEPLEX</span>
                    </div>
                    <p className="text-gray-400 text-sm">Manager Portal</p>
                </div>

                {/* Login Form */}
                <div className="bg-gray-900/50 border border-gray-700 rounded-2xl p-8 shadow-2xl">
                    <div className="mb-6">
                        <h1 className="text-2xl font-bold text-white mb-2">Welcome Back</h1>
                        <p className="text-gray-400 text-sm">Sign in to your staff account</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-6">
                        <div>
                            <label htmlFor="email" className="block text-gray-300 font-medium mb-2">
                                Email Address
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <FaUserAlt className="text-blue-300 w-4 h-4" />
                                </div>
                                <input
                                    id="email"
                                    type="email"
                                    className="w-full bg-gray-800/70 border border-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 rounded-xl pl-12 pr-4 py-3 text-white placeholder-gray-400 transition-all duration-200"
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-gray-300 font-medium mb-2">
                                Password
                            </label>
                            <Password
                                value={password}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                            />
                        </div>

                        {/* <div className="flex items-center justify-between">
                            <Link to="/forgot-password" className="text-sm text-blue-400 hover:text-blue-300 transition-colors duration-200">
                                Forgot Password?
                            </Link>
                        </div> */}

                        {error && (
                            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3">
                                <span className="text-red-400 text-sm font-medium">{error}</span>
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={!isLoginFormValid() || submitting}
                            className={`w-full py-3 px-6 rounded-xl font-semibold text-white transition-all duration-200 ${!isLoginFormValid() || submitting
                                ? "bg-gray-700 text-gray-400 cursor-not-allowed"
                                : "bg-blue-600 hover:bg-blue-700 hover:scale-[1.02] shadow-lg"
                                }`}
                        >
                            {submitting ? (
                                <div className="flex items-center justify-center gap-2">
                                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                    Signing In...
                                </div>
                            ) : (
                                "Sign In"
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
