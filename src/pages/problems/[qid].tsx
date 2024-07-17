import ProblemScreen from '@/components/ProblemScreen/ProblemScreen'
import TopSection from '@/components/TopSection'
import React from 'react'

const ProblemWindow = () => {
  return (
    <div className='overflow-hidden'>
        <TopSection problemWindow={true}/>
        <ProblemScreen problem={{
        id: '',
        title: '',
        difficulty: '',
        category: '',
        order: 0,
        videoId: undefined
      }}/>
    
    </div>
  )
}

export default ProblemWindow
