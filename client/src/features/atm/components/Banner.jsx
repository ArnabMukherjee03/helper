import React,{useContext} from 'react'
import { atmContext } from '../../../context/AtmContext';

const Banner = () => {
  const {setAtm} = useContext(atmContext);
  return (
    <div className='mt-3 h-auto py-10 lg:py-0 lg:h-[30vh] flex flex-col justify-center items-center'>
        <div className="text-sm pb-2 font-secondary"> <i className="fa-solid fa-house-chimney"></i> / ATMs</div>
        <p className='font-primary leading-[1.2] text-xl lg:text-[30px]'><span className="text-[#3cb878]">Find ATM's</span> Near You</p>
        {/* <p className='font-secondary pt-2 leading-[1.2] tracking-wide text-sm'>Keep the community informed about cash availability status.</p> */}
        <div onClick={e=>{setAtm(true)}} className="mt-2 font-secondary text-sm rounded-[4px] py-2 px-4 border-[1px] border-yellow-400 w-[180px] cursor-pointer text-center">Add New Atm</div>
    </div>
  )
}

export default Banner
