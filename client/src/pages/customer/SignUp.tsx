import React from "react";
import { useState, FormEvent } from "react";
import { Link } from "react-router-dom";
import Header from "../../components/Header";
import Password from "../../components/Password";
import { ValidateEmail } from "../../utils/validation";

export default function SignUp() {

    const [email, setEmail] = useState<string>("");
    const [name, setName] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<string | null>(null);

    const handleSignUp = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!name) {
            setError("Please enter your name");
            return;
        }
        if (!ValidateEmail(email)) {
            setError("Please enter a valid email");
            return;
        }
        if (!password) {
            setError("Please enter the password");
            return;
        }
        setError(null);

        // Call API in this to create account
    }

    return (
        <div className="w-screen h-screen bg-[#171c20] flex flex-col">
            <Header />
            <div className="flex-grow flex justify-center items-center">
                <div className="px-7 py-10 border border-[#a7aaac] w-96 rounded text-white">
                    <form onSubmit={handleSignUp} className="w-full fill">
                        <h4 className="text-2xl mb-7">SignUp</h4>
                        <input type="text" placeholder="Name" className="input-box" value={name} onChange={(e) => setName(e.target.value)} />
                        <input type="text" placeholder="Email" className="input-box" value={email} onChange={(e) => setEmail(e.target.value)} />
                        <Password value={password} onChange={(e) => setPassword(e.target.value)} />

                        {error && (<p className="text-sm text-red-500 mb-3">{error}</p>)}

                        <button type="submit" className="btn-primary h-10">Create Account</button>
                        <p className="text-sm text-center mt-4">
                            Already have an account?{" "}
                            <Link
                                className="font-medium text-blue-500 underline"
                                to="/SignIn"
                            >
                                Login
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    )
}