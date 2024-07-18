import React from 'react'
import Split from 'react-split';
import Description from './Description';

import CodeEditor from './CodeEditor';
import { Problem } from '@/utils/types/problem';
type ProblemScreenProps={
problem :Problem
}
const ProblemScreen:React.FC<ProblemScreenProps> = ({problem}) => {
  
  return (
    <Split className="split" minSize={0}>
      <Description problem={problem} solved={false}/>
      <CodeEditor problem={problem}/>
    </Split>
  )
}

export default ProblemScreen
