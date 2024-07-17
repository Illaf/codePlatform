import React, { useEffect, useState } from 'react'
import {questions} from "../Data/questions";
import { BiCheckCircle } from 'react-icons/bi';
import Link from 'next/link';
import { AiFillYoutube } from 'react-icons/ai';
import { IoMdClose } from 'react-icons/io';

import YouTube from 'react-youtube';
import { IoClose } from 'react-icons/io5';
type DocumentProps ={

}
const Document:React.FC<DocumentProps> = () => {
  const[playYt, setPlayYt]=useState({isOpen:false, videoId:""});
  const closeModal=()=>{
    setPlayYt({isOpen:false, videoId:""})
  }
  useEffect(()=>{
    const handleEsc = (e: KeyboardEvent) => {
			if (e.key === "Escape") closeModal();
		};
		window.addEventListener("keydown", handleEsc);

		return () => window.removeEventListener("keydown", handleEsc);
  }
    ,[])
  return (
    <>
    <tbody>
      {questions.map((ques,idx)=>{
        const difficultyColor= ques.difficulty == "Easy"?"text-green-400":ques.difficulty == "Medium"?"text-yellow-700":"text-green-700";
        return(
       
            <tr className='' key={ques.id}>
                <th className='px-2 py-4 font-medium whitespace-nowrap'>
                <BiCheckCircle className='text-xl text-green-600' />
                </th>
                <td className={`px-6 py-4 font-medium cursor-pointer hover:text-blue-600`}>
                  <Link href={`/problems/${ques.id}`}>{ques.title}</Link>
                </td>
                <td className={`px-6 py-4 font-medium ${difficultyColor}`}>
                  {ques.difficulty}
                </td>
                <td className={`px-6 py-4 font-medium`}>
                  {ques.category}
                </td>
                <td className={`px-6 py-4 font-medium`}>
                  {ques.videoId?(
                    <AiFillYoutube className='text-red-600 text-3xl font-[32px]'
                    onClick={()=>setPlayYt({isOpen:true, videoId:ques.videoId as string})}/>
                  ):(<p>Coming Soon</p>)}
                </td>
            </tr>
           
        )
      })}
    </tbody>
    {playYt.isOpen && (
				<tfoot className='fixed top-0 left-0 h-screen w-screen flex items-center justify-center'>
					<div
						className='bg-white z-10 opacity-70 top-0 left-0 w-screen h-screen absolute'
						onClick={closeModal}
					></div>
					<div className='w-full z-50 h-full px-6 relative max-w-4xl'>
						<div className='w-full h-full flex items-center justify-center relative'>
							<div className='w-full relative'>
								<IoClose
									fontSize={"35"}
									className='cursor-pointer absolute -top-16 right-0'
									onClick={closeModal}
								/>
								<YouTube
									videoId={playYt.videoId}
									loading='lazy'
									iframeClassName='w-full min-h-[500px]'
								/>
							</div>
						</div>
					</div>
				</tfoot>
    )}
    </>
  )
}

export default Document;
