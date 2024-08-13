import { authModalState } from '@/atoms/authAtom';
import Link from 'next/link'
import React from 'react'
import {useSetRecoilState} from 'recoil';
type NavbarProps = {};
const Navbar: React.FC<NavbarProps> = () => {
  const setAuthModalState = useSetRecoilState(authModalState);
	const handleClick = () => {
		setAuthModalState((prev) => ({ ...prev, isOpen: true }));
	};
  return (
    <div className='flex items-center justify-between sm:px-12 px-2 md:px-24'>
        <Link href="/" className='flex items-center justify-center h-20'>
            <div className='p-4 '>
            <img src="/images/AppLogo.png" className='w-[100px] h-[40px]' alt="Image not found" />
            </div>
            
        </Link>
        <div className='flex items-center' > 
            <button onClick={handleClick} className='bg-purple-400 text-white px-2 py-1 sm:px-4 rounded-md font-medium hover:text-primary-color-2 hover:bg-white
            hover:border-2 hover:border-primary-color-2'>
                Sign In
            </button>
        </div>
      
    </div>
  )
}

export default Navbar
