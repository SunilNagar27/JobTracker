import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/authcontext";
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
    const { isLoggedIn, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <div className="flex flex-row justify-between items-center bg-zinc-900 text-neutral-200 p-3">
            {/* Left Side */}
            <div className="flex items-center">
                
                <p onClick={() => navigate('/')} className="cursor-pointer text-teal-500 font-Semibold text-3xl">
                    JobTracker
                </p>
            </div>

            {/* Right Side */}
            <div className="flex items-center">
                {!isLoggedIn ? (
                    <button
                        onClick={() => navigate('/register')}
                        className="cursor-pointer mr-4 rounded hover:scale-105 text-teal-500 text-lg hover:text-teal-600 px-4 py-1"
                    >
                        Sign In
                    </button>
                ) : (
                    <div className="relative">
                        <button
                            onClick={toggleMenu}
                            className="text-lg sm:hidden text-neutral-200 focus:outline-none"
                        >
                            {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                        </button>

                        {/* Hamburger Menu */}
                        {menuOpen && (
                            <div className="absolute top-12 right-0 w-48 bg-secondary border border-gray-600 rounded-lg shadow-lg flex flex-col items-start">
                                <p
                                    onClick={() => {
                                        navigate('/searchjobs');
                                        setMenuOpen(false);
                                    }}
                                    className="text-lg px-4 py-2 w-full hover:bg-teal-600 cursor-pointer"
                                >
                                    Search Jobs
                                </p>
                                <p
                                    onClick={() => {
                                        navigate('/jobs');
                                        setMenuOpen(false);
                                    }}
                                    className="text-lg px-4 py-2 w-full hover:bg-teal-600 cursor-pointer"
                                >
                                    My Jobs
                                </p>
                                <p
                                    onClick={() => {
                                        navigate('/ats-checker');
                                        setMenuOpen(false);
                                    }}
                                    className="text-lg px-4 py-2 w-full hover:bg-teal-600 cursor-pointer"
                                >
                                    ATS Checker
                                </p>
                                <p
                                    onClick={() => {
                                        handleLogout();
                                        setMenuOpen(false);
                                    }}
                                    className="text-lg px-4 py-2 w-full hover:bg-teal-600 cursor-pointer"
                                >
                                    Logout
                                </p>
                            </div>
                        )}

                        {/* Desktop Menu */}
                        <div className="hidden sm:flex">
                            <p
                                onClick={() => navigate('/searchjobs')}
                                className="text-lg mr-5 hover:scale-105 cursor-pointer"
                            >
                                Search Jobs
                            </p>
                            <p
                                onClick={() => navigate('/jobs')}
                                className="text-lg mr-5 hover:scale-105 cursor-pointer"
                            >
                                My Jobs
                            </p>
                            <p
                                onClick={() => navigate('/ats-checker')}
                                className="text-lg mr-5 hover:scale-105 cursor-pointer"
                            >
                                ATS Checker
                            </p>
                            <button
                                onClick={handleLogout}
                                className="cursor-pointer mr-4 rounded hover:scale-105 px-4 py-1 text-zinc-800 bg-teal-500 hover:bg-teal-600"
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Navbar;
