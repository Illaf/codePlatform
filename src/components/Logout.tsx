import React from 'react'
import { FiLogOut } from 'react-icons/fi'
import { useSignOut } from "react-firebase-hooks/auth";
import {auth} from "../config/firebase";
const Logout = () => {
//     const [signOut,loading]= useSignOut(auth);
//     const handleLogout = () => {
// 		signOut();
// 	};
  return (
    <div className='text-red-500 px-4 py-2 cursor-pointer'>
     Log out
    </div>
  )
}

export default Logout
