
import { auth, firestore } from "@/config/firebase";
import { DBProblem, Problem } from "@/utils/types/problem";
import { arrayRemove, arrayUnion, doc, getDoc, runTransaction, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { AiFillLike, AiFillDislike } from "react-icons/ai";
import { BsCheck2Circle } from "react-icons/bs";
import { TiStarOutline } from "react-icons/ti";
import { toast } from "react-toastify";

type ProblemDescriptionProps = {
    problem:Problem;
    Solved:boolean;
	
};

const ProblemDescription: React.FC<ProblemDescriptionProps> = ({problem,Solved}) => {
	
	const {currentProblem, setCurrentProblem,loading}= useProblemDetails(problem.id);
	const {like,dislike,star,solved, setData}= useGetProblemData(problem.id);
	const [user] = useAuthState(auth);
	const [updating, setUpdating] = useState(false);
	const returnUserDataAndProblemData = async (transaction: any) => {
		const userRef = doc(firestore, "users", user!.uid);
		const problemRef = doc(firestore, "problems", problem.id);
		const userDoc = await transaction.get(userRef);
		const problemDoc = await transaction.get(problemRef);
		return { userDoc, problemDoc, userRef, problemRef };
	};
	const handleLikes = async () => {
		if (!user) {
			toast.error("You must be logged in to like a problem", { position: "top-left", theme: "dark" });
			return;
		}
		if (updating) return;
		setUpdating(true);
		await runTransaction(firestore, async (transaction) => {
			const { problemDoc, userDoc, problemRef, userRef } = await returnUserDataAndProblemData(transaction);

			if (userDoc.exists() && problemDoc.exists()) {
				if (like) {
					// remove problem id from likedProblems on user document, decrement likes on problem document
					transaction.update(userRef, {
						likedProblems: userDoc.data().likedProblems.filter((id: string) => id !== problem.id),
					});
					transaction.update(problemRef, {
						likes: problemDoc.data().likes - 1,
					});

					setCurrentProblem((prev) => (prev ? { ...prev, likes: prev.likes - 1 } : null));
					setData((prev) => ({ ...prev, like: false }));
				} else if (dislike) {
					transaction.update(userRef, {
						likedProblems: [...userDoc.data().likedProblems, problem.id],
						dislikedProblems: userDoc.data().dislikedProblems.filter((id: string) => id !== problem.id),
					});
					transaction.update(problemRef, {
						likes: problemDoc.data().likes + 1,
						dislikes: problemDoc.data().dislikes - 1,
					});

					setCurrentProblem((prev) =>
						prev ? { ...prev, likes: prev.likes + 1, dislikes: prev.dislikes - 1 } : null
					);
					setData((prev) => ({ ...prev, like: true, dislike: false }));
				} else {
					transaction.update(userRef, {
						likedProblems: [...userDoc.data().likedProblems, problem.id],
					});
					transaction.update(problemRef, {
						likes: problemDoc.data().likes + 1,
					});
					setCurrentProblem((prev) => (prev ? { ...prev, likes: prev.likes + 1 } : null));
					setData((prev) => ({ ...prev, like: true }));
				}
			}
		});
		setUpdating(false);
	};

	const handleDislikes = async () => {
		if (!user) {
			toast.error("You must be logged in to dislike a problem", { position: "top-left", theme: "dark" });
			return;
		}
		if (updating) return;
		setUpdating(true);
		await runTransaction(firestore, async (transaction) => {
			const { problemDoc, userDoc, problemRef, userRef } = await returnUserDataAndProblemData(transaction);
			if (userDoc.exists() && problemDoc.exists()) {
				// already disliked, already liked, not disliked or liked
				if (dislike) {
					transaction.update(userRef, {
						dislikedProblems: userDoc.data().dislikedProblems.filter((id: string) => id !== problem.id),
					});
					transaction.update(problemRef, {
						dislikes: problemDoc.data().dislikes - 1,
					});
					setCurrentProblem((prev) => (prev ? { ...prev, dislikes: prev.dislikes - 1 } : null));
					setData((prev) => ({ ...prev, dislike: false }));
				} else if (like) {
					transaction.update(userRef, {
						dislikedProblems: [...userDoc.data().dislikedProblems, problem.id],
						likedProblems: userDoc.data().likedProblems.filter((id: string) => id !== problem.id),
					});
					transaction.update(problemRef, {
						dislikes: problemDoc.data().dislikes + 1,
						likes: problemDoc.data().likes - 1,
					});
					setCurrentProblem((prev) =>
						prev ? { ...prev, dislikes: prev.dislikes + 1, likes: prev.likes - 1 } : null
					);
					setData((prev) => ({ ...prev, dislike: true, like: false }));
				} else {
					transaction.update(userRef, {
						dislikedProblems: [...userDoc.data().dislikedProblems, problem.id],
					});
					transaction.update(problemRef, {
						dislikes: problemDoc.data().dislikes + 1,
					});
					setCurrentProblem((prev) => (prev ? { ...prev, dislikes: prev.dislikes + 1 } : null));
					setData((prev) => ({ ...prev, dislike: true }));
				}
			}
		});
		setUpdating(false);
	};
	const handleStar= async()=>{
		if(!star){
			const userRef= doc(firestore,"users",user.uid);
			await updateDoc(userRef,{
				starred: arrayUnion(problem.id),
				star:true
			})
			setData(prev=>({...prev,star:true}))
		}else{
			const userRef= doc(firestore,"users",user.uid);
			await updateDoc(userRef,{
				starred: arrayRemove(problem.id),
				star:false
			})
			setData(prev=>({...prev,star:false}))
		}
	}
	return (
		<div className='bg-dark-layer-1'>
			{/* TAB */}
			<div className='flex h-11 w-full items-center pt-2 bg-dark-layer-2  overflow-x-hidden'>
				{/* <div className={"bg-dark-layer-1 rounded-t-[5px] px-5 py-[10px] text-xs cursor-pointer"}>
					{problem.title}
				</div> */}
			</div>

			<div className='flex px-0 py-4 h-[calc(100vh-94px)] overflow-y-auto'>
				<div className='px-5'>
					{/* Problem heading */}
					<div className='w-full'>
						<div className='flex space-x-4'>
							<div className='flex-1 mr-2 text-lg  font-medium'>{problem.title}</div>
						</div>
						<div className='flex items-center mt-3 border-b-2'>
							<div
								className={`text-olive bg-olive inline-block rounded-[21px] bg-opacity-[.15] px-2.5 py-1 text-xs font-medium capitalize `}
							>
								Easy
							</div>
							<div className='cursor-pointer group relative '>
							<div className='rounded p-[3px] ml-4 text-lg transition-colors duration-200 text-green-s text-dark-green-s cursor-pointer'>
								{Solved && <BsCheck2Circle className="text-green-500"/>}
								{!Solved && <BsCheck2Circle />}
								
								<div
								className='absolute top-10 left-2/4 -translate-x-2/4  mx-auto bg-dark-layer-1 text-brand-orange p-2 rounded shadow-lg 
								z-40 group-hover:scale-100 scale-0 
								transition-all duration-300 ease-in-out '
							>
								{!Solved && <p className='text-sm '>Not solved</p>}
								{Solved && <p className='text-sm '>solved!</p>}
								</div>
								
							</div>
							</div>
							
							
							<div className='flex items-center cursor-pointer group relative  hover:bg-dark-fill-3 space-x-1 rounded p-[3px]  ml-4 text-lg transition-colors duration-200 text-dark-gray-6'
							onClick={handleLikes}
							>
								{like && <AiFillLike className="text-blue-600 "/>}
								{!like && <AiFillLike />}
								{/* {updating && <className='animate-spin' />} */}
								<span className='text-xs'>{currentProblem?.likes}</span>
								<div
								className='absolute top-10 left-2/4 -translate-x-2/4  mx-auto bg-dark-layer-1 text-brand-orange p-2 rounded shadow-lg 
								z-40 group-hover:scale-100 scale-0 
								transition-all duration-300 ease-in-out '
							>
								<p className='text-sm '>Like</p>
								</div>
							</div>
							<div className='flex items-center cursor-pointer hover:bg-dark-fill-3 space-x-1 rounded p-[3px]  ml-4 text-lg transition-colors duration-200 text-green-s text-white
							' onClick={handleDislikes}>
							{dislike && <AiFillDislike className="text-blue-600"/>}
								{!dislike && <AiFillDislike />}
								
								<span className='text-xs'>{currentProblem?.dislikes}</span>
							</div>
							<div className='cursor-pointer hover:bg-dark-fill-3  rounded p-[3px]  ml-4 text-xl transition-colors duration-200 text-green-s text-white ' onClick={handleStar}>
								{star && <TiStarOutline  className="text-yellow-500 "/>}
								{!star && <TiStarOutline />}
							</div>
						</div>

						{/* Problem Statement(paragraphs) */}
						<div className=' text-sm'>
							<div dangerouslySetInnerHTML={{__html: problem.problemStatement}}/>
								
							
						</div>
						
						{/* Examples */}
						<div className='mt-4'>
						
							
							{problem.examples.map((example,idx)=>{
							
								return (
									<div key={example.id}>
								<p className='font-medium  '>Example {idx+1}: </p>
								{example.img && (
									<img src={example.img} alt="" className="mt-2"/>
								)}
								<div className='example-card'>
									<pre>
										<strong className=''>Input: </strong>{example.inputText}
										<br />
										<strong>Output:</strong>{example.outputText}<br />
										{example.explanation && (
											<>
											<strong>Explanation:</strong>
											<div>{example.explanation}</div>
											</>
										)}
										
									</pre>
								</div>
							</div>
								)
							})}
							

							
							
						</div>

						{/* Constraints */}
						<div className='my-5'>
							<div className=' text-sm font-medium'>Constraints:</div>
							<ul className=' ml-5 list-disc'>
							<div dangerouslySetInnerHTML={{__html:problem.constraints}}/>
							
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
export default ProblemDescription;
function useProblemDetails(problemId:string){
const [currentProblem, setCurrentProblem] = useState<DBProblem | null>(null);
const [loading,setLoading] = useState<boolean>(true);
useEffect(()=>{
const getCurrentProblem= async()=>{
	setLoading(true);
	const docRef= doc(firestore,"problems",problemId);
	const docSnap= await getDoc(docRef);
	if(docSnap.exists()){
		const problem= docSnap.data();
		
		setCurrentProblem({id:docSnap.id,...problem} as DBProblem);

	}

	setLoading(false);
}
getCurrentProblem();
},[problemId])
return { currentProblem, loading, setCurrentProblem };
}
function useGetProblemData(problemId:string) {
const [data,setData]= useState({like:false,dislike:false,star:false,solved:false});
const [user] = useAuthState(auth);
//console.log(user);
useEffect(()=>{
const getProblemData= async()=>{
	const userRef= doc(firestore,"users",user!.uid);
	const userSnap= await getDoc(userRef);
	if(userSnap.exists()){
		const data= userSnap.data();
		// console.log(data);
		const {solved,likedProblems,dislikedProblems,starred} = data;
		setData({
			like: likedProblems.includes(problemId), // likedProblems["two-sum","jump-game"]
			dislike: dislikedProblems.includes(problemId),
			star: starred.includes(problemId),
			solved: solved.includes(problemId),
		});
	}
}
if(user) getProblemData();
return () => setData({ like: false, dislike: false, star: false, solved: false });
},[problemId,user]);
return {...data,setData}
}