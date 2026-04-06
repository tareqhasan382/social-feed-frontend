import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import shape1 from '../assets/images/shape1.svg';
import dark_shape from '../assets/images/dark_shape.svg';
import shape2 from '../assets/images/shape2.svg';
import dark_shape1 from '../assets/images/dark_shape1.svg';
import shape3 from '../assets/images/shape3.svg';
import dark_shape2 from '../assets/images/dark_shape2.svg';
import loginImg from '../assets/images/login.png';
import logo from '../assets/images/logo.svg';
import googleIcon from '../assets/images/google.svg';

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSelector } from 'react-redux';
import type { RootState } from '../redux/store';
import { useLoginMutation } from '../redux/authApi';

import toast from 'react-hot-toast';

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormData = z.infer<typeof loginSchema>;

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const auth = useSelector((state: RootState) => state.auth);

  const from = location.state?.from?.pathname || "/feed";

  const [showPassword, setShowPassword] = useState(false);

  const [login, { isLoading }] = useLoginMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  //  Handle form submit
  const onSubmit = async (data: LoginFormData) => {
    try {
      await login(data).unwrap();

      toast.success("Login successful 🎉");

      // redirect after login
      navigate(from, { replace: true });

    } catch (err: any) {
      console.error("Login failed", err);

      const message =
        err?.data?.message ||
        err?.error ||
        "Login failed. Please try again";

      toast.error(message);
    }
  };

  // Show validation errors via toast
  useEffect(() => {
    if (errors.email) toast.error(errors.email.message!);
    if (errors.password) toast.error(errors.password.message!);
  }, [errors]);

  // Optional: auto redirect if already logged in
  useEffect(() => {
    if (auth?.accessToken) {
      navigate("/feed");
    }
  }, [auth, navigate]);

  return (
    <section className="_social_login_wrapper _layout_main_wrapper min-h-screen py-[100px] bg-[#F0F2F5] dark:bg-[#112032] relative z-1 overflow-hidden">
      
      {/* Shapes */}
      <div className="_shape_one absolute top-0 left-0 -z-1">
        <img src={shape1} alt="" className="_shape_img block dark:hidden" />
        <img src={dark_shape} alt="" className="_dark_shape hidden dark:block" />
      </div>
      <div className="_shape_two absolute top-0 right-[20px] -z-1">
        <img src={shape2} alt="" className="_shape_img block dark:hidden" />
        <img src={dark_shape1} alt="" className="_dark_shape hidden dark:block opacity-100" />
      </div>
      <div className="_shape_three absolute bottom-0 right-[327px] -z-1 xl:block hidden">
        <img src={shape3} alt="" className="_shape_img block dark:hidden" />
        <img src={dark_shape2} alt="" className="_dark_shape hidden dark:block opacity-100" />
      </div>

      <div className="_social_login_wrap">
        <div className="container max-w-[1140px] mx-auto px-4">
          <div className="row flex flex-wrap -mx-4 items-center">

            {/* Left Image */}
            <div className="w-full lg:w-2/3 px-4">
              <img src={loginImg} alt="Image" className="max-w-[633px] w-full" />
            </div>

            {/* Form */}
            <div className="w-full lg:w-1/3 px-4">
              <div className="bg-white dark:bg-[#232E42] p-[48px] rounded-[6px] shadow-sm">

                <div className="mb-[28px] flex justify-center">
                  <img src={logo} alt="Logo" className="max-w-[161px]" />
                </div>

                <p className="mb-[8px] text-center">Welcome back</p>
                <h4 className="mb-[50px] text-center text-[28px] font-medium">
                  Login to your account
                </h4>

                {/* Google */}
                <button type="button" className="mb-[40px] w-full border rounded-[6px] py-[12px] flex items-center justify-center">
                  <img src={googleIcon} alt="" className="max-w-[20px] mr-[8px]" />
                  <span>Or sign-in with google</span>
                </button>

                {/* Form */}
                <form onSubmit={handleSubmit(onSubmit)}>

                  {/* Email */}
                  <div className="mb-[14px]">
                    <label>Email</label>
                    <input
                      {...register("email")}
                      type="email"
                      className="w-full h-[48px] border rounded px-[16px]"
                    />
                  </div>

                  {/* Password */}
                  <div className="mb-[14px] relative">
                    <label>Password</label>
                    <input
                      {...register("password")}
                      type={showPassword ? "text" : "password"}
                      className="w-full h-[48px] border rounded px-[16px]"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-[16px] top-[38px] text-sm text-gray-500"
                    >
                      {showPassword ? "Hide" : "Show"}
                    </button>
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-[#1890FF] text-white py-[12px] rounded"
                  >
                    {isLoading ? "Logging in..." : "Login now"}
                  </button>
                </form>

                {/* Register */}
                <p className="text-center mt-[20px]">
                  Don’t have an account?{" "}
                  <Link to="/register" className="text-[#1890FF]">
                    Create New Account
                  </Link>
                </p>

              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;