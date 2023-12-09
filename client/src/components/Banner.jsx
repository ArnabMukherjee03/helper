import React from "react";
import { NavLink } from "react-router-dom";
const Banner = () => {
  return (
   <>
     {/* Main Div :: Start */}
      <div className="flex flex-col-reverse h-auto w-full md:flex-row">
        {/* Head & Sub Heading :: Start */}
        <div className="w-full pt-[20px] pl-5 md:pt-[60px] md:pl-8 lg:w-[40%] lg:pt-[130px] lg:pl-[60px]">
          <div className="font-primary leading-[1.2] text-[30px]  lg:text-[40px]">
            <span className="text-[#3cb878]">Locate Atms</span> With
            <br/> 
            Cash Availability!
          </div>
          <p className="font-secondary pt-2 leading-[1.2] tracking-wide text-[14px] w-[80%] lg:text-[20px]">Helping you find cash ready ATM's in your area</p>
          <NavLink to="/atms"><div className="mt-8 font-secondary text-sm rounded-[4px] py-2 px-4 bg-yellow-400 w-[120px] text-center">Find Now</div></NavLink>
        </div>
        {/* Head & Sub Heading :: End */}
        {/* Banner Image :: Start */}
        <div className="w-full mt-6  lg:mt-[50px] lg:w-[60%]">
          <img className="w-full px-5 md:px-0" src="https://images.unsplash.com/photo-1582654851131-e0139ab47a8e?q=80&w=1931&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" srcset="" />
        </div>
        {/* Banner Image :: End */}
      </div>
      {/* Main Div :: End */}
   </>
  );
};

export default Banner;
