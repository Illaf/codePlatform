import React from 'react'
import { FiLogOut } from 'react-icons/fi'
import { useSignOut } from "react-firebase-hooks/auth";
import {auth} from "../config/firebase";
import { useRouter } from 'next/router';
const Logout = () => {
  const router=useRouter();
    const [signOut,loading]= useSignOut(auth);
    const handleLogout = () => {
		signOut();
    router.push("/auth");
	};
  return (
    <div className='text-red-500 px-4 py-2 cursor-pointer' onClick={handleLogout}>
     Log out
    </div>
  )
}

export default Logout
