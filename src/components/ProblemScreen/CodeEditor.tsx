import React, { useEffect, useState } from 'react'
import EditorNav from './EditorNav'
import Split from 'react-split'
import CodeMirror from "@uiw/react-codemirror";
import {} from "@uiw/codemirror-theme-vscode";
import { javascript } from '@codemirror/lang-javascript';
import TestFooter from '../TestFooter';
import { Problem } from '@/utils/types/problem';
import { auth, firestore } from '@/config/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { toast } from "react-toastify";
import { problems } from '@/utils/Data';
import { useRouter } from 'next/router';
import { arrayUnion, doc, updateDoc } from 'firebase/firestore';
type CodeEditorProps={
  problem:Problem,
  setAccepted: React.Dispatch<React.SetStateAction<boolean>>;
  setSolve: React.Dispatch<React.SetStateAction<boolean>>;
  
}
const CodeEditor:React.FC<CodeEditorProps> = ({problem,setAccepted,setSolve}) => {
  const [activeId,setActiveId]=useState(0);
  let [userCode,setUserCode] = useState<string>(problem.starterCode);
  const [user]= useAuthState(auth);
  const {query : {qid}}= useRouter();
  const handleSubmit= async()=>{
alert("submit");
  }
  const handleProblemSubmit=async()=>{
   

    if(!user){
      toast.error("You need to sign up for submitting a problem",{
        position:"top-center",
        autoClose:3000
        
      });
      return;
    }
    try {
      const callback= new Function(`return ${userCode}`)();
      const result= problems[qid as string].handlerFunction(callback);
      if(result){
        alert("All test cases passed!")
       
      }
    } catch (error:any) {
      alert(`"One or more test cases failed \n" ${error.message}`);
      console.log(error)
    }
    // try {
    //  userCode = userCode.slice(userCode.indexOf(problem.starterFunctionName)) 
    //  const callback= new Function(`return ${userCode}`)(); 
    //  const handler= problems[qid as string].handlerFunction;
    //  if(typeof handler === 'function'){
    //   const response= handler(callback);
    //   if(response){
    //     toast.success("Congratulations! All test cases passed.");
    //     // setAccepted(true);
    //     // setTimeout(()=>{
    //     //   setAccepted(false);
    //     // },3000)
    //    }
    //    const userRef= doc(firestore,"users",user.uid);
    //    await updateDoc(userRef, {
    //     solvedProblems: arrayUnion(qid)
    //    });
    //    setSolve(true);
    //  }
   
    // } catch (error) {
    //   console.log(error)
    // }
  }
  const onCodeChange=(value:string)=>{
    setUserCode(value);
    localStorage.setItem(`code-${qid}`, JSON.stringify(value));
  }
  useEffect(()=>{
    const code= localStorage.getItem(`code-${qid}`);
    if(user){
      setUserCode(code ? JSON.parse(code): problem.starterCode);
    }else{
      setUserCode(problem.starterCode);
    }
  },[qid, user, problem.starterCode])
  return (
    <div className='flex flex-col relative'>
     <EditorNav/>
     <Split className='h-[calc(100vh-94px)]' direction='vertical' sizes={[60,40]} minSize={60}>
    <CodeMirror 
    value={userCode}
    // theme={vscodeDark}
    onChange={onCodeChange}
    extensions={[javascript()]}
    // style={{ fontSize: settings.fontSize }}
    />
        <div className='w-full px-5 overflow-auto'>
          <div className='flex h-10 items-center space-x-6  '>
            <div className='relative flex h-full flex-col justify-center cursor-pointer '>
                <div className='font-medium leading-5'>Test cases</div>
                <hr className='absolute bottom-0 bg-black h-[3px] w-full'/>
            </div>

          </div>
          <div className='flex'>
				
						{problem.examples.map((example,idx)=>(
              	<div
								className='mr-2 items-start mt-2 cursor-default'
								key={example.id} onClick={()=>setActiveId(example.id)}
							>
								<div className='flex flex-wrap items-center gap-y-4'>
									<div
										className={`font-medium items-center transition-all focus:outline-none inline-flex bg-dark-fill-3 hover:bg-gray-300 relative rounded-lg px-4 py-1 cursor-pointer whitespace-nowrap
										${activeId === idx ? "text-black" : "text-gray-500"}
									`}
									>
										Case {idx+1}
									</div>
								</div>
							</div>
            ))}
					
					</div>
                    <div className='font-semibold my-5'>
                    <p className='text-sm font-medium '>Input</p>
                    <div className='w-full cursor-text border px-3 py-3 bg-gray-100'>
                    {problem.examples[activeId].inputText}
                    </div>
                    <p className='text-sm font-medium '>Output</p>
                    <div className='w-full cursor-text border px-3 py-3 bg-gray-100'>
                    {problem.examples[activeId].outputText}
                    </div>
                    </div>
                    
            </div>
            <TestFooter handleProblemSubmit={handleProblemSubmit}/>
     </Split>
    </div>
  )
}

export default CodeEditor
