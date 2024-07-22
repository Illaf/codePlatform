import { React, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebase';
import { useRouter } from 'next/router';
import { authModalState } from '@/atoms/authAtom';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { doc, setDoc } from 'firebase/firestore';
import {firestore} from "../config/firebase"
const Signup = () => {
  const router = useRouter();
  const setAuthModalState = useSetRecoilState(authModalState);

  const [inputState, setInputState] = useState({
    email: '',
    fullname: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputState((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      
      const newUser = await createUserWithEmailAndPassword(
        auth,
        inputState.email,
        inputState.password
      );
      toast.loading("Creating account,Please wait",{toastId:"toastLoader"});
      const userData={
        uid: newUser.user.uid,
				email: newUser.user.email,
				displayName: inputState.fullname,
				createdAt: Date.now(),
				updatedAt: Date.now(),
				likedProblems: [],
				dislikedProblems: [],
				solved: [],
				starred: [],
       }
        await setDoc(doc(firestore,"users",newUser.user.uid),userData);
      if (newUser) {
      
        router.push("/");
      }
    } catch (error: any) {
      toast.error(error.message, {
        position: "top-left"
      });
      console.log(`Error on signup : ${error.message}`);
    }finally{
      toast.dismiss("toastLoader")
    }
  };

  const handleClick = () => {
    setAuthModalState((prev) => ({ ...prev, type: "login" }));
  };

  return (
    <div>
      <form
        className='space-y-6 px-6 pb-4 flex flex-col'
        onSubmit={handleSignUp}
      >
        <h1 className='text-xl font-medium text-white'>
          Register to CodePlatform
        </h1>
        <div>
          <label
            htmlFor='fullname'
            className='font-medium block mb-2'
          >
            Enter your full Name
          </label>
          <input
            type='fullname'
            name='fullname'
            id='fullname'
            onChange={handleChange}
            className='w-full border-2 outlinr-none sm:text-sm rounded-md focus:border-primary-color-2 px-1 py-3 placeholder:gray-400'
            placeholder='John Doe'
          />
        </div>
        <div>
          <label
            htmlFor='email'
            className='font-medium block mb-2'
          >
            Enter your email address
          </label>
          <input
            type='email'
            onChange={handleChange}
            id='email'
            name='email'
            className='w-full border-2 outlinr-none sm:text-sm rounded-md focus:border-primary-color-2 px-1 py-3 placeholder:gray-400'
            placeholder='johndoe@gmail.com'
          />
        </div>
        <div>
          <label
            htmlFor='password'
            className='font-medium block mb-2'
          >
            Enter password
          </label>
          <input
            type='password'
            name='password'
            id='password'
            onChange={handleChange}
            className='w-full border-2 outlinr-none sm:text-sm rounded-md focus:border-primary-color-2 px-1 py-3 placeholder:gray-400'
            placeholder='********'
          />
        </div>
        <button
          type='submit'
          className='full text-white  font-medium rounded-lg 
                text-sm px-5 py-2.5 text-center bg-primary-color-2 hover:bg-white hover:text-primary-color-2 cursor-pointer'
        >
          Sign Up
        </button>
        <div className='px-1 py-1 flex justify-center'>
          <a
            onClick={handleClick}
            className='text-blue-600 text-sm'
          >
            Already a user?
            <span className='text-blue-600 underline cursor-pointer'>
              Sign in
            </span>
          </a>
        </div>
      </form>
    </div>
  );
};

export default Signup;
