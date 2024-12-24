import React, { useState, useContext } from "react";
import { registerUser, loginUser } from "../api";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/authcontext";

const LoginRegister = () => {
    const [login, setLogin] = useState(false);
    const [loginData, setLoginData] = useState({ email: "", password: "" });
    const [registerData, setRegisterData] = useState({ name: "", email: "", password: "" });
    const { login: authLogin } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await loginUser(loginData);
            authLogin(data.token); // Update global auth state
            navigate("/");
        } catch (err) {
            alert(err.response.data.message || "Something went wrong.");
        }
    };

    const handleRegisterSubmit = async (e) => {
        e.preventDefault();
        try {
            await registerUser(registerData);
            alert("Registration successful! Please log in.");
            setLogin(true); // Switch to login form after registration
        } catch (err) {
            alert(err.response.data.message || "Something went wrong.");
            }
        };

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="bg-secondary shadow-teal-900 shadow-md rounded-2xl p-8 w-96 h-[28rem]">
                {login ? (
                    <form onSubmit={handleLoginSubmit}>
                        <h2 className="text-center text-neutral mt-5 text-2xl font-bold">Sign In</h2>
                        <div className="flex flex-col items-center mt-6">
                            <input
                                className="bg-secondary placeholder-neutral-200 text-neutral border mt-3 px-4 py-2 w-full rounded-md"
                                type="email"
                                placeholder="Email"
                                value={loginData.email}
                                onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                                required
                            />
                            <input
                                className="bg-secondary placeholder-neutral-200 text-neutral border mt-3 px-4 py-2 w-full rounded-md"
                                type="password"
                                placeholder="Password"
                                value={loginData.password}
                                onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                                required
                            />
                            <p className="text-neutral mt-4 text-sm">
                                Don't have an account?{" "}
                                <span
                                    className="text-teal-500 cursor-pointer font-medium"
                                    onClick={() => setLogin(false)}
                                >
                                    Register
                                </span>
                            </p>
                            <button
                                className="text-white bg-teal-500 hover:bg-teal-600 mt-5 px-5 py-2 w-full rounded-md"
                                type="submit"
                            >
                                Login
                            </button>
                        </div>
                    </form>
                ) : (
                    <form onSubmit={handleRegisterSubmit}>
                        <h2 className="text-center text-neutral mt-5 text-2xl font-bold">Welcome !!</h2>
                        <div className="flex flex-col  items-center mt-6">
                            <input
                                className="bg-secondary placeholder-neutral-200 text-neutral border mt-3 px-4 py-2 w-full rounded-md"
                                type="text"
                                placeholder="Full Name"
                                value={registerData.name}
                                onChange={(e) => setRegisterData({ ...registerData, name: e.target.value })}
                                required
                            />
                            <input
                                className="bg-secondary placeholder-neutral-200 text-neutral border mt-3 px-4 py-2 w-full rounded-md"
                                type="email"
                                placeholder="Email"
                                value={registerData.email}
                                onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                                required
                            />
                            <input
                                className="bg-secondary placeholder-neutral-200 text-neutral border mt-3 px-4 py-2 w-full rounded-md"
                                type="password"
                                placeholder="Password"
                                value={registerData.password}
                                onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                                required
                            />
                            <p className="text-neutral mt-4 text-sm">
                                Already have an account?{" "}
                                <span
                                    className="text-teal-500 cursor-pointer font-medium"
                                    onClick={() => setLogin(true)}
                                >
                                    Log In
                                </span>
                            </p>
                            <button
                                className="text-white bg-teal-500 hover:bg-teal-600 mt-5 px-5 py-2 w-full rounded-md"
                                type="submit"
                            >
                                Register
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
    
};

export default LoginRegister;
