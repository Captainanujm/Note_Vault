"use client";
import React from 'react'
import axios from 'axios';
import {useState,useRef,useEffect} from 'react'
import { toast } from "react-toastify";
import {useRouter} from "next/navigation";
import Image from 'next/image';
const page = () => {
  const router=useRouter();
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [show,setShow]=useState(false);
  const [loading,setLoading]=useState(false);
  const[keepLoggedIn,setKeepLoggedIn]=useState(false);
   const[getOTPclicked,setGetOTPClicked]=useState(false);
       const otpInputRef = useRef<HTMLInputElement>(null);
       const isValidEmail = (email: string) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  }
       const handleSignINClick=async()=>{
        try{
 const res= await axios.post("https://note-vault-4.onrender.com/api/auth/verify-otp",{email,otp,keepLoggedIn});
       if(res.status===200){
         toast.success("User signed in successfully");
       }
        if(res.data.token){
          localStorage.setItem("token",res.data.token);
          router.push("/dashboard");
        }
        }
      catch (error: any) {
    if (error.response) {
    toast.error(error.response.data.message);
    } else {
      console.log("Network Error:", error.message);
    }
  }
       }
    const handleGetOTPClick=async()=>{
           try{
             setLoading(true);
          if(!isValidEmail(email)){
            toast.error("Please enter a valid email!");
            setLoading(false);
            return;
          }
           
               const res=await axios.post("https://note-vault-4.onrender.com/api/auth/get-otp",{email});
           if(res.status===200){
            setLoading(false);
           toast.success("OTP sent to email");
            setGetOTPClicked(true);
           }else{
           toast.error("Error sending OTP");
           }
           }catch(error:any){
            if (error.response) {
             toast.error(error.response.data.message);
            } else {
              console.log("Network Error:", error.message);
            }
           }
          
    }
  const handleOTPChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOtp(e.target.value);
  }
    useEffect(() => {
      if (getOTPclicked && otpInputRef.current) {
        setTimeout(() => {
          if (otpInputRef.current) {
            otpInputRef.current.focus();
          }
        }, 100);
      }
    }, [getOTPclicked]);
  return (
    <div className='flex'>
    <div className='absolute lg:top-8 lg:left-8 m-4 flex justify-center items-center gap-1'>
<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M20.1424 0.843087L16.9853 0L14.3248 9.89565L11.9228 0.961791L8.76555 1.80488L11.3608 11.4573L4.8967 5.01518L2.58549 7.31854L9.67576 14.3848L0.845959 12.0269L0 15.1733L9.64767 17.7496C9.53721 17.2748 9.47877 16.7801 9.47877 16.2717C9.47877 12.6737 12.4055 9.75685 16.0159 9.75685C19.6262 9.75685 22.5529 12.6737 22.5529 16.2717C22.5529 16.7768 22.4952 17.2685 22.3861 17.7405L31.1541 20.0818L32 16.9354L22.314 14.3489L31.1444 11.9908L30.2984 8.84437L20.6128 11.4308L27.0768 4.98873L24.7656 2.68538L17.7737 9.65357L20.1424 0.843087Z" fill="#367AFF"/>
<path d="M22.3776 17.7771C22.1069 18.9176 21.5354 19.9421 20.7513 20.763L27.1033 27.0935L29.4145 24.7901L22.3776 17.7771Z" fill="#367AFF"/>
<path d="M20.6872 20.8292C19.8936 21.637 18.8907 22.2398 17.7661 22.5504L20.0775 31.1472L23.2346 30.3041L20.6872 20.8292Z" fill="#367AFF"/>
<path d="M17.6482 22.5819C17.1264 22.7156 16.5795 22.7866 16.0159 22.7866C15.4121 22.7866 14.8274 22.705 14.2723 22.5523L11.9589 31.1569L15.116 32L17.6482 22.5819Z" fill="#367AFF"/>
<path d="M14.1607 22.5205C13.0532 22.1945 12.0682 21.584 11.2908 20.7739L4.92322 27.1199L7.23442 29.4233L14.1607 22.5205Z" fill="#367AFF"/>
<path d="M11.2377 20.7178C10.4737 19.9026 9.91718 18.8917 9.65228 17.7688L0.855713 20.1179L1.70167 23.2643L11.2377 20.7178Z" fill="#367AFF"/>
</svg>
<span className='font-[24px] font-bold m-1'>HD</span>
    </div>
      
      <div className='flex flex-col gap-2 justify-center m-auto lg:ml-18 lg:w-1/2 h-dvh overflow-y-auto'>
        <div className='flex flex-col'>
         <h1 className='font-bold text-[30px] ml-2'>Sign in</h1>
        <p className='text-[18px] text-[#969696] m-2 '>Please login to continue to your account</p>
        </div>
       
         <div className="relative w-full max-w-md mb-2">
  {/* Input */}
  <input
    type="email"
    onChange={handleEmailChange}
    value={email}
    id="email"
    placeholder=" "
    className="peer w-full rounded-md border border-gray-400 px-3 pt-5 pb-2 text-base text-gray-900 
               focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
  />

  {/* Label on border */}
  <label
    htmlFor="email"
    className="absolute -top-2 left-2 px-1 bg-white text-gray-500 text-sm 
               peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 
               peer-focus:-top-2 peer-focus:text-sm peer-focus:text-blue-500 transition-all"
  >
    Email
  </label>
</div>
{getOTPclicked &&
<div className="relative w-full max-w-md mb-2">
  {/* Input */}
  <input
   ref={otpInputRef}
    type={show?"text":"password"}
    id="otp"
    placeholder=" "
    onChange={handleOTPChange}
    value={otp}
    className="peer w-full rounded-md border border-blue-500 px-3 pt-5 pb-2 text-base text-gray-900 
               focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
  />

  {/* Label on border */}
  <label
    htmlFor="otp"
    className="absolute -top-2 left-2 px-1 bg-white text-gray-500 text-sm 
               peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 
               peer-focus:-top-2 peer-focus:text-sm peer-focus:text-blue-500 transition-all"
  >
    OTP
  </label>
  <div>
    <button
            type="button"
            onClick={() => setShow((prev) => !prev)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
          >
            {show ? (
            
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.542-7a9.964 
                     9.964 0 012.64-4.362M9.88 9.88a3 3 0 104.24 4.24M3 3l18 18"
                />
              </svg>
            )}
          </button>
  </div>
  
</div>}
<div>
  <span onClick={handleGetOTPClick} className='text-[#367AFF] text-[16px] font-medium underline cursor-pointer'>Resend OTP</span>
</div>

<div className='flex gap-2 mt-2 items-center font-medium text-[16px]'>
  <input
    type="checkbox"
    checked={keepLoggedIn}
    onChange={() => setKeepLoggedIn(!keepLoggedIn)}
    id="keepLoggedIn"
    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
  />
  <label
    htmlFor="keepLoggedIn"
    className="text-gray-700 text-sm select-none"
  >
    Keep me logged in
  </label>
</div>

{getOTPclicked?(<button onClick={handleSignINClick} className='bg-[#367AFF] text-white text-[18px] font-semibold w-full max-w-md rounded-md py-[16px] px-[8px] mt-2 hover:bg-blue-600 transition-colors'>Sign in</button>):(<button onClick={handleGetOTPClick} className='bg-[#367AFF] text-white text-[18px] font-semibold w-full max-w-md rounded-md py-[16px] px-[8px] mt-2 hover:bg-blue-600 transition-colors'>{loading?"Please wait...":"Get OTP"}</button>)}
<div className='flex items-center max-w-md justify-center'>
  <span >Need an account? <span onClick={()=>router.push("/signup")} className='text-[#367AFF] cursor-pointer underline text-[16px] font-medium'>Create one</span></span>
</div>

      </div>
      <div className="relative w-full min-h-screen  hidden lg:block"> 
  <Image 
    src="/desktop.jpg" 
    alt="Desktop" 
    fill 
    className="object-cover rounded-lg" 
  />
</div>
    </div>
  )
}

export default page
