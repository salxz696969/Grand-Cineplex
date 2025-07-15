import React, { useState, useEffect, FormEvent, ChangeEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../../components/customer/homecomponents/Header";
import Password from "../../components/customer/useraccess/password";
import { ValidateEmail } from "../../components/customer/support";
import LoadingSpinner from "../../components/customer/LoadingSpinner";
import hall6 from "../../assets/hall6.jpg";
import { FaUserAlt } from "react-icons/fa";

export default function SignIn() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [activeTab, setActiveTab] = useState<"login" | "signup">("login");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

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
    // Login logic here
  };

  const handleTabChange = (tab: "login" | "signup") => {
    if (tab === "signup") {
      navigate("/signup");
    } else {
      setActiveTab("login");
    }
  };

  const isFormValid = (): boolean => {
    return ValidateEmail(email) && password.trim().length > 0;
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="w-screen h-screen bg-[#171c20] flex flex-col">
      <Header />
      <div className="flex w-full h-150 items-center justify-center p-5">
        <div className="flex w-full sm:w-3/4 h-full border border-[#626364] rounded overflow-hidden">
          
          {/* Image - only visible above 980px */}
          <div className="hidden show-above-1000px w-full h-full">
             <img className="w-full h-full" src={hall6} alt="Theater" />
          </div>

          {/* Form Container - full width on small screens */}
          <div className="w-full md:w-full h-full bg-[#0f1419]">
            <div className="w-full h-full flex flex-col p-8 text-white">
              
              {/* Tab switcher */}
              <div className="flex items-center gap-6 text-2xl mb-6">
                <button
                  onClick={() => handleTabChange("login")}
                  className="relative pb-1 text-white"
                >
                  <span
                    className={`${
                      activeTab === "login" ? "text-white" : "text-gray-500"
                    } transition-colors duration-200 font-semibold`}
                  >
                    Log In
                  </span>
                  {activeTab === "login" && (
                    <div className="absolute left-5 -translate-x-1/2 bottom-[-6px] w-1/2 h-[3px] bg-red-600 rounded-full"></div>
                  )}
                </button>

                <div className="h-6 w-px bg-gray-400 opacity-90"></div>

                <button
                  onClick={() => handleTabChange("signup")}
                  className="relative pb-1 text-white"
                >
                  <span
                    className={`${
                      activeTab === "signup" ? "text-white" : "text-gray-500"
                    } transition-colors duration-200 font-semibold`}
                  >
                    Sign Up
                  </span>
                </button>
              </div>


              {/* Login Form */}
              <form
                onSubmit={handleLogin}
                className="flex flex-col gap-4 transition-all duration-300 mt-4"
              >
                {/* Email label */}
                <label
                  htmlFor="email"
                  className="text-gray-300 flex items-center gap-2"
                >
                  Email
                </label>

                {/* Email input with icon */}
                <div className="flex items-center bg-transparent border-[1.5px] px-5 rounded">
                  <FaUserAlt className="text-gray-400 mr-3" />
                  <input
                    id="email"
                    type="text"
                    className="w-full text-sm bg-transparent py-3 rounded outline-none text-white"
                    value={email}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      setEmail(e.target.value)
                    }
                  />
                </div>

                {/* Password label */}
                <label htmlFor="password" className="text-gray-300">
                  Password
                </label>

                {/* Password input with icon & toggle */}
                <Password
                  value={password}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setPassword(e.target.value)
                  }
                />

                {/* Forgot password link aligned right */}
                <div className="text-right mt-2">
                  <Link
                    to="/forgot-password"
                    className="text-sm text-gray-400 hover:text-white transition-colors duration-200"
                  >
                    Forgot Password?
                  </Link>
                </div>

                {/* Error */}
                {error && <span className="text-red-500 text-sm">{error}</span>}

                {/* Submit button with enable/disable style */}
                <button
                  type="submit"
                  disabled={!isFormValid()}
                  className={`p-3 font-semibold rounded-full mt-4 transition-colors duration-300 ${
                    isFormValid()
                      ? "bg-red-600 text-white hover:bg-red-700 cursor-pointer"
                      : "bg-gray-600 text-gray-300 cursor-not-allowed"
                  }`}
                >
                  Log In
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
