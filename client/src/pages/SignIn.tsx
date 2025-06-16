import Header from "../components/Header";
import Password from "../components/Password";
import { Link } from "react-router-dom";
import { useState, FormEvent } from "react";
import { ValidateEmail } from "../components/support";

export default function SignIn() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

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

    // TODO: Call your login API here
  };

  return (
    <div className="w-screen h-screen bg-[#171c20] flex flex-col">
      <Header />
      <div className="flex-grow flex justify-center items-center">
        <div className="px-7 py-10 border border-[#a7aaac] w-96 rounded text-white">
          <form onSubmit={handleLogin} className="w-full fill">
            <h4 className="text-2xl mb-7">Login</h4>

            <input
              type="text"
              placeholder="Email"
              className="input-box"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            {/* Password input component */}
            <Password value={password} onChange={(e) => setPassword(e.target.value)} />

            {/* Display error message if any */}
            {error && <p className="text-sm text-red-500 mb-3">{error}</p>}

            <button type="submit" className="btn-primary h-10">
              Login
            </button>

            <p className="text-sm text-center mt-4">
              Not registered yet?{" "}
              <Link className="font-medium text-blue-500 underline" to="/SignUp">
                Create an Account
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
