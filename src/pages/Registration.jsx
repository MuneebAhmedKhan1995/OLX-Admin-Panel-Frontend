import React, { useState } from 'react';
import Navbar from './Navbar';
import { registerUser } from '../Redux/Actions/AuthActions';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

function Registration() {
    const [data, setData] = useState({})
    const [showSuccess, setShowSuccess] = useState(false)
    const [showPassword, setShowPassword] = useState(false) // Add this line
    const {user, error, loading} = useSelector((state) => state.user);
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const handleInput = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value,
        });
    };
    const handleSubmit =async (e) => {
        e.preventDefault();

        console.log(data, " data")
        const response =await dispatch(registerUser(data))
        console.log(response)
        if(response.payload.data){
            // Success message show karo
            setShowSuccess(true)
            
            // 5 second baad login page navigate karo
            setTimeout(() => {
                navigate("/login")
            }, 5000)
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-pink-50 to-rose-50">
            <Navbar/>
            <div className="container mx-auto px-4 py-8">
                <div className="max-w-md mx-auto">
                    
                    {/* Success Message - Bas yahi add kiya hai */}
                    {showSuccess && (
                        <div className="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg text-center">
                            <div className="flex items-center justify-center space-x-2">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                                <span className="font-medium">Registration Successful!</span>
                            </div>
                        </div>
                    )}

                    {/* Card */}
                    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                        {/* Header */}
                        <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-6">
                            <div className="flex justify-between items-center">
                                <div>
                                    <h2 className="text-xl font-semibold text-white">Join Us Today</h2>
                                    <p className="text-purple-100 mt-1 text-sm">Create your account and get started</p>
                                </div>
                            </div>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                            <div>
                                <label className="block text-gray-700 text-xs font-medium mb-2">
                                    First Name
                                </label>
                                <input
                                    type="text"
                                    name="firstName"
                                    onChange={handleInput}
                                    className="w-full px-3 py-3 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-300"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-gray-700 text-xs font-medium mb-2">
                                    Last Name
                                </label>
                                <input
                                    type="text"
                                    name="lastName"
                                    onChange={handleInput}
                                    className="w-full px-3 py-3 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-300"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-gray-700 text-xs font-medium mb-2">
                                    Phone No
                                </label>
                                <input
                                    type="text"
                                    name="phone"
                                    onChange={handleInput}
                                    className="w-full px-3 py-3 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-300"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-gray-700 text-xs font-medium mb-2">
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    onChange={handleInput}
                                    className="w-full px-3 py-3 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-300"
                                    required
                                />
                            </div>

                            <div className="relative">
                                <label className="block text-gray-700 text-xs font-medium mb-2">
                                    Password
                                </label>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    onChange={handleInput}
                                    className="w-full px-3 py-3 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-300 pr-10"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-9 text-gray-500 hover:text-purple-600 transition duration-300"
                                >
                                    {showPassword ? (
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                        </svg>
                                    ) : (
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                                        </svg>
                                    )}
                                </button>
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-lg font-medium text-sm hover:from-purple-600 hover:to-pink-600 transition duration-300 shadow-md hover:shadow-lg"
                            >
                                Create Account
                            </button>

                            <div className="text-center text-xs text-gray-600 pt-3">
                                Already have an account?{' '}
                                <button type="button" className="text-purple-600 hover:text-purple-700 font-medium transition duration-300">
                                    Sign In Here
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Registration;