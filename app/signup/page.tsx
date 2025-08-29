"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import Image from "next/image";

export default function SignUp() {
  const [date, setDate] = useState<Date | undefined>(undefined);

  return (
    <div className="flex w-full min-h-screen flex-col lg:flex-row">
      {/* Left column */}
      <div className="flex flex-col sm:p-8 lg:p-16 max-w-[591px] justify-center gap-4 w-full">
        {/* Logo */}
        <div className="absolute top-8 left-8 flex items-center gap-2 mb-6">
          {/* your svg logo */}
          <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* ...paths */}
          </svg>
          <span className="font-semibold text-xl">HD</span>
        </div>

        {/* Heading */}
        <h1 className="font-bold text-[40px] leading-[48px]">Sign up</h1>
        <p className="text-[#969696] text-base">
          Sign up to enjoy the feature of HD
        </p>

        {/* Form */}
        <form className="flex flex-col gap-4 mt-4">
          {/* Name */}
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Your Name
            </label>
            <Input
              type="text"
              id="name"
              placeholder="Jonas Khanwald"
              className="w-full max-w-[399px] focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:border-blue-500"
              required
            />
          </div>

          {/* DOB */}
          <div>
            <label
              htmlFor="dob"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Date of Birth
            </label>
            <Input
              type="date"
              id="dob"
              className="w-full max-w-[399px] focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:border-blue-500"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email
            </label>
            <Input
              type="email"
              id="email"
              placeholder="jonas_kahnwald@gmail.com"
              className="w-full max-w-[399px] focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:border-blue-500"
              required
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full max-w-[399px] h-[50px] bg-blue-500 text-white rounded-lg text-lg font-medium hover:bg-blue-600 transition"
          >
            Get OTP
          </button>

          {/* Footer */}
          <p className="text-sm text-gray-600 text-center w-full max-w-[399px]">
            Already have an account?{" "}
            <a
              href="/signin"
              className="text-blue-500 font-medium hover:underline"
            >
              Sign in
            </a>
          </p>
        </form>
      </div>

      {/* Right column (Image) - hidden on small screens */}
      <div className="hidden lg:flex flex-1 relative">
        <Image
          src="/desktop.jpg"
          alt="Background"
          fill
          className="object-cover"
          priority
        />
      </div>
    </div>
  );
}
