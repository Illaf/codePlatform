import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { BsList } from 'react-icons/bs'
import { FaChevronLeft } from 'react-icons/fa'
import { FaChevronRight } from 'react-icons/fa6'
import { useAuthState } from "react-firebase-hooks/auth";
import {auth} from "../config/firebase";
import Logout from './Logout';
import { authModalState } from '@/atoms/authAtom';
import { useSetRecoilState } from 'recoil';
import Timer from './Timer';
import { useRouter } from 'next/router'
import { problems } from '@/utils/Data'


 //
 type TopSectionProps = {
	problemWindow?: boolean;
};
const TopSection:React.FC<TopSectionProps> = ({problemWindow}) => {
	const [user]= useAuthState(auth);
	 const setAuthModelState= useSetRecoilState(authModalState);
	 const router= useRouter();
	const handleProblemChange= (forward:boolean)=>{
		const {order} =problems[router.query.qid as string] ;
		console.log(problems[router.query.qid as string] )
		const direction= forward?1:-1;
		let nextProblemOrder= order+direction;
		const nextProblemKey = Object.keys(problems).find(key => problems[key].order === nextProblemOrder);
		if(forward && !nextProblemKey) {
			const firstProblemKey = Object.keys(problems).find(key => problems[key].order == 1);
			
			router.push(`/problems/${firstProblemKey}`);
		}
		else if(!forward && !nextProblemKey){
			const lastProblemKey = Object.keys(problems).find(key => problems[key].order === Object.keys(problems).length);
			router.push(`/problems/${lastProblemKey}`);
		}
		else router.push(`/problems/${nextProblemKey}`);
	}
  return (
	
    <div>
      <nav className='relative flex h-[50px] w-full shrink-0 items-center bg-primary-color-1 px-5 bg-dark-layer-1 text-dark-gray-7'>
			<div className={`flex w-full items-center justify-between `}>
				<Link href='/' className='h-[22px] flex-1'>
					<Image src='/images/AppLogo.png' alt='Logo' height={100} width={100} />
				</Link>

				{problemWindow && (
					<div className='flex items-center gap-4 flex-1 justify-center'>
						<div
							className='flex items-center justify-center rounded bg-dark-fill-3 hover:bg-blue-500 h-8 w-8 cursor-pointer'
							onClick={()=>handleProblemChange(false)}
						>
							<FaChevronLeft className='text-white'/>
						</div>
						<Link
							href='/'
							className='flex items-center gap-2 font-medium max-w-[170px]  text-dark-gray-8 cursor-pointer'
						>
							<div>
								<BsList />
							</div>
							<p className='text-white'>Problem List</p>
						</Link>
						<div
							className='flex items-center justify-center rounded bg-dark-fill-3 hover:bg-green-500 h-8 w-8 cursor-pointer'
							onClick={()=>handleProblemChange(true)}
						>
							<FaChevronRight className='text-white'/>
						</div>
					</div>
			
			)}
			<div className='text-white'>
			{user && (<Timer />)}
			</div>
				
				<div className='flex items-center space-x-4 flex-1 justify-end'>
					
					{!user && (
						<Link
							href='/auth'
							onClick={()=>setAuthModelState((prev)=>({...prev, isOpen:true,type:"login"}))}
						>
							<button className=' py-1 px-2 cursor-pointer rounded '>Sign In</button>
						</Link>
				)}
					
			{user && (
						<div className='cursor-pointer group relative mr-5'>
							<Image src='' alt='Avatar' width={30} height={30} className='rounded-full' />
							<div
								className='absolute top-10 left-2/4 -translate-x-2/4  mx-auto bg-dark-layer-1 text-brand-orange p-2 rounded shadow-lg 
								z-40 group-hover:scale-100 scale-0 
								transition-all duration-300 ease-in-out'
							>
								<p className='text-sm'>{user.email}</p>
							</div>
						</div>
			
			)}
			{user && <Logout/>}
		
				</div>
			</div>
		</nav>
    </div>
  )
}

export default TopSection
