import React, { useState } from 'react'
import Split from 'react-split';
import Description from './Description';
import Confetti from 'react-confetti';
import CodeEditor from './CodeEditor';
import { Problem } from '@/utils/types/problem';
type ProblemScreenProps={
problem :Problem,

}
const ProblemScreen:React.FC<ProblemScreenProps> = ({problem}) => {
  const [accepted,setAccepted]=useState(false);
  const [solve,setSolve]= useState(false);
  return (
    <Split className="split" minSize={0}>
      <Description problem={problem} solved={solve}/>
      <CodeEditor problem={problem} setAccepted={setAccepted} setSolve={setSolve}/>
    </Split>
  )
}

export default ProblemScreen
