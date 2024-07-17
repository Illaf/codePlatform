import React, { useEffect, useState } from 'react';
import { MdOutlineTimer } from 'react-icons/md';
import { RiRestartLine } from 'react-icons/ri';

const Timer = () => {
  const [timer, setTimer] = useState(false);
  const [time, setTime] = useState(0);
  const [showTooltip, setShowTooltip] = useState(false);

  const formatTime = (time) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;

    return `${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
  };

  useEffect(() => {
    let intervalId;

    if (timer) {
      intervalId = setInterval(() => {
        setTime((time) => time + 1);
      }, 1000);
    }

    return () => clearInterval(intervalId);
  }, [timer]);

  return (
    <div>
      {timer ? (
        <div className='flex items-center cursor-pointer rounded-full flex-row'>
          <div>{formatTime(time)}</div>
          <RiRestartLine onClick={() => { setTimer(false); setTime(0); }} />
        </div>
      ) : (
        <div className='relative inline-block'>
          <MdOutlineTimer
            className='text-xl cursor-pointer'
            onClick={() => setTimer(true)}
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
          />
          {showTooltip && (
            <div
              className='absolute top-8 w-12 left-1/2 transform -translate-x-1/2 bg-white text-black p-2 rounded shadow-lg z-40
              transition-all duration-300 ease-in-out'
            >
              <p className='text-sm  '>set Timer</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Timer;
