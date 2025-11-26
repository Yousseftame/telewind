import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";
import { useAuth } from "@/store/AuthContext/AuthContext";
import { AuthContextType, FormLoginProps } from "@/services/types";
import { useForm } from "react-hook-form";
import { axiosInstance } from "@/services/axiosInstance";
import { ADMIN_URL } from "@/services/apiEndpoints";
import { toast } from "@/components/ui/sonner";
import { isAxiosError } from "axios";
import validation from "@/services/validation";
import SubmitBtn from "@/components/shared/SubmitBtn";
import logoImage from "@/assets/telewind-logo.png";

const Login = () => {
  const navigate = useNavigate();
  const { saveLoginData, loginData }: AuthContextType = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormLoginProps>({ mode: "onChange" });

  const handleTogglePassword = () => setShowPassword((prev) => !prev);

  const onSubmit = async (data: FormLoginProps) => {
    try {
      const response = await axiosInstance.post(ADMIN_URL.LOGIN, data);
      const token = response.data?.data?.token;
      if (!token) {
        toast.error("Login failed: token not found");
        return;
      }
      localStorage.setItem("token", token);
      saveLoginData();
      toast.success("Login success!");
      navigate("/adminProduct", { replace: true });
    } catch (error) {
      if (isAxiosError(error)) {
        toast.error(error.response?.data?.message || "Something went wrong");
      } else {
        toast.error("Unexpected error");
      }
    }
  };

  return (
    <div className="flex h-screen bg-gradient-to-br  p-4 md:p-6">
      {/* Left Side: Form */}
      <div className="flex-1 flex items-center justify-center px-6 md:px-12 bg-white rounded-3xl md:rounded-r-none ">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="mt-6 text-center">
            <img className="w-1/2 mx-auto" src={logoImage} alt="" />
            <h2 className="text-3xl font-bold text-gray-800">Welcome back</h2>
            <p className="mt-2 text-gray-500">
              Sign in to access your{" "}
              <span className="text-indigo-600 font-medium">Dashboard</span>
            </p>
          </div>

          {/* Form */}
          <form className="mt-10 space-y-5" onSubmit={handleSubmit(onSubmit)}>
            {/* Email */}
            <div>
              <label className="block text-gray-700 font-medium mb-2 text-sm">
                Email Address
              </label>
              <input
                type="email"
                placeholder="Enter your Email"
                className="w-full px-4 py-3.5 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent placeholder:text-gray-400"
                {...register("email", validation.EMAIL_VALIDATION)}
              />
              {errors.email && (
                <p
                  className="text-red-500 pt-2 text-xs font-medium"
                  role="alert"
                >
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block text-gray-700 font-medium mb-2 text-sm">
                Password
              </label>
              <div className="relative flex items-center">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your Password"
                  className="w-full px-4 py-3.5 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent pr-12 placeholder:text-gray-400"
                  {...register(
                    "password",
                    validation.PASSWORD_VALIDATION("Password is Required")
                  )}
                />
                <button
                  type="button"
                  onClick={handleTogglePassword}
                  className="absolute right-4 flex items-center justify-center text-gray-400 hover:text-indigo-600 p-0"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {errors.password && (
                <p
                  className="text-red-500 pt-2 text-xs font-medium"
                  role="alert"
                >
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Link */}
            <div className="text-center pt-2">
              <Link
                to="/"
                className="text-gray-500 text-sm hover:text-indigo-600 font-medium"
              >
                ← Go Back to Home
              </Link>
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <SubmitBtn
                className="w-full py-3.5 rounded-xl bg-[#010A11]  text-white font-semibold shadow-lg shadow-indigo-200 "
                isSubmitting={isSubmitting}
                title="Sign In"
              />
            </div>
          </form>

          {/* Footer */}
          <p className="mt-8 text-center text-gray-400 text-sm">
            Secure login powered by TeleWind
          </p>
        </div>
      </div>

      {/* Right Side: Image */}
      <div
        className="flex-1 relative hidden md:flex rounded-3xl overflow-hidden ml-6 shadow-2xl bg-cover bg-center"
        style={{ backgroundImage: `url(${heroBg})` }}
      >
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>

        {/* Decorative elements */}
        <div className="absolute top-6 right-6 w-20 h-20 border-2 border-white/20 rounded-2xl"></div>
        <div className="absolute top-16 right-16 w-12 h-12 border-2 border-white/10 rounded-xl"></div>

        {/* Text at bottom-left */}
        <div className="absolute bottom-8 left-8 right-8">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
            <h2 className="text-2xl font-bold text-white mb-2">
              Welcome to Dashboard
            </h2>
            <p className="text-white/80 text-sm">
              Manage your products, track categories, and grow your business.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
