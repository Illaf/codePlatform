import React, { useEffect, useState } from 'react'
import {questions} from "../Data/questions";
import { BiCheckCircle } from 'react-icons/bi';
import Link from 'next/link';
import { AiFillYoutube } from 'react-icons/ai';
import { IoMdClose } from 'react-icons/io';
import { collection, doc, getDoc, getDocs, orderBy, query, where } from "firebase/firestore";
import {auth, firestore} from "../config/firebase";
import YouTube from 'react-youtube';
import { IoClose } from 'react-icons/io5';
import { DBProblem } from '@/utils/types/problem';
import { useAuthState } from 'react-firebase-hooks/auth';
type DocumentProps ={
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}
const Document:React.FC<DocumentProps> = ({setLoading}) => {
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
    const solvedProblems=  useGetSolvedProblems();
    console.log("solved problems are",solvedProblems);
    const problems= useGetProblemsList(setLoading);

  return (
    <>
    <tbody>
      {problems.map((problem,idx)=>{
        const difficultyColor= problem.difficulty == "Easy"?"text-green-400":problem.difficulty == "Medium"?"text-yellow-700":"text-red-700";
        return(
       
            <tr className='' key={problem.id}>
                <th className='px-2 py-4 font-medium whitespace-nowrap'>
                  {solvedProblems.includes(problem.id) && (<BiCheckCircle className='text-xl text-green-600' />)}
                  {!(solvedProblems.includes(problem.id)) && (<p className='text-gray-400'>Not solved</p>)}
                </th>
                <td className={`px-6 py-4 font-medium cursor-pointer hover:text-blue-600`}>
                  <Link href={`/problems/${problem.id}`}>{problem.title}</Link>
                </td>
                <td className={`px-6 py-4 font-medium ${difficultyColor}`}>
                  {problem.difficulty}
                </td>
                <td className={`px-6 py-4 font-medium`}>
                  {problem.category}
                </td>
                <td className={`px-6 py-4 font-medium`}>
                  {problem.videoId?(
                    <AiFillYoutube className='text-red-600 text-3xl font-[32px]'
                    onClick={()=>setPlayYt({isOpen:true, videoId:problem.videoId as string})}/>
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
function useGetSolvedProblems(){
  const [ solvedProblems,setSolvedProblems]= useState<string[]>([]);
  const [user]= useAuthState(auth);

  useEffect(()=>{
    const getSolved= async()=>{
      const userRef= doc(firestore,"users",user!.uid);
      const userDoc= await getDoc(userRef);
      if(userDoc.exists()){
        setSolvedProblems(userDoc.data().solved);
      }
    }
    if(user) getSolved();
    if(!user) setSolvedProblems([]);
  }
  ,[user])
  return solvedProblems
}
function useGetProblemsList(setLoading:React.Dispatch<React.SetStateAction<boolean>>){
  const[problems,setProblems] = useState<DBProblem[]>([]);
  useEffect(()=>{
    const problemsList= async()=>{
      setLoading(true);
      const q= query(collection(firestore,"problems"),orderBy("order","asc"));
      const querySnapshot = await getDocs(q);
      let tempArray:DBProblem[] =[];
      querySnapshot.forEach((doc) => {
        tempArray.push({ id: doc.id, ...doc.data() } as DBProblem);
        
      });
      setProblems(tempArray);
      setLoading(false);
    }
    problemsList();
},[setLoading])

return problems;
}
