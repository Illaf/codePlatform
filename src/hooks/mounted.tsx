import { useEffect,useState } from "react";

function useMounted(){
    const [hasMounted, setHasMounted]= useState(false);
useEffect(()=>{
    setHasMounted(true);
},[])    
return hasMounted;
}
export default useMounted;