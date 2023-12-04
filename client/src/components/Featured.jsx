import React,{useContext} from 'react'
import FeatureImg from "../image/atm-operation-bank.jpg";
import {atmContext} from "../context/AtmContext";

const Featured = () => {
  const {setAtm} = useContext(atmContext);
  return (
    <>
     {/* Main Div :: Start */}
      <div className="flex flex-col w-full h-auto md:flex-row lg:h-[60vh]">
        {/* Banner Image :: Start */}
        <div className="w-full flex items-end lg:w-[60%]">
          <img className="w-full object-top" src={FeatureImg} alt="" srcset="" />
        </div>
        {/* Banner Image :: End */}
        {/* Head & Sub Heading :: Start */}
        <div className="w-full pt-[50px] pl-[30px] lg:w-[40%]  lg:pt-[100px] lg:pl-[60px]">
           <div className="font-primary pl-[50px] uppercase text-xs text-[#999999] relative tracking-[2.8px] yellowLine">
            Share ATM Locations</div>
          <div className="font-primary pt-2 leading-[1.2]  text-[40px]">
            <span className="text-[#3cb878]">Help Others </span>
            <br/> 
            Find ATMs
          </div>
          <p className="font-secondary pt-2 leading-[1.2] tracking-wide text-sm w-[80%]">Help expand our database by adding new ATM locations</p>
          <div onClick={e=>{setAtm(true)}} className="mt-8 font-secondary text-sm rounded-[4px] py-2 px-4 bg-yellow-400 w-[180px] cursor-pointer text-center">Add New Atm</div>
        </div>
        {/* Head & Sub Heading :: End */}
      </div>
      {/* Main Div :: End */}
   </>
  )
}

export default Featured;
