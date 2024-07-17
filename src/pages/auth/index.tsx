
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
    <div className='bg-[#D6EFD8] h-screen'>
     <div className='mx-auto'>
      <Navbar/>
      <div className='flex items-center justfy-center h-[]'>
      {authModel.isOpen && <AuthLayout/>}
      </div>
     </div>
    </div>
  )
}

export default AuthPage;
