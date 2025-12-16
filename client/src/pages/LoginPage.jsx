import React, { useState } from "react";
import { Link } from "react-router-dom";

const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    nationality: "",
    birthday: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setErrors({});
    setFormData({
      firstname: "",
      lastname: "",
      email: "",
      phone: "",
      nationality: "",
      birthday: "",
      password: "",
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Clear error when user types
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[0-9])/;

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (!isLogin) {
      if (formData.password.length < 8) {
        newErrors.password = "Password must be at least 8 characters";
      } else if (!passwordRegex.test(formData.password)) {
        newErrors.password =
          "Password must contain at least 1 letter and 1 number";
      }
    }

    if (!isLogin) {
      if (!formData.firstname) newErrors.firstname = "First name is required";
      if (!formData.lastname) newErrors.lastname = "Last name is required";
      if (!formData.birthday) {
        newErrors.birthday = "Birthday is required";
      } else {
        const birthDate = new Date(formData.birthday);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
          age--;
        }
        if (age < 13) {
          newErrors.birthday = "You must be at least 13 years old";
        }
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Form submitted:", formData);
      // TODO: Call backend API
    }
  };

  return (
    <div className="font-display bg-background-light dark:bg-background-dark text-[#1c1c0d] dark:text-[#fcfcf8] min-h-screen flex flex-col relative overflow-hidden selection:bg-primary selection:text-black transition-colors duration-300">
      {/* Background Decorative Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-5%] w-96 h-96 bg-primary/20 dark:bg-primary/10 rounded-full blur-[80px] animate-blob"></div>
        <div className="absolute bottom-[-10%] right-[-5%] w-[500px] h-[500px] bg-[#9e9d47]/20 dark:bg-[#9e9d47]/10 rounded-full blur-[100px] animate-blob animation-delay-2000"></div>
      </div>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center p-4 sm:p-6 relative z-10">
        <div className="glass-card w-full max-w-[480px] p-8 sm:p-12 rounded-lg shadow-[0_8px_32px_0_rgba(31,38,135,0.07)] bg-white/65 backdrop-blur-xl border border-white/40 dark:bg-[#23220f]/65 dark:border-white/10">
          {/* Header Section */}
          <div className="flex flex-col items-center mb-8">
            <div className="size-12 bg-primary rounded-full flex items-center justify-center mb-4 shadow-sm text-[#1c1c0d]">
              <svg
                className="w-7 h-7"
                fill="none"
                viewBox="0 0 48 48"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M44 11.2727C44 14.0109 39.8386 16.3957 33.69 17.6364C39.8386 18.877 44 21.2618 44 24C44 26.7382 39.8386 29.123 33.69 30.3636C39.8386 31.6043 44 33.9891 44 36.7273C44 40.7439 35.0457 44 24 44C12.9543 44 4 40.7439 4 36.7273C4 33.9891 8.16144 31.6043 14.31 30.3636C8.16144 29.123 4 26.7382 4 24C4 21.2618 8.16144 18.877 14.31 17.6364C8.16144 16.3957 4 14.0109 4 11.2727C4 7.25611 12.9543 4 24 4C35.0457 4 44 7.25611 44 11.2727Z"
                  fill="currentColor"
                ></path>
              </svg>
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-[#1c1c0d] dark:text-white">
              {isLogin ? "Welcome Back" : "Create Account"}
            </h2>
            <p className="text-[#1c1c0d]/70 dark:text-white/70 text-base mt-2 text-center">
              {isLogin
                ? "Enter your details to access your library."
                : "Sign up to start your reading journey."}
            </p>
          </div>

          {/* Form */}
          <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
            {!isLogin && (
              <>
                <div className="flex gap-4">
                  <div className="group flex-1">
                    <label
                      className="block text-sm font-bold text-[#1c1c0d] dark:text-white mb-2 ml-1"
                      htmlFor="firstname"
                    >
                      First Name <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        className={`form-input block w-full px-4 py-3.5 rounded-full bg-white/70 dark:bg-black/20 border-0 ring-1 ring-inset ${
                          errors.firstname
                            ? "ring-red-500"
                            : "ring-[#e5e5dc] dark:ring-white/20"
                        } placeholder:text-[#9e9d47] focus:ring-2 focus:ring-inset focus:ring-primary focus:bg-white dark:focus:bg-black/40 sm:text-sm sm:leading-6 text-[#1c1c0d] dark:text-white transition-all duration-200`}
                        id="firstname"
                        name="firstname"
                        placeholder="John"
                        type="text"
                        value={formData.firstname}
                        onChange={handleChange}
                      />
                      {errors.firstname && (
                        <p className="text-red-500 text-xs mt-1 ml-2">
                          {errors.firstname}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="group flex-1">
                    <label
                      className="block text-sm font-bold text-[#1c1c0d] dark:text-white mb-2 ml-1"
                      htmlFor="lastname"
                    >
                      Last Name <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        className={`form-input block w-full px-4 py-3.5 rounded-full bg-white/70 dark:bg-black/20 border-0 ring-1 ring-inset ${
                          errors.lastname
                            ? "ring-red-500"
                            : "ring-[#e5e5dc] dark:ring-white/20"
                        } placeholder:text-[#9e9d47] focus:ring-2 focus:ring-inset focus:ring-primary focus:bg-white dark:focus:bg-black/40 sm:text-sm sm:leading-6 text-[#1c1c0d] dark:text-white transition-all duration-200`}
                        id="lastname"
                        name="lastname"
                        placeholder="Doe"
                        type="text"
                        value={formData.lastname}
                        onChange={handleChange}
                      />
                      {errors.lastname && (
                        <p className="text-red-500 text-xs mt-1 ml-2">
                          {errors.lastname}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="group">
                  <label
                    className="block text-sm font-bold text-[#1c1c0d] dark:text-white mb-2 ml-1"
                    htmlFor="phone"
                  >
                    Phone
                  </label>
                  <div className="relative">
                    <input
                      className="form-input block w-full px-4 py-3.5 rounded-full bg-white/70 dark:bg-black/20 border-0 ring-1 ring-inset ring-[#e5e5dc] dark:ring-white/20 placeholder:text-[#9e9d47] focus:ring-2 focus:ring-inset focus:ring-primary focus:bg-white dark:focus:bg-black/40 sm:text-sm sm:leading-6 text-[#1c1c0d] dark:text-white transition-all duration-200"
                      id="phone"
                      name="phone"
                      placeholder="+1 234 567 890"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="group">
                  <label
                    className="block text-sm font-bold text-[#1c1c0d] dark:text-white mb-2 ml-1"
                    htmlFor="nationality"
                  >
                    Nationality
                  </label>
                  <div className="relative">
                    <input
                      className="form-input block w-full px-4 py-3.5 rounded-full bg-white/70 dark:bg-black/20 border-0 ring-1 ring-inset ring-[#e5e5dc] dark:ring-white/20 placeholder:text-[#9e9d47] focus:ring-2 focus:ring-inset focus:ring-primary focus:bg-white dark:focus:bg-black/40 sm:text-sm sm:leading-6 text-[#1c1c0d] dark:text-white transition-all duration-200"
                      id="nationality"
                      name="nationality"
                      placeholder="American"
                      type="text"
                      value={formData.nationality}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="group">
                  <label
                    className="block text-sm font-bold text-[#1c1c0d] dark:text-white mb-2 ml-1"
                    htmlFor="birthday"
                  >
                    Birthday <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      className={`form-input block w-full px-4 py-3.5 rounded-full bg-white/70 dark:bg-black/20 border-0 ring-1 ring-inset ${
                        errors.birthday
                          ? "ring-red-500"
                          : "ring-[#e5e5dc] dark:ring-white/20"
                      } placeholder:text-[#9e9d47] focus:ring-2 focus:ring-inset focus:ring-primary focus:bg-white dark:focus:bg-black/40 sm:text-sm sm:leading-6 text-[#1c1c0d] dark:text-white transition-all duration-200`}
                      id="birthday"
                      name="birthday"
                      type="date"
                      value={formData.birthday}
                      onChange={handleChange}
                    />
                    {errors.birthday && (
                      <p className="text-red-500 text-xs mt-1 ml-2">
                        {errors.birthday}
                      </p>
                    )}
                  </div>
                </div>
              </>
            )}

            <div className="group">
              <label
                className="block text-sm font-bold text-[#1c1c0d] dark:text-white mb-2 ml-1"
                htmlFor="email"
              >
                Email Address <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  className={`form-input block w-full px-4 py-3.5 rounded-full bg-white/70 dark:bg-black/20 border-0 ring-1 ring-inset ${
                    errors.email
                      ? "ring-red-500"
                      : "ring-[#e5e5dc] dark:ring-white/20"
                  } placeholder:text-[#9e9d47] focus:ring-2 focus:ring-inset focus:ring-primary focus:bg-white dark:focus:bg-black/40 sm:text-sm sm:leading-6 text-[#1c1c0d] dark:text-white transition-all duration-200`}
                  id="email"
                  name="email"
                  placeholder="name@library.com"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1 ml-2">
                    {errors.email}
                  </p>
                )}
              </div>
            </div>

            <div className="group">
              <div className="flex items-center justify-between mb-2 ml-1">
                <label
                  className="block text-sm font-bold text-[#1c1c0d] dark:text-white"
                  htmlFor="password"
                >
                  Password <span className="text-red-500">*</span>
                </label>
              </div>
              <div className="relative">
                <input
                  className={`form-input block w-full px-4 py-3.5 rounded-full bg-white/70 dark:bg-black/20 border-0 ring-1 ring-inset ${
                    errors.password
                      ? "ring-red-500"
                      : "ring-[#e5e5dc] dark:ring-white/20"
                  } placeholder:text-[#9e9d47] focus:ring-2 focus:ring-inset focus:ring-primary focus:bg-white dark:focus:bg-black/40 sm:text-sm sm:leading-6 text-[#1c1c0d] dark:text-white transition-all duration-200`}
                  id="password"
                  name="password"
                  placeholder="••••••••"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                />
                {errors.password && (
                  <p className="text-red-500 text-xs mt-1 ml-2">
                    {errors.password}
                  </p>
                )}
              </div>
              {isLogin && (
                <a
                  className="text-xs font-semibold text-[#1c1c0d]/70 dark:text-white/70 hover:underline transition-colors"
                  href="#"
                >
                  Forgot Password?
                </a>
              )}
            </div>

            <button
              className="mt-4 flex w-full cursor-pointer items-center justify-center rounded-full bg-primary py-3.5 px-4 text-sm font-bold leading-6 text-[#1c1c0d] shadow-sm hover:shadow-lg hover:brightness-105 active:scale-[0.98] transition-all duration-200"
              type="submit"
            >
              {isLogin ? "Sign In" : "Create Account"}
            </button>
          </form>

          {/* Footer / Toggle */}
          <div className="mt-8 text-center">
            <p className="text-sm text-[#1c1c0d]/70 dark:text-white/70">
              {isLogin ? "Don't have an account?" : "Already have an account?"}
              <button
                onClick={toggleMode}
                className="cursor-pointer font-bold text-[#1c1c0d] dark:text-white hover:underline transition-colors ml-1 "
              >
                {isLogin ? "Sign up" : "Sign in"}
              </button>
            </p>
          </div>
        </div>

        {/* Decorative Image/Illustration */}
        <div className="hidden lg:block absolute right-[15%] top-1/2 -translate-y-1/2 w-64 h-64 opacity-80 pointer-events-none z-0">
          <div className="w-full h-full bg-gradient-to-br from-primary/40 to-transparent rounded-full blur-3xl"></div>
        </div>
      </main>
    </div>
  );
};

export default LoginPage;
