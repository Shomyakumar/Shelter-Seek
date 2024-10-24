

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { setLoading,setUser } from '../../redux/slices/profileSlice';
import { setToken } from '../../redux/slices/authSlice';
import { toast } from "react-hot-toast"
import axios from 'axios';
import { useNavigate } from "react-router-dom"
import { useDispatch,useSelector } from "react-redux"

function LoginForm() {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { loading } = useSelector((state) => state.auth);
    const [formData,setFormData]=useState({email:"",password:""});
    const [showPassword,setShowPassword]=useState(false);

    const changeHandler=(e)=>{
        setFormData((prevData)=>(
            {
                ...prevData,
                [e.target.name]:e.target.value,
            }
        ))
        
        console.log(formData);
    }
  
    
    const handleSubmit = async(e) => {

        e.preventDefault();
        dispatch(setLoading(true));
        const toastId=toast.loading("Loading...")
        try {
            
            const response = await axios.post('http://localhost:4000/api/v1/auth/login', formData);
            
            if (response.status === 200) {
                toast.success('Login successful!');

                console.log("response data is",response.data);

                dispatch(setToken(response.data.token));

                const userImage = response.data?.user?.image
                ? response.data.user.image
                : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.existingUser.firstName}
                 ${response.data.existingUser.lastName}`;
                 
                dispatch(setUser({ ...response.data.user, image: userImage }));
                localStorage.setItem("token", JSON.stringify(response.data.token));
                localStorage.setItem("user", JSON.stringify(response.data.user));
                navigate("/profile");
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Something went wrong');
            console.error('Error:', error);
        }
        console.log("value of loading is",loading);
        dispatch(setLoading(false));
        toast.dismiss(toastId);
    };

  return (

    <div className="bg-[#f2f0f7]   to-indigo-100 py-10 flex items-center justify-center min-h-[75vh]">
        <div className="w-11/12 max-w-[600px] mx-auto rounded-md bg-gradient-to-b from-indigo-200 to bg-indigo-400 py-12 ">
            <div>
                <h2 className="text-4xl mb-6  text-center font-semibold">
                Login to Your Account
                </h2>
                <form  onSubmit={handleSubmit} className='p-4 md:p-8'>
                    {/* Email Input */}
                    <div className="mb-4">
                        <label htmlFor="email" className="font-semibold text-lg mb-2">
                        Email Address
                        </label>

                        <input
                        type="email"
                        name="email"
                        className="w-full px-2 py-2 border rounded-lg  focus:outline-none focus:ring-2 focus:ring-indigo-800 focus:border-transparent"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={changeHandler}
                        required
                        />
                </div>
                {/* Password Input */}
                <div className="mb-4 relative">
                    <label htmlFor="password" className="font-semibold text-lg mb-2">
                    Password
                    </label>
                    <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-800 focus:border-transparent"
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
                    <Link to="/forgot-password">
                    <p className="mt-1 ml-auto max-w-max text-xs text-indigo-800">
                        Forgot Password
                    </p>
                    </Link>
                </div>
                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full bg-indigo-800 text-white py-2 mt-4 rounded-lg hover:bg-indigo-700 transition duration-300 ease-in-out">
                        Log In
                    </button>
                </form>
                <p className="text-center text-gray-800  mt-4">
                    Don't have an account?{' '}
                    <Link to="/signup" className="text-slate-100 hover:underline">
                        Sign up
                    </Link>
                </p>
            </div>
      </div>
    </div>
  );
}

export default LoginForm;
