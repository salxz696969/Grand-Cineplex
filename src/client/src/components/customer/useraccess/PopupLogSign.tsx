import React, { useState, ChangeEvent, FormEvent, useContext } from "react";
import hall6 from "../../../assets/hall6.jpg";
import { FaUserAlt, FaPhoneAlt } from "react-icons/fa";
import Password from "./password";
import { AuthContext } from "../../context/AuthContext";
import { setToken } from "../../../utils/auth";
import TokenAPI from "../../../api/tokenApi";
import { ValidateEmail } from "../../../utils/validation";
import { Clapperboard, X } from "lucide-react";

interface AuthModalProps {
  onSuccess: () => void;
  onClose: () => void;
}

const AuthModal = ({ onSuccess, onClose }: AuthModalProps) => {
  const [activeTab, setActiveTab] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const { setAuth } = useContext(AuthContext)!;

  const handleLogin = async (e: FormEvent) => {
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
      const res = await TokenAPI.TokenAPICustomer.post("/login", { email, password });
      const { token, ...userData } = res.data;

      setToken(token);
      TokenAPI.TokenAPICustomer.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(userData));
      setAuth(userData);

      onSuccess();
    } catch (err: any) {
      console.error("Login error:", err);
      setError(err.response?.data?.message || "Login failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleSignUp = async (e: FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      setError("Please enter your name.");
      return;
    }

    if (!phone.trim()) {
      setError("Please enter your phone number.");
      return;
    }

    if (!ValidateEmail(email)) {
      setError("Please enter a valid email.");
      return;
    }

    if (!password) {
      setError("Please enter the password.");
      return;
    }

    setError(null);
    setSubmitting(true);

    try {
      await TokenAPI.TokenAPICustomer.post("/signup", {
        email: email.toLowerCase(),
        name: name.trim(),
        phone,
        password,
      });

      // Switch to login after successful signup
      setActiveTab("login");
      setEmail("");
      setName("");
      setPhone("");
      setPassword("");
      setError(null);
    } catch (err: any) {
      console.error("Signup error:", err);
      setError(err.response?.data?.message || "Signup failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleTabChange = (tab: "login" | "signup") => {
    setActiveTab(tab);
    setError(null);
    // Clear form when switching tabs
    if (tab === "login") {
      setPhone("");
      setName("");
    }
  };

  const isLoginFormValid = (): boolean => {
    return ValidateEmail(email) && password.trim().length > 0;
  };

  const isSignupFormValid = (): boolean => {
    return name.trim() !== "" && phone.trim() !== "" && ValidateEmail(email) && password.trim().length > 0;
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center p-5 bg-black/60 backdrop-blur-sm" onClick={handleBackdropClick}>
      <div className="max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-2 gap-0 rounded-2xl shadow-2xl overflow-hidden border border-gray-800 bg-gray-950 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-gray-800/80 hover:bg-gray-700/80 text-gray-300 hover:text-white transition-all duration-200 backdrop-blur-sm"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left: Image/Branding */}
        <div className="hidden lg:block bg-gray-900 relative">
          <img src={hall6} alt="Theater" className="object-cover w-full h-full min-h-[500px]" />
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/60 to-gray-950/80" />
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <Clapperboard className="w-20 h-20 text-blue-200 mb-4" />
            <div className="text-3xl font-bold text-blue-200 tracking-wide">GRAND CINEPLEX</div>
          </div>
        </div>
        {/* Right: Form */}
        <div className="flex flex-col justify-center px-8 py-8 w-full mx-auto">
          <div className="mb-8">
            <div className="flex items-center gap-8 text-2xl font-bold">
              <button onClick={() => handleTabChange("login")}
                className={`relative pb-1 transition-colors duration-200 ${activeTab === "login" ? "text-blue-400" : "text-gray-500"}`}
              >
                Log In
                {activeTab === "login" && (
                  <div className="absolute left-1/2 -translate-x-1/2 bottom-[-6px] w-1/2 h-[3px] bg-blue-600 rounded-full"></div>
                )}
              </button>
              <div className="h-6 w-px bg-gray-700 opacity-90"></div>
              <button onClick={() => handleTabChange("signup")}
                className={`relative pb-1 transition-colors duration-200 ${activeTab === "signup" ? "text-blue-400" : "text-gray-500"}`}
              >
                Sign Up
                {activeTab === "signup" && (
                  <div className="absolute left-1/2 -translate-x-1/2 bottom-[-6px] w-1/2 h-[3px] bg-blue-600 rounded-full"></div>
                )}
              </button>
            </div>
          </div>

          {/* Login Form */}
          {activeTab === "login" && (
            <form onSubmit={handleLogin} className="flex flex-col gap-5">
              <label htmlFor="email" className="text-gray-300 font-medium flex items-center gap-2">Email</label>
              <div className="flex items-center bg-gray-900/70 border border-gray-700 focus-within:border-blue-600 rounded-lg px-4 py-2">
                <FaUserAlt className="text-blue-200 mr-3" />
                <input id="email" type="text" className="w-full text-sm bg-transparent py-3 rounded outline-none text-white placeholder-gray-400"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                />
              </div>
              <label htmlFor="password" className="text-gray-300 font-medium">Password</label>
              <Password value={password} onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)} />
              {error && <span className="text-red-500 text-sm font-medium">{error}</span>}
              <button type="submit" disabled={!isLoginFormValid() || submitting}
                className={`w-full py-3 font-semibold rounded-xl mt-4 transition-all duration-200 text-lg shadow-md ${!isLoginFormValid() || submitting
                  ? "bg-gray-700 text-gray-400 cursor-not-allowed"
                  : "bg-blue-800 hover:bg-blue-700 text-white hover:scale-[1.02]"
                  }`}
              >
                {submitting ? "Processing..." : "Log In"}
              </button>
            </form>
          )}

          {/* Signup Form */}
          {activeTab === "signup" && (
            <form onSubmit={handleSignUp} className="flex flex-col gap-5">
              <label htmlFor="name" className="text-gray-300 font-medium">Name</label>
              <div className="flex items-center bg-gray-900/70 border border-gray-700 focus-within:border-blue-600 rounded-lg px-4 py-2">
                <FaUserAlt className="text-blue-200 mr-3" />
                <input id="name" type="text" className="w-full text-sm bg-transparent py-3 rounded outline-none text-white placeholder-gray-400"
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                />
              </div>
              <label htmlFor="signup-email" className="text-gray-300 font-medium">Email</label>
              <div className="flex items-center bg-gray-900/70 border border-gray-700 focus-within:border-blue-600 rounded-lg px-4 py-2">
                <FaUserAlt className="text-blue-200 mr-3" />
                <input id="signup-email" type="text" className="w-full text-sm bg-transparent py-3 rounded outline-none text-white placeholder-gray-400"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                />
              </div>
              <label htmlFor="phone" className="text-gray-300 font-medium">Phone Number</label>
              <div className="flex items-center bg-gray-900/70 border border-gray-700 focus-within:border-blue-600 rounded-lg px-4 py-2">
                <FaPhoneAlt className="text-blue-200 mr-3" />
                <input id="phone" type="text" className="w-full text-sm bg-transparent py-3 rounded outline-none text-white placeholder-gray-400"
                  placeholder="Enter your phone number"
                  value={phone}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setPhone(e.target.value)}
                />
              </div>
              <label htmlFor="signup-password" className="text-gray-300 font-medium">Password</label>
              <Password value={password} onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)} />
              {error && <span className="text-red-500 text-sm font-medium">{error}</span>}
              <button type="submit" disabled={!isSignupFormValid() || submitting}
                className={`w-full py-3 font-semibold rounded-xl mt-4 transition-all duration-200 text-lg shadow-md ${!isSignupFormValid() || submitting
                  ? "bg-gray-700 text-gray-400 cursor-not-allowed"
                  : "bg-blue-800 hover:bg-blue-700 text-white hover:scale-[1.02]"
                  }`}
              >
                {submitting ? "Processing..." : "Create Account"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
