import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import shape1 from '../assets/images/shape1.svg';
import dark_shape from '../assets/images/dark_shape.svg';
import shape2 from '../assets/images/shape2.svg';
import dark_shape1 from '../assets/images/dark_shape1.svg';
import shape3 from '../assets/images/shape3.svg';
import dark_shape2 from '../assets/images/dark_shape2.svg';
import registrationImg from '../assets/images/registration.png';
import registrationImgDark from '../assets/images/registration1.png';
import logo from '../assets/images/logo.svg';
import googleIcon from '../assets/images/google.svg';

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSignupMutation } from '../redux/authApi';
import toast from 'react-hot-toast';

const registrationSchema = z.object({
  firstName: z.string().min(2, "First name is too short"),
  lastName: z.string().min(2, "Last name is too short"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  repeatPassword: z.string().min(6, "Repeat password must be at least 6 characters"),
  terms: z.boolean().refine(val => val === true, "You must agree to terms & conditions")
}).refine((data) => data.password === data.repeatPassword, {
  message: "Passwords don't match",
  path: ["repeatPassword"],
});

type RegistrationFormData = z.infer<typeof registrationSchema>;

const RegistrationPage: React.FC = () => {
  const navigate = useNavigate();
  const [signup, { isLoading }] = useSignupMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegistrationFormData>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      terms: true
    }
  });

  const onSubmit = async (data: RegistrationFormData) => {
    try {
      // API expects { firstName, lastName, email, password }
      const payload = {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: data.password
      };
      
      await signup(payload).unwrap();
      toast.success("Registration successful! Please login.");
      navigate("/login");
    } catch (err: any) {
      console.error("Registration failed:", err);
      const message = err?.data?.message || err?.error || "Registration failed. Please try again";
      toast.error(message);
    }
  };

  useEffect(() => {
    if (errors.firstName) toast.error(errors.firstName.message!);
    else if (errors.lastName) toast.error(errors.lastName.message!);
    else if (errors.email) toast.error(errors.email.message!);
    else if (errors.password) toast.error(errors.password.message!);
    else if (errors.repeatPassword) toast.error(errors.repeatPassword.message!);
    else if (errors.terms) toast.error(errors.terms.message!);
  }, [errors]);

  return (
    <section className="_social_registration_wrapper _layout_main_wrapper min-h-screen py-[100px] bg-[#F0F2F5] dark:bg-[#112032] relative z-1 overflow-hidden">
      {/* Shapes */}
      <div className="_shape_one absolute top-0 left-0 -z-1">
        <img src={shape1} alt="" className="_shape_img block dark:hidden" />
        <img src={dark_shape} alt="" className="_dark_shape hidden dark:block" />
      </div>
      <div className="_shape_two absolute top-0 right-[20px] -z-1">
        <img src={shape2} alt="" className="_shape_img block dark:hidden" />
        <img src={dark_shape1} alt="" className="_dark_shape _dark_shape_opacity hidden dark:block opacity-100" />
      </div>
      <div className="_shape_three absolute bottom-0 right-[327px] -z-1 xl:block hidden">
        <img src={shape3} alt="" className="_shape_img block dark:hidden" />
        <img src={dark_shape2} alt="" className="_dark_shape _dark_shape_opacity hidden dark:block opacity-100" />
      </div>

      <div className="_social_registration_wrap">
        <div className="container max-w-[1140px] mx-auto px-4">
          <div className="row flex flex-wrap -mx-4 items-center">
            <div className="col-xl-8 col-lg-8 col-md-12 col-sm-12 w-full lg:w-2/3 px-4">
              <div className="_social_registration_right">
                <div className="_social_registration_right_image block dark:hidden">
                  <img src={registrationImg} alt="Image" className="w-full" />
                </div>
                <div className="_social_registration_right_image_dark hidden dark:block">
                  <img src={registrationImgDark} alt="Image" className="w-full" />
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 w-full lg:w-1/3 px-4">
              <div className="_social_registration_content bg-white dark:bg-[#232E42] p-[48px] rounded-[6px] shadow-sm">
                <div className="_social_registration_right_logo _mar_b28 mb-[28px] flex justify-center">
                  <img src={logo} alt="Image" className="_right_logo max-w-[161px]" />
                </div>
                <p className="_social_registration_content_para _mar_b8 mb-[8px] text-[16px] text-[#2D3748] dark:text-gray-400 text-center">Get Started Now</p>
                <h4 className="_social_registration_content_title _titl4 _mar_b50 mb-[50px] text-[28px] font-medium text-[#312000] dark:text-white text-center">Registration</h4>
                
                <button type="button" className="_social_registration_content_btn _mar_b40 mb-[40px] w-full border border-[#F0F2F5] dark:border-[#2D3748] bg-white dark:bg-transparent rounded-[6px] py-[12px] px-[20px] flex items-center justify-center transition-all hover:shadow-md">
                  <img src={googleIcon} alt="Image" className="_google_img max-w-[20px] mr-[8px]" />
                  <span className="font-medium text-[16px] text-[#312000] dark:text-white">Register with google</span>
                </button>

                <div className="_social_registration_content_bottom_txt _mar_b40 mb-[40px] text-center relative before:content-[''] before:absolute before:left-0 before:top-1/2 before:w-[108px] before:h-[2px] before:bg-[#DFDFDF] dark:before:bg-[#4A5568] after:content-[''] after:absolute after:right-0 after:top-1/2 after:w-[108px] after:h-[2px] after:bg-[#DFDFDF] dark:after:bg-[#4A5568]">
                  <span className="bg-white dark:bg-[#232E42] px-[10px] relative z-1 text-[14px] text-[#C4C4C4]">Or</span>
                </div>

                <form className="_social_registration_form" onSubmit={handleSubmit(onSubmit)}>
                  <div className="row flex flex-wrap -mx-4">
                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 w-full px-4">
                      <div className="_social_registration_form_input _mar_b14 mb-[14px]">
                        <label className="_social_registration_label _mar_b8 mb-[8px] block font-medium text-[16px] text-[#4A5568] dark:text-gray-300">First Name</label>
                        <input {...register("firstName")} type="text" className="form-control _social_registration_input w-full h-[48px] bg-white dark:bg-[#112032] border border-[#E8E8E8] dark:border-[#2D3748] rounded-[6px] px-[16px] focus:outline-none focus:border-[#1890FF] dark:text-white" />
                      </div>
                    </div>
                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 w-full px-4">
                      <div className="_social_registration_form_input _mar_b14 mb-[14px]">
                        <label className="_social_registration_label _mar_b8 mb-[8px] block font-medium text-[16px] text-[#4A5568] dark:text-gray-300">Last Name</label>
                        <input {...register("lastName")} type="text" className="form-control _social_registration_input w-full h-[48px] bg-white dark:bg-[#112032] border border-[#E8E8E8] dark:border-[#2D3748] rounded-[6px] px-[16px] focus:outline-none focus:border-[#1890FF] dark:text-white" />
                      </div>
                    </div>
                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 w-full px-4">
                      <div className="_social_registration_form_input _mar_b14 mb-[14px]">
                        <label className="_social_registration_label _mar_b8 mb-[8px] block font-medium text-[16px] text-[#4A5568] dark:text-gray-300">Email</label>
                        <input {...register("email")} type="email" className="form-control _social_registration_input w-full h-[48px] bg-white dark:bg-[#112032] border border-[#E8E8E8] dark:border-[#2D3748] rounded-[6px] px-[16px] focus:outline-none focus:border-[#1890FF] dark:text-white" />
                      </div>
                    </div>
                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 w-full px-4">
                      <div className="_social_registration_form_input _mar_b14 mb-[14px]">
                        <label className="_social_registration_label _mar_b8 mb-[8px] block font-medium text-[16px] text-[#4A5568] dark:text-gray-300">Password</label>
                        <input {...register("password")} type="password" title="Password" className="form-control _social_registration_input w-full h-[48px] bg-white dark:bg-[#112032] border border-[#E8E8E8] dark:border-[#2D3748] rounded-[6px] px-[16px] focus:outline-none focus:border-[#1890FF] dark:text-white" />
                      </div>
                    </div>
                    <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 w-full px-4">
                      <div className="_social_registration_form_input _mar_b14 mb-[14px]">
                        <label className="_social_registration_label _mar_b8 mb-[8px] block font-medium text-[16px] text-[#4A5568] dark:text-gray-300">Repeat Password</label>
                        <input {...register("repeatPassword")} type="password" title="Repeat Password" className="form-control _social_registration_input w-full h-[48px] bg-white dark:bg-[#112032] border border-[#E8E8E8] dark:border-[#2D3748] rounded-[6px] px-[16px] focus:outline-none focus:border-[#1890FF] dark:text-white" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="row flex flex-wrap -mx-4">
                    <div className="col-lg-12 col-xl-12 col-md-12 col-sm-12 w-full px-4">
                      <div className="form-check _social_registration_form_check flex items-center">
                        <input {...register("terms")} className="form-check-input _social_registration_form_check_input w-[16px] h-[16px] border border-[#1890FF] rounded-full appearance-none checked:bg-[#1890FF] checked:border-transparent relative checked:after:content-[''] checked:after:absolute checked:after:top-1/2 checked:after:left-1/2 checked:after:-translate-x-1/2 checked:after:-translate-y-1/2 checked:after:w-[6px] checked:after:h-[6px] checked:after:bg-white checked:after:rounded-full cursor-pointer" type="checkbox" id="flexRadioDefault2" />
                        <label className="form-check-label _social_registration_form_check_label ml-[8px] text-[14px] text-[#2D3748] dark:text-gray-400 cursor-pointer" htmlFor="flexRadioDefault2">I agree to terms & conditions</label>
                      </div>
                    </div>
                  </div>

                  <div className="row flex flex-wrap -mx-4">
                    <div className="col-lg-12 col-md-12 col-xl-12 col-sm-12 w-full px-4">
                      <div className="_social_registration_form_btn _mar_t40 _mar_b60 mt-[40px] mb-[60px]">
                        <button disabled={isLoading} type="submit" className="_social_registration_form_btn_link _btn1 w-full bg-[#1890FF] text-white py-[12px] rounded-[6px] font-medium text-[16px] transition-all hover:shadow-lg">
                          {isLoading ? "Registering..." : "Register Now"}
                        </button>
                      </div>
                    </div>
                  </div>
                </form>

                <div className="row flex flex-wrap -mx-4">
                  <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 w-full px-4">
                    <div className="_social_registration_bottom_txt text-center">
                      <p className="_social_registration_bottom_txt_para text-[14px] text-[#2D3748] dark:text-gray-400">
                        Already have an account? <Link to="/login" className="text-[#1890FF]">Login</Link>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RegistrationPage;
