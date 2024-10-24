

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { setSignupData } from '../../redux/slices/authSlice';
import { setLoading } from '../../redux/slices/profileSlice';

import { useDispatch,useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { toast } from "react-hot-toast"
import axios from 'axios';

function SignupForm() {

    const {loading}=useSelector((state)=>state.auth);
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        accountType: 'Student', // default accountType is Student
        
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const changeHandler = (e) => {
        setFormData((prevData) => ({
        ...prevData,
        [e.target.name]: e.target.value,
        }));
        console.log(formData);
    };

    const handleTabChange = (accountType) => {
        setFormData({ ...formData, accountType });
    };

    const handleSubmit = async(e) => {
        e.preventDefault();
        console.log(formData);

        if (formData.password !== formData.confirmPassword) {
            toast.error("Passwords Do Not Match")
            return
        }
        dispatch(setLoading(true));
        const toastId=toast.loading("Loading...")
        // Setting signup data to state
        // To be used after otp verification
        dispatch(setSignupData(formData))
        setFormData({
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            confirmPassword: "",
            accountType: 'Student',
        })
        
        // send otp
        try {
                
                const response =await axios.post('http://localhost:4000/api/v1/auth/sendotp', { email: formData.email });

                if (response.status === 200) {
                    // Handle successful signup
                    console.log('Otp send successfully:', response);
                    toast.success('OTP sent!');
                    // Navigate to the next step (e.g., OTP verification)
                    navigate('/verify-email');
                }
            } 
            catch (error) {
                // Handle errors from the backend
                toast.error(error.response?.data?.message || 'Something went wrong');
                console.error('Error:', error);
            }
           dispatch(setLoading(false)); 
           toast.dismiss(toastId);
    

    };

        
   

  return (
    <div className="bg-[#f2f0f7] py-10 flex items-center justify-center ">
    {
        loading?(
            <div className='spinner'></div>
        ):(

        <div className="w-11/12 max-w-[1200px] mx-auto rounded-md bg-gradient-to-b from-indigo-200 to bg-indigo-400 py-12">
            <h2 className="text-4xl mb-6 text-center font-semibold">
            Create Your Account
            </h2>

            {/* Tabs for Student and Owner */}
            <div className="flex justify-center mt-10">
                <button
                    className={`px-8 py-3 mx-2 rounded-lg font-semibold text-lg ${
                    formData.accountType === 'Student' ? 'bg-indigo-800 text-white' : 'bg-indigo-400'
                    }`}
                    onClick={() => handleTabChange('Student')}
                >
                    Student
                </button>
                <button
                    className={`px-8 py-3 mx-2 rounded-lg font-semibold text-lg ${
                    formData.accountType === 'Owner' ? 'bg-indigo-800 text-white' : 'bg-indigo-400'
                    }`}
                    onClick={() => handleTabChange('Owner')}
                >
                    Owner
                </button>
            </div>

            <form onSubmit={handleSubmit} className="p-4 md:p-8">
                {/* First Name and Last Name */}
                <div className="flex flex-col md:flex-row justify-between mb-4 gap-4">
                    <div className="w-full md:w-1/2">
                        <label htmlFor="firstName" className="font-semibold text-lg mb-2">
                            First Name
                        </label>
                        <input
                            type="text"
                            name="firstName"
                            className="w-full px-2 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-800 focus:border-transparent"
                            placeholder="Enter your first name"
                            value={formData.firstName}
                            onChange={changeHandler}
                            required
                        />
                    </div>

                    <div className="w-full md:w-1/2">
                        <label htmlFor="lastName" className="font-semibold text-lg mb-2">
                            Last Name
                        </label>
                        <input
                            type="text"
                            name="lastName"
                            className="w-full px-2 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-800 focus:border-transparent"
                            placeholder="Enter your last name"
                            value={formData.lastName}
                            onChange={changeHandler}
                            required
                        />
                    </div>
                </div>

                {/* Email Input */}
                <div className="mb-4">
                    <label htmlFor="email" className="font-semibold text-lg mb-2">
                    Email Address
                    </label>
                    <input
                    type="email"
                    name="email"
                    className="w-full px-2 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-800 focus:border-transparent"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={changeHandler}
                    required
                    />
                </div>

                {/* Create Password and Confirm Password */}
                <div className="flex flex-col md:flex-row justify-between mb-4 gap-4">
                    <div className="w-full md:w-1/2 relative">
                        <label htmlFor="password" className="font-semibold text-lg mb-2">
                            Create Password
                        </label>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            name="password"
                            className="w-full px-2 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-800 focus:border-transparent"
                            placeholder="Enter your password"
                            value={formData.password}
                            onChange={changeHandler}
                            required
                        />
                        <span
                            onClick={() => setShowPassword((prev) => !prev)}
                            className="absolute right-3 top-[38px] z-[10] cursor-pointer"
                        >
                            {showPassword ? (
                            <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                            ) : (
                            <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                            )}
                        </span>
                    </div>

                    <div className="w-full md:w-1/2 relative">
                        <label htmlFor="confirmPassword" className="font-semibold text-lg mb-2">
                            Confirm Password
                        </label>
                        <input
                            type={showConfirmPassword ? 'text' : 'password'}
                            name="confirmPassword"
                            className="w-full px-2 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-800 focus:border-transparent"
                            placeholder="Confirm your password"
                            value={formData.confirmPassword}
                            onChange={changeHandler}
                            required
                        />
                        <span
                            onClick={() => setShowConfirmPassword((prev) => !prev)}
                            className="absolute right-3 top-[38px] z-[10] cursor-pointer"
                        >
                            {showConfirmPassword ? (
                            <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                            ) : (
                            <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                            )}
                        </span>
                    </div>
                </div>


                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full bg-indigo-800 text-white py-2 mt-4 rounded-lg hover:bg-indigo-700 transition duration-300 ease-in-out"
                >
                    Sign Up
                </button>
            </form>

            <p className="text-center text-gray-800 mt-4">
            Already have an account?{' '}
            <Link to="/login" className="text-slate-100 hover:underline">
                Log in
            </Link>
            </p>
        </div>
        )
    }
    </div>
  );
}

export default SignupForm;
