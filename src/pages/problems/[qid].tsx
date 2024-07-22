import ProblemScreen from '@/components/ProblemScreen/ProblemScreen'
import TopSection from '@/components/TopSection'
import React from 'react'
import {Problem} from "@/utils/types/problem";
import {problems} from "@/utils/Data";
import useMounted from '@/hooks/mounted';
type ProblemWindowProps={
  problem:Problem
}
const ProblemWindow:React.FC<ProblemWindowProps> = ({problem}) => {
  // console.log(problem);
  const hasMounted= useMounted();
	if(!hasMounted){
		return null;
	}
  return (
    <div className='overflow-hidden'>
        <TopSection problemWindow={true}/>
        <ProblemScreen  problem={problem}/>
    
    
    </div>
  )
}

export default ProblemWindow

export async function getStaticPaths() {
	const paths = Object.keys(problems).map((key) => ({
		params: { qid: key },
	}));

	return {
		paths,
		fallback: false,
	};
}

// getStaticProps => it fetch the data

export async function getStaticProps({ params }: { params: { qid: string } }) {
	const { qid } = params;
	const problem = problems[qid];
if (!problem) {
		return {notFound: true};
	}
	problem.handlerFunction = problem.handlerFunction.toString();
	return {
		props: {
			problem,
		},
	};
}