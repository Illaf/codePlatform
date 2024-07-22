import React from 'react'
type testFooterProps={
	handleProblemSubmit: ()=> void;
}
const TestFooter = ({handleProblemSubmit}) => {
	
  return (
    <div className='flex absolute bottom-0 w-full z-10 space-x-2 justify-between bg-slate-300'>
      <div className='mx-10 my-[10px] flex justify-between w-full '>
        <div className='mr-2 flex flex-1 items-center space-x-3'>
        <button className='px-3 py-1.5 font-medium items-center transition-all inline-flex bg-dark-fill-3 text-sm hover:bg-dark-fill-2 text-dark-label-2 rounded-lg pl-3 pr-2'>
						Console
						<div className='ml-1 transform transition flex items-center'>
							{/* <BsChevronUp className='fill-gray-6 mx-1 fill-dark-gray-6' /> */}
						</div>
					</button>
                    <div className='ml-auto flex items-center space-x-4'>
					<button
						className='px-3 py-1.5 text-sm font-medium items-center whitespace-nowrap transition-all focus:outline-none inline-flex bg-dark-fill-3  hover:bg-dark-fill-2 text-dark-label-2 rounded-lg'
						onClick={handleProblemSubmit}
					>
						Run
					</button>
					<button
						className='px-3 py-1.5 font-medium items-center transition-all focus:outline-none inline-flex text-sm text-white bg-dark-green-s hover:bg-green-3 rounded-lg'
					onClick={handleProblemSubmit}	
					>
						Submit
					</button>
				</div>
        </div>
      </div>
    </div>
  )
}

export default TestFooter
