import { authModalState } from '@/atoms/authAtom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';
import { auth } from '../config/firebase';
import { useSetRecoilState } from 'recoil';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const router = useRouter();
  const [inputState, setInputState] = useState({ email: '', password: '' });
  const setAuthModalState = useSetRecoilState(authModalState);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const user = await signInWithEmailAndPassword(auth, inputState.email, inputState.password);
      if (user) {
        router.push("/");
      }
    } catch (error: any) {
      toast.error(error.message, { position: "top-left" });
      console.error("Error signing in:", error.message);
    }
  };

  const handleClick = (type: "login" | "signup" | "forgotPassword") => {
    setAuthModalState((prev) => ({ ...prev, type }));
  };

  return (
    <div>
    
      <form className='space-y-6 px-6 pb-4 flex flex-col' onSubmit={handleSignIn}>
        <h1 className='text-xl font-medium text-white'>Sign In to CodePlatform</h1>
        <div>
          <label htmlFor="email" className='font-medium block mb-2'> Enter your email address</label>
          <input
            type="email"
            onChange={handleInput}
            name="email"
            className='w-full border-2 outline-none sm:text-sm rounded-md focus:border-primary-color-2 px-1 py-3 placeholder:gray-400'
            placeholder='johndoe@gmail.com'
          />
        </div>
        <div>
          <label htmlFor="password" className='font-medium block mb-2'> Enter password</label>
          <input
            type="password"
            onChange={handleInput}
            name="password"
            className='w-full border-2 outlinr-none sm:text-sm rounded-md focus:border-primary-color-2 px-1 py-3 placeholder:gray-400'
            placeholder='********'
          />
        </div>
        <button
          type="submit"
          className='w-full text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-primary-color-2 hover:bg-white hover:text-primary-color-2'
        >
          Login
        </button>
        <div className='px-1 py-1 flex justify-between'>
          <a href='#' className='text-blue-600 text-sm' onClick={() => handleClick('forgotPassword')}>Forgot Password?</a>
          <div className='text-blue-600 text-sm'>Not a user?<span onClick={() => handleClick("signup")} className='text-blue-600 underline cursor-pointer'>Sign up</span></div>
        </div>
      </form>
    </div>
  );
};

export default Login;
