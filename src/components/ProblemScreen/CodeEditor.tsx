import React from 'react'
import EditorNav from './EditorNav'
import Split from 'react-split'
import CodeMirror from "@uiw/react-codemirror";
import {} from "@uiw/codemirror-theme-vscode";
import { javascript } from '@codemirror/lang-javascript';
import TestFooter from '../TestFooter';
const CodeEditor = () => {
  return (
    <div className='flex flex-col relative'>
     <EditorNav/>
     <Split className='h-[calc(100vh-94px)]' direction='vertical' sizes={[60,40]} minSize={60}>
    <CodeMirror 
    value="int a =1;"
    // theme={vscodeDark}
    // onChange={onChange}
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
				
							<div
								className='mr-2 items-start mt-2 '
								
							>
								<div className='flex flex-wrap items-center gap-y-4'>
									<div
									// 	className={`font-medium items-center transition-all focus:outline-none inline-flex bg-dark-fill-3 hover:bg-dark-fill-2 relative rounded-lg px-4 py-1 cursor-pointer whitespace-nowrap
									// 	${activeTestCaseId === index ? "text-white" : "text-gray-500"}
									// `}
									>
										Case 1
									</div>
								</div>
							</div>
					
					</div>
                    <div className='font-semibold my-5'>
                    <p className='text-sm font-medium '>Input</p>
                    <div className='w-full cursor-text border px-3 py-3 bg-gray-100'>
                    nums:[2,3,6,7]
                    </div>
                    <p className='text-sm font-medium '>Output</p>
                    <div className='w-full cursor-text border px-3 py-3 bg-gray-100'>
                    6
                    </div>
                    </div>
                    <TestFooter/>
            </div>
     </Split>
    </div>
  )
}

export default CodeEditor
