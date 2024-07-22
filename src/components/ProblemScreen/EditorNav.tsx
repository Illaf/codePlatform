import React, { useEffect, useState } from 'react'
import { IoSettingsOutline } from "react-icons/io5";
import { AiOutlineFullscreen } from "react-icons/ai";
import { AiOutlineFullscreenExit } from "react-icons/ai";
const EditorNav = () => {
    const [fullScreen, setFullScreen] = useState(false);
    const handleFullScreen=()=>{
        if(fullScreen){
            document.exitFullscreen();
        }else{
            document.documentElement.requestFullscreen();
        }
        setFullScreen(!fullScreen);
    }
    useEffect(() => {
		function exitHandler(e: any) {
			if (!document.fullscreenElement) {
				setFullScreen(false);
				return;
			}
			setFullScreen(true);
		}

		if (document.addEventListener) {
			document.addEventListener("fullscreenchange", exitHandler);
			document.addEventListener("webkitfullscreenchange", exitHandler);
			document.addEventListener("mozfullscreenchange", exitHandler);
			document.addEventListener("MSFullscreenChange", exitHandler);
		}
	}, [fullScreen]);
    return (
        <div className='flex justify-between  bg-primary-color-2'>
            <div className='flex items-center text-white '>
                <button className='flex  items-center roundede  text-black
             px-2 py-1.5 '>
                    <div className='text-xs cursor-pointer px-2 py-2 rounded-md bg-gray-300 hover:bg-slate-50'>Javascript</div>

                </button>

            </div>
            <button>
            <div className='flex items-center m-2'>
                <div>
                    <IoSettingsOutline />
                </div>
                <div className='absolute w-auto p-2 text-sm m-2 min-w-max translate-x-3 right-0 top-5 z-10 rounded-md shadow-md bg-gray-100 origin-center scale-0 transition-all duration-100 ease-linear group-hover:scale-100'>
                    Settings
                </div>
            </div>
            </button>
            <button>
            <div className='flex items-center m-2 mr-4'>
                <div onClick={handleFullScreen}>
             {!fullScreen ? <AiOutlineFullscreen className='text-white font-bold text-3xl'/>:<AiOutlineFullscreenExit className='text-white font-bold text-2xl'/>}
                </div>
                <div className='absolute w-auto p-2 text-sm m-2 min-w-max translate-x-3 right-0 top-5 z-10 rounded-md shadow-md bg-gray-100 origin-center scale-0 transition-all duration-100 ease-linear group-hover:scale-100'>
                    Full screen
                </div>
            </div>
            </button>
        </div>
    )
}

export default EditorNav
