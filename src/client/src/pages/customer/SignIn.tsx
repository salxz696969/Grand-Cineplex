import React, { useState, useEffect, FormEvent, ChangeEvent, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../../components/customer/Header";
import Password from "../../components/customer/useraccess/password";
import { ValidateEmail } from "../../utils/validation";
import LoadingSpinner from "../../components/customer/LoadingSpinner";
import hall6 from "../../assets/hall6.jpg";
import { FaUserAlt } from "react-icons/fa";
import TokenAPI from "../../api/tokenApi";
import { setToken } from "../../utils/auth";
import { AuthContext } from "../../components/context/AuthContext";

export default function SignIn() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [activeTab, setActiveTab] = useState<"login" | "signup">("login");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [submitting, setSubmitting] = useState<boolean>(false); // <-- added

  const navigate = useNavigate();
  const { setAuth } = useContext(AuthContext)!;

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
    setSubmitting(true);

    try {
      const res = await TokenAPI.post("/login", {
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

      navigate("/");
    } catch (err: any) {
      console.error("Login error:", err);
      setError(err.response?.data?.message || "Login failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
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
          <div className="hidden show-above-1000px w-full h-full">
            <img className="w-full h-full" src={hall6} alt="Theater" />
          </div>

          <div className="w-full md:w-full h-full bg-[#0f1419]">
            <div className="w-full h-full flex flex-col p-8 text-white">
              <div className="flex items-center gap-6 text-2xl mb-6">
                <button onClick={() => handleTabChange("login")} className="relative pb-1 text-white">
                  <span
                    className={`${activeTab === "login" ? "text-white" : "text-gray-500"
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
                    className={`${activeTab === "signup" ? "text-white" : "text-gray-500"
                      } transition-colors duration-200 font-semibold`}
                  >
                    Sign Up
                  </span>
                </button>
              </div>

              <form onSubmit={handleLogin} className="flex flex-col gap-4 transition-all duration-300 mt-4">
                <label htmlFor="email" className="text-gray-300 flex items-center gap-2">Email</label>

                <div className="flex items-center bg-transparent border-[1.5px] px-5 rounded">
                  <FaUserAlt className="text-gray-400 mr-3" />
                  <input id="email" type="text" className="w-full text-sm bg-transparent py-3 rounded outline-none text-white" value={email}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      setEmail(e.target.value)
                    }
                  />
                </div>

                <label htmlFor="password" className="text-gray-300">Password</label>

                <Password value={password} onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setPassword(e.target.value)
                }
                />

                <div className="text-right mt-2">
                  <Link to="/forgot-password"
                    className="text-sm text-gray-400 hover:text-white transition-colors duration-200"
                  >
                    Forgot Password?
                  </Link>
                </div>

                {error && <span className="text-red-500 text-sm">{error}</span>}

                <button type="submit" disabled={!isFormValid() || submitting}
                  className={`p-3 font-semibold rounded-full mt-4 transition-colors duration-300 ${!isFormValid() || submitting
                      ? "bg-gray-600 text-gray-300 cursor-not-allowed"
                      : "bg-red-600 text-white hover:bg-red-700 cursor-pointer"
                    }`}
                >
                  {submitting ? "Processing..." : "Log In"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
