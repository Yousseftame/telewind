import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import heroBg from "@/assets/hero-bg.jpg"; // replace with your right side image
import { useAuth } from "@/store/AuthContext/AuthContext";
import { AuthContextType, FormLoginProps } from "@/services/types";
import { useForm } from "react-hook-form";
import { axiosInstance } from "@/services/axiosInstance";
import { ADMIN_URL } from "@/services/apiEndpoints";
import { toast } from "@/components/ui/sonner";
import { isAxiosError } from "axios";
import validation from "@/services/validation";
import SubmitBtn from "@/components/shared/SubmitBtn";
// import telewindLogo from "@/assets/telewind-logo.png";

const Login = () => {

    const navigate = useNavigate();
   const { saveLoginData, loginData, getCurrentUser }: AuthContextType =useAuth();
  const [showPassword, setShowPassword] = useState(false);
   const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormLoginProps>({ mode: "onChange" });

  const handleTogglePassword = () => setShowPassword(prev => !prev);
  const onSubmit = async (data: FormLoginProps) => {
    try {
      const response = await axiosInstance.post(ADMIN_URL.LOGIN, data);
      // console.log(response);
      localStorage.setItem("token", response?.data?.token);
      await saveLoginData();
      await getCurrentUser();
      toast.success("Login success!");
      navigate("/dashboard", { replace: true });
    } catch (error) {
      // console.log(error?.response?.data?.message);
      if (isAxiosError(error))
        toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };


  return (
     

    <div className="flex h-screen">

      {/* Left Side: Form */}
      <div className="flex-1 flex items-center justify-center px-8 bg-gray-50">
        <div className="w-full max-w-md">
          

          {/* Header */}
          <div className="mt-6 text-center">
            <h2 className="text-3xl font-semibold text-gray-800">Sign in</h2>
            <p className="mt-2 text-gray-600">
              If you want to go to <span className="text-indigo-600"> Dashboard!</span>
              
            </p>
          </div>

          {/* Form */}

          <form className="mt-8 space-y-6"  onSubmit={handleSubmit(onSubmit)}>
            {/* Email */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Email Address
              </label>
              <input
                type="email"
                placeholder="Enter your Email"
                className="w-full px-4 py-3 rounded-lg bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                {...register("email", validation.EMAIL_VALIDATION)}
              />
               {errors.email && (
              <p className="text-red-600 pt-2" role="alert" style={{ fontSize: 12 }}>
                {errors.email.message}
              </p>
            )}
            </div>
           

            {/* Password */}
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your Password"
                  className="w-full px-4 py-3 rounded-lg bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  {...register(
                    "password",
                    validation.PASSWORD_VALIDATION("Password is Required")
                  )}
                />
                  {errors.password && (
              <p className=" text-red-600 pt-2" role="alert" style={{ fontSize: 12 }}>
                {errors.password.message}
              </p>
            )}
                <button
                  type="button"
                  onClick={handleTogglePassword}
                  className="absolute  right-3 top-1/2 transform -translate-y-1/2  text-gray-500"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            {/* text */}
            <div className="text-center">
              <Link
                to="/"
                className="text-gray-600 text-sm hover:underline"
              >
                Go Back to Home
              </Link>
            </div>

            {/* Submit Button */}
              <SubmitBtn  className=" custom-btn" isSubmitting={isSubmitting} title="Login" />

          </form>
        </div>
      </div>

      {/* Right Side: Image */}
      <div
        className="flex-1 relative hidden md:flex bg-cover bg-center"
        style={{ backgroundImage: `url(${heroBg})` }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/30 rounded-l-xl"></div>

        {/* Text at bottom-left */}
        <div className="absolute bottom-6 left-6  rounded-lg p-4 max-w-xs">
          <h2 className="text-2xl font-bold text-white mb-2">
            Sign in to  Dashboard
          </h2>
         
        </div>
      </div>
    </div>
  );
};

export default Login;
