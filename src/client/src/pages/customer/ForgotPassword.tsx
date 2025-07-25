import React, { useState, useEffect, FormEvent, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/customer/Header";
import LoadingSpinner from "../../components/customer/LoadingSpinner";
import { ValidateEmail } from "../../utils/validation";
import hall6 from "../../assets/hall6.jpg";
import { FaUserAlt } from "react-icons/fa";

export default function ForgotPassword() {
  const [email, setEmail] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [success, setSuccess] = useState<string | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!ValidateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setError(null);
    setSuccess("If this email is registered, a reset link will be sent.");
  };

  const isFormValid = (): boolean => {
    return ValidateEmail(email);
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="w-screen h-screen bg-[#171c20] flex flex-col">
      <Header />
      <div className="flex w-full h-150 items-center justify-center p-5">
        <div className="flex w-3/4 h-full border border-[#626364] rounded overflow-hidden">
          <div className="hidden md:block w-full h-full">
            <img className="w-full h-full" src={hall6} alt="Theater" />
          </div>

          <div className="w-full md:w-full h-full bg-[#0f1419]">
            <div className="w-full h-full flex flex-col p-8 text-white">
              <div className="relative w-fit mb-6">
                <h2 className="text-2xl font-semibold text-white">Forgot Password</h2>
                <div className="absolute left-0 bottom-[-6px] w-15 h-[3px] bg-red-600 rounded-full"></div>
              </div>

              <span className="mb-7 text-gray-300 text-sm">
                Please enter your Email to reset your password.
              </span>

              <form onSubmit={handleSubmit} className="flex flex-col gap-4 transition-all duration-300 mt-4">
                <label htmlFor="email" className="text-gray-300">Email</label>

                <div className="flex items-center bg-transparent border-[1.5px] px-5 rounded">
                  <FaUserAlt className="text-gray-400 mr-3" />
                  <input id="email" type="text" className="w-full text-sm bg-transparent py-3 rounded outline-none text-white" value={email}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      setEmail(e.target.value)
                    }
                  />
                </div>

                {error && <span className="text-red-500 text-sm">{error}</span>}

                {success && (
                  <span className="text-green-500 text-sm">{success}</span>
                )}

                <button type="submit" disabled={!isFormValid()}
                  className={`p-3 font-semibold rounded-full mt-4 transition-colors duration-300 ${isFormValid()
                      ? "bg-red-600 text-white hover:bg-red-700 cursor-pointer"
                      : "bg-gray-600 text-gray-300 cursor-not-allowed"
                    }`}
                >
                  Continue
                </button>

              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
