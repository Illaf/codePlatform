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
            <img src="" alt="Image not found" />
        </Link>
        <div className='flex items-center' > 
            <button onClick={handleClick} className='bg-primary-color-2 text-white px-2 py-1 sm:px-4 rounded-md font-medium hover:text-primary-color-2 hover:bg-white
            hover:border-2 hover:border-primary-color-2'>
                Sign Up
            </button>
        </div>
      
    </div>
  )
}

export default Navbar
