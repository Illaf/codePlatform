import Image from "next/image";
import { Inter } from "next/font/google";
import TopSection from "@/components/TopSection";
import Document from "../components/Document";
import { useState } from "react";
import { doc, setDoc } from "firebase/firestore";
import { firestore } from "@/config/firebase";
import {  Grid } from 'react-loader-spinner'
import useMounted from "@/hooks/mounted";
const inter = Inter({ subsets: ["latin"] });


export default function Home() {
	const [loading,setLoading]= useState(true);
	const hasMounted= useMounted();
	if(!hasMounted){
		return null;
	}
	// const [inputs, setInputs]= useState({
	// 	id:"",
	// 	title:"",
	// 	difficulty:"",
	// 	category:"",
	// 	videoId:"",
	// 	order:0,
	// 	likes:0,
	// 	dislikes:0
	// })
	// const handleInputChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
	// 	setInputs(inputs=>({
	// 		...inputs, [e.target.name]:e.target.value
	// 	}))
	// 	}
	// const handleSubmit= async(e:React.FormEvent<HTMLFormElement>)=>{
	// 	e.preventDefault();
	// 	const parsedProblem= {
	// 		...inputs,
	// 		order: Number(inputs.order)

	// 	}

	// 	await setDoc(doc(firestore, "problems", inputs.id),parsedProblem);
	// 	alert("saved to db");
	// }
  return (
    <main className="min-h-screen ">
     <TopSection/>
     {/* <h1
					className='text-2xl text-center text-gray-700 dark:text-gray-400 font-medium
					uppercase mt-10 mb-5'
				>
					
				</h1> */}
				{loading && (
					<div className="flex items-center justify-center mt-10">
				<Grid 
				visible={true}
				height="40"
				width="80"
				color="#4fa94d"
				ariaLabel="grid-loading"
				radius="12.5"
				wrapperStyle={{}}
				wrapperClass="grid-wrapper"
				/>
					</div>
				)
				
				}	
				<div className='relative overflow-x-auto mx-auto px-6 pb-10'>
				
				<table className='text-sm text-left text-gray-500 dark:text-gray-400 sm:w-7/12 w-full max-w-[1200px] mx-auto'>
						
							<thead className='text-xs text-gray-700 uppercase dark:text-gray-400 border-b '>
								<tr>
									<th scope='col' className='px-1 py-3 w-0 font-medium'>
										Status
									</th>
									<th scope='col' className='px-6 py-3 w-0 font-medium'>
										Title
									</th>
									<th scope='col' className='px-6 py-3 w-0 font-medium'>
										Difficulty
									</th>

									<th scope='col' className='px-6 py-3 w-0 font-medium'>
										Category
									</th>
									<th scope='col' className='px-6 py-3 w-0 font-medium'>
										Solution
									</th>
								</tr>
							</thead>
						
						<Document setLoading={setLoading} />
					</table>
					
				</div>
				{/* <form className="flex flex-col max-w-sm gap-3 ml-10 p-6" onSubmit={handleSubmit}>
					<input onChange={handleInputChange} type="text" placeholder="problem id"  name="id"/>
					<input onChange={handleInputChange} type="text" placeholder="title"  name="title"/>
					<input onChange={handleInputChange} type="text" placeholder="difficulty"  name="difficulty"/>
					<input onChange={handleInputChange} type="text" placeholder="category"  name="category"/>
					<input onChange={handleInputChange} type="text" placeholder="videoId?"  name="videoId"/>
					<input onChange={handleInputChange} type="text" placeholder="order"  name="order"/>
					<input onChange={handleInputChange} type="text" placeholder="link?"  name="link"/>
					<button className="bg-pink-600">save to firestore</button>
				</form> */}
    </main>
  );
}
