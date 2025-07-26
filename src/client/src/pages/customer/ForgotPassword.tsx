import React, { useState, useEffect, FormEvent, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/customer/Header";
import LoadingSpinner from "../../components/customer/LoadingSpinner";
import { ValidateEmail } from "../../utils/validation";
import hall6 from "../../assets/hall6.jpg";
import { FaUserAlt } from "react-icons/fa";
import { Clapperboard } from "lucide-react";

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
    <div className="min-h-screen bg-gray-950 flex flex-col">
      <div className="flex-1 flex items-center justify-center py-8">
        <div className="max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-2 gap-0 rounded-2xl shadow-2xl overflow-hidden border border-gray-800 bg-gray-950">
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
          <div className="flex flex-col justify-start px-8 py-8 w-full mx-auto">
            <div className="mb-8">
              <div className="relative w-fit mb-2">
                <h2 className="text-2xl font-bold text-white">Forgot Password</h2>
                <div className="absolute left-0 bottom-[-6px] w-2/3 h-[3px] bg-blue-600 rounded-full"></div>
              </div>
              <span className="mb-7 text-gray-300 text-sm block mt-4">
                Please enter your Email to reset your password.
              </span>
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <label htmlFor="email" className="text-gray-300 font-medium">Email</label>
              <div className="flex items-center bg-gray-900/70 border border-gray-700 focus-within:border-blue-600 rounded-lg px-4 py-2">
                <FaUserAlt className="text-blue-200 mr-3" />
                <input id="email" type="text" className="w-full text-sm bg-transparent py-3 rounded outline-none text-white placeholder-gray-400"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                />
              </div>
              {error && <span className="text-red-500 text-sm font-medium">{error}</span>}
              {success && (
                <span className="text-green-500 text-sm font-medium">{success}</span>
              )}
              <button type="submit" disabled={!isFormValid()}
                className={`w-full py-3 font-semibold rounded-xl mt-4 transition-all duration-200 text-lg shadow-md ${isFormValid()
                  ? "bg-blue-800 hover:bg-blue-700 text-white hover:scale-[1.02]"
                  : "bg-gray-700 text-gray-400 cursor-not-allowed"
                  }`}
              >
                Continue
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
