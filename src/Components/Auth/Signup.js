import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { setSignupData, setLoading } from "../../redux/slices/authSlice";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import axios from "axios";

function SignupForm() {
  const loading = useSelector((state) => state.auth.loading);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("value of loading is", loading);
  }, [loading]);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    accountType: "Student", // default accountType is Student
  });
  const [formError, setFormError] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    dispatch(setLoading(true));
    const newErrors = {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    };

    let hasError = false;

    // Validation
    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
      hasError = true;
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
      hasError = true;
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
      hasError = true;
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
      hasError = true;
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Confirm your password";
      hasError = true;
    }

    if (
      formData.password &&
      formData.confirmPassword &&
      formData.password !== formData.confirmPassword
    ) {
      toast.error("passwords do not match");
      hasError = true;
    }

    // Set error state
    if (hasError) {
      setFormError(newErrors);
      dispatch(setLoading(false));
      return;
    }

    dispatch(setSignupData(formData));

    try {
      const response = await axios.post(
        "http://localhost:4000/api/v1/auth/sendotp",
        { email: formData.email }
      );

      if (response.status === 200) {
        toast.success("OTP sent!");
        navigate("/verify-email");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
      dispatch(setLoading(false));
      return;
    }

    dispatch(setLoading(false));
    

    // Clear form only after successful OTP send
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      accountType: "Student",
    });
  };

  return (
    <div className="bg-[#f2f0f7] py-10 flex items-center justify-center ">
      {loading ? (
        <div className="w-[100wh] h-[70vh] bg-[#f2f0f7] flex justify-center items-center">
          {" "}
          <div className="spinner"></div>
        </div>
      ) : (
        <div className="w-11/12 max-w-[800px] mx-auto rounded-md bg-gradient-to-b from-indigo-200 to bg-indigo-400 py-12">
          <h2 className="text-4xl mb-6 text-center font-semibold">
            Create Your Account
          </h2>

          {/* Tabs for Student and Owner */}
          <div className="flex justify-center mt-10">
            <button
              className={`px-8 py-3 mx-2 rounded-lg font-semibold text-lg ${
                formData.accountType === "Student"
                  ? "bg-indigo-800 text-white"
                  : "bg-indigo-400"
              }`}
              onClick={() => handleTabChange("Student")}
            >
              Student
            </button>
            <button
              className={`px-8 py-3 mx-2 rounded-lg font-semibold text-lg ${
                formData.accountType === "Owner"
                  ? "bg-indigo-800 text-white"
                  : "bg-indigo-400"
              }`}
              onClick={() => handleTabChange("Owner")}
            >
              Owner
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-4 md:p-8">
            {/* First Name and Last Name */}
            <div className="flex flex-col md:flex-row justify-between mb-4 gap-4">
              <div className="w-full md:w-1/2">
                <label
                  htmlFor="firstName"
                  className="font-semibold text-lg mb-2"
                >
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
                <p className="text-[red] text-sm">{formError.firstName}</p>
              </div>

              <div className="w-full md:w-1/2">
                <label
                  htmlFor="lastName"
                  className="font-semibold text-lg mb-2"
                >
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
                <p className="text-[red] text-sm">{formError.lastName}</p>
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
              <p className="text-[red] text-sm">{formError.email}</p>
            </div>

            {/* Create Password and Confirm Password */}
            <div className="flex flex-col md:flex-row justify-between mb-4 gap-4">
              <div className="w-full md:w-1/2 relative">
                <label
                  htmlFor="password"
                  className="font-semibold text-lg mb-2"
                >
                  Create Password
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  className="w-full px-2 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-800 focus:border-transparent"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={changeHandler}
                  required
                />
                <p className="text-[red] text-sm">{formError.password}</p>
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
                <label
                  htmlFor="confirmPassword"
                  className="font-semibold text-lg mb-2"
                >
                  Confirm Password
                </label>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  className="w-full px-2 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-800 focus:border-transparent"
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={changeHandler}
                  required
                />
                <p className="text-[red] text-sm">
                  {formError.confirmPassword}
                </p>
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
              disabled={loading}
              type="submit"
              className="w-full bg-indigo-800 text-white py-2 mt-4 rounded-lg hover:bg-indigo-700 transition duration-300 ease-in-out"
            >
              Sign Up
            </button>
          </form>

          <p className="text-center text-gray-800 mt-4">
            Already have an account?{" "}
            <Link to="/login" className="text-slate-100 hover:underline">
              Log in
            </Link>
          </p>
        </div>
      )}
    </div>
  );
}

export default SignupForm;
