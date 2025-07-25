import React, { useState, ChangeEvent, FormEvent, useContext } from "react";
import hall6 from "../../../assets/hall6.jpg";
import { FaUserAlt, FaPhoneAlt } from "react-icons/fa";
import Password from "./password";
import { AuthContext } from "../../context/AuthContext";
import { setToken } from "../../../utils/auth";
import TokenAPI from "../../../api/tokenApi";
import { extractNameFromEmail } from "../../../utils/validation";

interface AuthModalProps {
  onSuccess: () => void;
}

const AuthModal = ({ onSuccess }: AuthModalProps) => {
  const [activeTab, setActiveTab] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { setAuth } = useContext(AuthContext)!;

  const isFormValid = () => {
    if (!email || !password) return false;
    if (activeTab === "signup" && !phone) return false;
    return true;
  };

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    if (!isFormValid()) {
      setError("Please fill all fields correctly.");
      return;
    }

    setError(null);
    setLoading(true);

    try {
      const res = await TokenAPI.post("/login", { email, password });
      const { token, ...user } = res.data;

      setToken(token);
      TokenAPI.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      localStorage.setItem("user", JSON.stringify(user));
      setAuth({ ...user, token });

      onSuccess();
    } catch (err: any) {
      console.error("Login error:", err);
      setError(err.response?.data?.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async (e: FormEvent) => {
    e.preventDefault();
    if (!isFormValid()) {
      setError("Please fill all fields correctly.");
      return;
    }

    setError(null);
    setLoading(true);

    try {
      const name = extractNameFromEmail(email);

      await TokenAPI.post("/signup", { email, password, phone, name });

      // Switch to login after successful signup
      setActiveTab("login");
      setPassword("");
      setPhone("");
      setError(null);
    } catch (err: any) {
      console.error("Signup error:", err);
      setError(err.response?.data?.message || "Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-5 bg-black/60 backdrop-blur-sm">
      <div className="flex w-full max-w-4xl h-[550px] border border-gray-800 rounded-xl overflow-hidden bg-gray-950 shadow-lg">

        <div className="hidden lg:block w-1/2 h-full">
          <img className="w-full h-full object-cover select-none" src={hall6} alt="Theater" draggable={false} />
        </div>

        <div className="w-full lg:w-1/2 h-full flex flex-col p-8 text-white overflow-auto bg-gray-950">

          <div className="flex items-center gap-6 text-2xl mb-6">
            <button onClick={() => setActiveTab("login")} className="relative pb-1">
              <span className={`${activeTab === "login" ? "text-white" : "text-gray-400"} transition-colors duration-200 font-semibold`}>
                Log In
              </span>
              {activeTab === "login" && (
                <div className="absolute left-5 -translate-x-1/2 bottom-[-6px] w-1/2 h-[3px] bg-blue-800 rounded-full"></div>
              )}
            </button>

            <div className="h-6 w-px bg-gray-700 opacity-90"></div>

            <button onClick={() => setActiveTab("signup")} className="relative pb-1">
              <span className={`${activeTab === "signup" ? "text-white" : "text-gray-400"} transition-colors duration-200 font-semibold`}>
                Sign Up
              </span>
              {activeTab === "signup" && (
                <div className="absolute left-7 -translate-x-1/2 bottom-[-6px] w-1/2 h-[3px] bg-blue-800 rounded-full"></div>
              )}
            </button>

          </div>

          {activeTab === "login" ? (
            <form onSubmit={handleLogin} className="flex flex-col gap-4 mt-4">
              <label htmlFor="email" className="text-gray-300">Email</label>

              <div className="flex items-center border border-gray-800 bg-gray-900 rounded-lg px-5">
                <FaUserAlt className="text-gray-400 mr-3" />
                <input id="email" type="text" className="w-full bg-transparent py-3 text-white outline-none text-sm" value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <label htmlFor="password" className="text-gray-300">Password</label>
              <Password value={password} onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)} />

              {error && <span className="text-red-500 text-sm">{error}</span>}

              <button type="submit" disabled={!isFormValid() || loading}
                className={`p-3 font-semibold rounded-xl mt-4 transition-all duration-200 shadow-lg ${!isFormValid() || loading
                    ? "bg-gray-700 text-gray-400 cursor-not-allowed"
                    : "bg-blue-800 hover:bg-blue-700 text-white hover:scale-105"
                  }`}
              >
                {loading ? "Processing..." : "Log In"}
              </button>
            </form>

          ) : (
            <form onSubmit={handleSignUp} className="flex flex-col gap-4 mt-4">
              <label htmlFor="email" className="text-gray-300">Email</label>
              <div className="flex items-center border border-gray-800 bg-gray-900 rounded-lg px-5">
                <FaUserAlt className="text-gray-400 mr-3" />
                <input id="email" type="text" className="w-full bg-transparent py-3 text-white outline-none text-sm" value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <label htmlFor="phone" className="text-gray-300">Phone Number</label>
              <div className="flex items-center border border-gray-800 bg-gray-900 rounded-lg px-5">
                <FaPhoneAlt className="text-gray-400 mr-3" />
                <input id="phone" type="text" className="w-full bg-transparent py-3 text-white outline-none text-sm" value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>

              <label htmlFor="password" className="text-gray-300">Password</label>
              <Password value={password} onChange={(e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)} />

              {error && <span className="text-red-500 text-sm">{error}</span>}

              <button type="submit" disabled={!isFormValid() || loading}
                className={`p-3 font-semibold rounded-xl mt-4 transition-all duration-200 shadow-lg ${!isFormValid() || loading
                    ? "bg-gray-700 text-gray-400 cursor-not-allowed"
                    : "bg-blue-800 hover:bg-blue-700 text-white hover:scale-105"
                  }`}
              >
                {loading ? "Processing..." : "Create Account"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
