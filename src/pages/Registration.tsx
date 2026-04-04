import React from 'react';
import registrationImg from '../assets/images/registration.png';
import registrationImgDark from '../assets/images/registration1.png';
import logo from '../assets/images/logo.svg';
import googleIcon from '../assets/images/google.svg';
import shape1 from '../assets/images/shape1.svg';
import shape2 from '../assets/images/shape2.svg';
import shape3 from '../assets/images/shape3.svg';
import darkShape from '../assets/images/dark_shape.svg';
import darkShape1 from '../assets/images/dark_shape1.svg';
import darkShape2 from '../assets/images/dark_shape2.svg';

const Registration: React.FC = () => {
  return (
    <section className="relative min-h-screen bg-white overflow-hidden font-poppins">
      {/* Background Shapes */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-0 left-0">
          <img src={shape1} alt="" className="w-full h-full" />
          <img src={darkShape} alt="" className="hidden absolute top-0 left-0 w-full h-full" />
        </div>
        <div className="absolute top-0 right-0">
          <img src={shape2} alt="" className="w-full h-full" />
          <img src={darkShape1} alt="" className="hidden absolute top-0 right-0 w-full h-full opacity-50" />
        </div>
        <div className="absolute bottom-0 left-0">
          <img src={shape3} alt="" className="w-full h-full" />
          <img src={darkShape2} alt="" className="hidden absolute bottom-0 left-0 w-full h-full opacity-50" />
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="flex flex-wrap items-center">
          {/* Left Side - Image */}
          <div className="w-full lg:w-2/3 hidden lg:block">
            <div className="flex justify-center relative">
              <img src={registrationImg} alt="Registration Illustration" className="max-w-full h-auto" />
              <img src={registrationImgDark} alt="Registration Illustration Dark" className="hidden absolute top-0 left-0 max-w-full h-auto" />
            </div>
          </div>

          {/* Right Side - Registration Form */}
          <div className="w-full lg:w-1/3">
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <div className="mb-7">
                <img src={logo} alt="Buddy Script Logo" className="w-32" />
              </div>
              
              <p className="text-gray-600 mb-2">Get Started Now</p>
              <h4 className="text-2xl font-bold text-gray-900 mb-12">Registration</h4>
              
              <button 
                type="button" 
                className="w-full flex items-center justify-center border border-gray-300 rounded-lg py-3 mb-10 hover:bg-gray-50 transition-colors"
              >
                <img src={googleIcon} alt="Google" className="w-5 h-5 mr-3" />
                <span className="text-gray-700">Register with google</span>
              </button>
              
              <div className="relative flex items-center mb-10">
                <div className="flex-grow border-t border-gray-300"></div>
                <span className="flex-shrink mx-4 text-gray-400">Or</span>
                <div className="flex-grow border-t border-gray-300"></div>
              </div>
              
              <form>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2 font-medium">Email</label>
                  <input 
                    type="email" 
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your email"
                  />
                </div>
                
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2 font-medium">Password</label>
                  <input 
                    type="password" 
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your password"
                  />
                </div>
                
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2 font-medium">Repeat Password</label>
                  <input 
                    type="password" 
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Repeat your password"
                  />
                </div>
                
                <div className="flex items-center mb-10">
                  <input 
                    type="checkbox" 
                    id="terms" 
                    className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500 rounded"
                    defaultChecked
                  />
                  <label htmlFor="terms" className="ml-2 text-sm text-gray-600">I agree to terms & conditions</label>
                </div>
                
                <button 
                  type="submit" 
                  className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition-colors mb-14"
                >
                  Register now
                </button>
              </form>
              
              <p className="text-center text-gray-600">
                Already have an account? <a href="#" className="text-blue-600 font-semibold hover:underline">Login Now</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Registration;
