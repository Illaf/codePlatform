
import Navbar from '@/components/Navbar';
import React, { useEffect, useState } from 'react';
import AuthLayout from '@/components/AuthLayout';
import {useRecoilValue} from 'recoil';
import { authModalState } from '@/atoms/authAtom';
import {auth} from "../../config/firebase";
import {useAuthState} from "react-firebase-hooks/auth";
import { useRouter } from 'next/router';
 type AuthPageProps={

}

const AuthPage:React.FC<AuthPageProps> = () => {

  const router= useRouter();
  const [user,loading,error]= useAuthState(auth);
  const [pageLoading,setPageLoading]= useState(true);
  useEffect(()=>{
if(user)
 router.push("/");
 if(!pageLoading && !user ) setPageLoading(false);
},[user,router]);
//if(pageLoading) return null;
  const authModel= useRecoilValue(authModalState);
  return (
    <div >
    
     <div className="relative min-h-screen flex flex-col justify-center items-center bg-gradient-to-r from-blue-900 via-purple-800 to-blue-900">
     <div className='mx-auto z-10'>
      <Navbar/>
      <div className='flex items-center justfy-center h-[]'>
      {authModel.isOpen && <AuthLayout/>}
      </div>
     </div>
      {/* Navbar */}
      <header className="w-full py-4 px-8 flex justify-center items-center bg-transparent">
        <h1 className="text-white text-4xl font-bold tracking-wider">codePlatform</h1>
      </header>

      {/* Main Content */}
      <div className="text-center mt-20 animate-fadeIn">
        <h2 className="text-white text-5xl md:text-6xl font-extrabold tracking-wide">
          Welcome to codePlatform
        </h2>
        <p className="text-purple-300 text-lg md:text-xl mt-4">
          Your gateway to mastering code, one challenge at a time.
        </p>
      </div>

      {/* Animated Grid or Network */}
      <div className="absolute inset-0 z-0">
        <svg
          className="w-full h-full animate-drawGrid"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 800 600"
          fill="none"
        >
          {/* SVG Content */}
          <rect width="800" height="600" fill="none" />
          <g stroke="#2d3748" strokeWidth="1" strokeOpacity="0.4">
            <path d="M0 50H800M0 150H800M0 250H800M0 350H800M0 450H800M0 550H800" />
            <path d="M50 0V600M150 0V600M250 0V600M350 0V600M450 0V600M550 0V600M650 0V600M750 0V600" />
          </g>
        </svg>
      </div>
    </div>
    </div>
  )
}

export default AuthPage;