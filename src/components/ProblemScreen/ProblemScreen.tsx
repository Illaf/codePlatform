import React from 'react'
import Split from 'react-split';
import Description from './Description';
import { Problem } from '@/Data/questions';
import CodeEditor from './CodeEditor';
type ProblemScreenProps={
problem :Problem
}
const ProblemScreen:React.FC<ProblemScreenProps> = ({problem}) => {
  
  return (
    <Split className="split" minSize={0}>
      <Description problem={problem} solved={false}/>
      <CodeEditor/>
    </Split>
  )
}

export default ProblemScreen
