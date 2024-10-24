import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { FaArrowLeft } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import OTPInput from "otp-input-react";
import axios from 'axios';
import { toast } from "react-hot-toast";
import { setLoading } from "../redux/slices/profileSlice";

export default function VerifyEmail() {
    const [otp, setOtp] = useState("");
    const { loading } = useSelector((state) => state.auth);
    const { signupData } = useSelector((state) => state.auth);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if (!signupData) {
            navigate("/signup");
        }
    }, []);

    async function handleOnSubmit(e) {
        e.preventDefault();
        
        // Ensure OTP length is correct
        if (otp.length !== 6) {
            toast.error("OTP must be 6 digits");
            return;
        }
        dispatch(setLoading(true));
        const toastId=toast.loading("Loading...");
        try {
            const payload = { ...signupData, otp };
            const response = await axios.post('http://localhost:4000/api/v1/auth/signup', payload);
            
            if (response.status === 200) {
                toast.success('Signup successful!');
                toast.success('Login now!');

                navigate('/login'); // Navigate after success
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Something went wrong');
            console.error('Error:', error);
        }
        console.log("value of loading is",loading);
        dispatch(setLoading(false));
        toast.dismiss(toastId);
    }

    async function resendOtp(){

        dispatch(setLoading(true));
        
        // send otp
        try {
                
                const response =await axios.post('http://localhost:4000/api/v1/auth/sendotp', { email: signupData.email });

                if (response.status === 200) {
                    // Handle successful signup
                    console.log('Otp send successfully:', response);
                    toast.success('OTP sent!');
                    // Navigate to the next step (e.g., OTP verification)
                    
                }
            } 
            catch (error) {
                // Handle errors from the backend
                toast.error(error.response?.data?.message || 'Something went wrong');
                console.error('Error:', error);
            }
           dispatch(setLoading(false)); 
    
    }
    return (
        <div className="max-w-[1200px] w-11/12 mx-auto flex justify-center items-center min-h-[calc(100vh-3rem)]">
            {loading ? (
                <div className="spinner"></div>
            ) : (
                <div className="flex flex-col gap-4 max-w-[500px]  mx-auto items-center bg-gradient-to-b from-indigo-200 to bg-indigo-400 p-6 rounded-md">
                    <h2 className="text-3xl sm:text-4xl text-richblack-5 font-semibold ">Verify email</h2>
                    <p className="text-richblack-100 text-center ">A verification code has been sent to you. Enter the code below.</p>

                    <form onSubmit={handleOnSubmit} className="w-full flex flex-col items-center gap-6 mt-4">
                        <OTPInput
                            value={otp}
                            onChange={setOtp}
                            autoFocus
                            OTPLength={6}
                            otpType="number"
                            disabled={false}
                            inputClassName="rounded-md my-2 outline-indigo-800 focus:outline-2 outline-offset-2"
                            secure
                        />

                        <button
                            type="submit"
                            className="w-full   rounded-md py-2 font-semibold bg-indigo-800 text-white
                                    hover:scale-95 transition-all duration-200 mt-2"
                        >
                            Verify email
                        </button>
                    </form>

                    <div className="flex w-full  justify-between items-center mt-2">
                        <Link to="/login">
                            <p className=" flex items-center  gap-1 text-sm font-semibold">
                                <span><FaArrowLeft /></span>Back to Login
                            </p>
                        </Link>
                        <button onClick={resendOtp}
                         className="text-sm font-semibold hover:text-indigo-800">Resend OTP</button>
                    </div>
                </div>
            )}
        </div>
    );
}
