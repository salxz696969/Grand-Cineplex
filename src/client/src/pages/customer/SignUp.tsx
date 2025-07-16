import React, { useState, useEffect, FormEvent, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/customer/homecomponents/Header";
import Password from "../../components/customer/useraccess/password";
import { ValidateEmail, extractNameFromEmail } from "../../utils/validation";
import LoadingSpinner from "../../components/customer/LoadingSpinner";
import hall6 from "../../assets/hall6.jpg";
import { FaUserAlt, FaPhoneAlt } from "react-icons/fa";
import TokenAPI from "../../api/tokenApi";

export default function SignUp() {
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<"login" | "signup">("signup");

  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  const handleSignUp = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

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
      await TokenAPI.post("/signup", {
        email,
        phone,
        password,
        name: extractNameFromEmail(email),
      });

      navigate("/signin");
    } catch (err: any) {
      console.error("Signup error:", err);
      setError(err.response?.data?.message || "Signup failed");
    } finally {
      setSubmitting(false);
    }
  };

  const handleTabChange = (tab: "login" | "signup") => {
    if (tab === "login") {
      navigate("/signin");
    } else {
      setActiveTab("signup");
    }
  };

  const isFormValid = (): boolean =>
    phone.trim() !== "" && ValidateEmail(email) && password.trim().length > 0;

  if (loading) return <LoadingSpinner />;

  return (
    <div className="w-screen h-screen bg-[#171c20] flex flex-col">
      <Header />
      <div className="flex w-full h-150 items-center justify-center p-5">
        <div className="flex w-full sm:w-3/4 h-full border border-[#626364] rounded overflow-hidden">

          <div className="hidden show-above-1000px w-full h-full">
            <img className="w-full h-full" src={hall6} alt="Theater" />
          </div>


          <div className="w-full md:w-full h-full bg-[#0f1419]">
            <div className="w-full h-full flex flex-col p-8 text-white">

              <div className="flex items-center gap-6 text-2xl mb-6">
                <button onClick={() => handleTabChange("login")} className="relative pb-1 text-white">
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

                <button onClick={() => handleTabChange("signup")} className="relative pb-1 text-white">
                  <span
                    className={`${
                      activeTab === "signup" ? "text-white" : "text-gray-500"
                    } transition-colors duration-200 font-semibold`}
                  >
                    Sign Up
                  </span>
                  {activeTab === "signup" && (
                    <div className="absolute left-7 -translate-x-1/2 bottom-[-6px] w-1/2 h-[3px] bg-red-600 rounded-full"></div>
                  )}
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleSignUp} className="flex flex-col gap-4 transition-all duration-300 mt-4">
                
                {/* Email */}
                <label htmlFor="email" className="text-gray-300">Email</label>
                <div className="flex items-center bg-transparent border-[1.5px] px-5 rounded">
                  <FaUserAlt className="text-gray-400 mr-3" />
                  <input id="email" type="text" className="w-full text-sm bg-transparent py-3 rounded outline-none text-white"
                    value={email}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      setEmail(e.target.value)
                    }
                  />
                </div>

                {/* Phone */}
                <label htmlFor="phone" className="text-gray-300">Phone Number</label>
                <div className="flex items-center bg-transparent border-[1.5px] px-5 rounded">
                  <FaPhoneAlt className="text-gray-400 mr-3" />
                  <input id="phone" type="text" className="w-full text-sm bg-transparent py-3 rounded outline-none text-white" value={phone}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      setPhone(e.target.value)
                    }
                  />
                </div>

                {/* Password */}
                <label htmlFor="password" className="text-gray-300">Password</label>
                <Password value={password}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setPassword(e.target.value)
                  }
                />

                {/* Error */}
                {error && <span className="text-red-500 text-sm">{error}</span>}

                {/* Submit Button */}
                <button type="submit" disabled={!isFormValid() || submitting}
                  className={`p-3 font-semibold rounded-full mt-4 transition-colors duration-300 ${
                    !isFormValid() || submitting
                      ? "bg-gray-600 text-gray-300 cursor-not-allowed"
                      : "bg-red-600 hover:bg-red-700 cursor-pointer"
                  }`}
                >
                  {submitting ? "Processing..." : "Create Account"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
