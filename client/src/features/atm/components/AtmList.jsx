import React, { useContext, useEffect, useState } from "react";
import { MutatingDots } from "react-loader-spinner";
import {NavLink} from "react-router-dom";
import Star from "../../Star/Star";
import {useSelector,useDispatch} from "react-redux"
import { fetchAtmsAsync, selectAtms, selectStatus } from "../atmSlice";
import atmsvg from "../../../image/atm.svg";
import { atmContext } from "../../../context/AtmContext";

const AtmList = () => {
  const dispatch = useDispatch();
  const status = useSelector(selectStatus);
  const atms = useSelector(selectAtms);
  
  
  const {filter, setFilter} = useContext(atmContext);
  const [isNavbarVisible, setIsNavbarVisible] = useState(false);

  const toggleNavbar = () => {
    setIsNavbarVisible(!isNavbarVisible);
  };

 



  useEffect(()=>{
    dispatch(fetchAtmsAsync(filter));
    console.log(filter)
  },[dispatch,filter]);

  const handleFilter = (e, section, option) => {
    const newFilter = { ...filter };
    if (e.target.checked) {
      if (newFilter[section]) {
        newFilter[section].push(option);
      } else {
        newFilter[section] = [option];
      }
    } else {
      const index = newFilter[section].findIndex((el) => el === option);
      newFilter[section].splice(index, 1);
    }
    setFilter({...filter,...newFilter})
  };

  
  const bank = [
    {
      _id: 1,
      name: "State Bank of India",
      value: "SBI"
    },
    {
      _id: 2,
      name: "Axis Bank",
      value: "Axis Bank"
    },
    {
      _id: 3,
      name: "Punjab National Bank",
      value: "PNB"
    },
  ];

  const option = [
    {
      _id: 1,
      name: "Cash Available",
      value: true
    },
    {
      _id: 2,
      name: "Cash Not Available",
      value: false
    },
  ]



 
  return (
    <div className="mt-0 lg:mt-4">
      <div className="flex flex-col lg:flex-row h-auto mx-4">
        {/* Start:: Filter Section */}
        <div className={`w-full absolute  ${isNavbarVisible?"top-0":"top-[-100%]"} transition-all duration-500 ease-in-out h-auto py-10 bg-white z-40 lg:relative lg:py-0 lg:w-[25%]  flex-col `}>
          {/* Banks Name:: Start */}
          <div onClick={toggleNavbar} className="flex justify-end px-4 font-primary lg:hidden text-red-500">Close</div>
          <div className="flex flex-col gap-3 text-xs font-secondary border-b-[1px] pb-5">
          <p className="font-primary text-base tracking-wide">Bank's Name</p>
          {bank.map((option) => {
                  return (
                    <div key={option._id} className="flex items-center">
                      <input
                        id={option.value}
                        name={option.name}
                        defaultValue={option.value}
                        type="checkbox"
                        defaultChecked={option.checked}
                        onChange={(e) =>
                          handleFilter(e, "bankname", option.value)
                        }
                        className="h-4 w-4 rounded border-gray-300 text-[#289c28] focus:ring-[#289c28]"
                      />
                      <label
                        htmlFor={option.name}
                        className="ml-3 text-xs text-gray-600"
                      >
                        {option.name}
                      </label>
                    </div>
                  );
                })}
          </div>
          {/* Banks Name:: End */}
          {/* Cash Available:: Start */}
          <div className="flex flex-col gap-3 text-xs font-secondary border-b-[1px] pb-5">
          <p className="font-primary text-base tracking-wide">Cash Availability</p>
                    {option.map((option) => {
                  return (
                    <div key={option._id} className="flex items-center">
                      <input
                        id={option.value}
                        name={option.name}
                        defaultValue={option.value}
                        type="checkbox"
                        defaultChecked={option.checked}
                        onChange={(e) =>
                          handleFilter(e, "cashstatus", option.value)
                        }
                        className="h-4 w-4 rounded border-gray-300 text-[#289c28] focus:ring-[#289c28]"
                      />
                      <label
                        htmlFor={option.name}
                        className="ml-3 text-xs text-gray-600"
                      >
                        {option.name}
                      </label>
                    </div>
                  );
                })}
                    
           </div>      
        </div>
        {/* End :: Filter Section */}
        {/* start :: Product Section  */}
        {status === "loading" ? (
          <div className="h-auto w-full flex items-center justify-center">
            <MutatingDots
              height="100"
              width="100"
              color="#007bff"
              secondaryColor="#007bff"
              radius="10"
              ariaLabel="mutating-dots-loading"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
            />
          </div>
        ) : (
          <div className="flex flex-wrap w-full lg:w-[75%] gap-5 ">
             <div onClick={toggleNavbar} className="flex w-full justify-end font-primary  lg:hidden">Filters</div>
            {atms &&
              atms.map((atm) => {
                return (
                  <div key={atm._id} className="flex justify-center items-center h-auto w-full lg:w-[48%]">
                    <div className='w-[40%] flex justify-center items-center lg:w-[30%] '>
                     <img className="w-full" src={atmsvg} alt="" srcset="" />
                    </div>
                    {/* Atm Details:: Start */}
                    <div className="flex flex-col w-[60%] lg:w-[70%]">
                      <NavLink to={`/atms/${atm._id}`} className="font-primary text-base lg:text-lg leading-[1]">
                        {atm && atm.name}
                      </NavLink>
                      <div className="text-sm flex flex-col lg:flex-row lg:items-center gap-2">
                         <div className="flex items-center">
                         <p className="bg-green-400 font-secondary rounded-sm text-white text-xs py-1 px-2 mt-1">{atm.rating && atm.rating.rate.toFixed(1)}</p>
                         <Star rate={atm.rating && atm.rating.rate}/>
                         </div>
                         {atm && !atm.cashstatus?<p className="text-red-500 font-secondary text-xs pt-0 lg:pt-[5px]">* Cash Not Available</p>:<p className="text-green-500 font-secondary text-xs pt-[5px]">** Cash Available</p>}
                      </div>
                      <p className="font-secondary tracking-wide  text-xs mt-2">
                        {atm && atm.address}, {atm && atm.city}, {atm && atm.state} - {atm && atm.postalcode}
                      </p>
                      <div className="flex justify-between mt-4">
                      <p className="font-secondary text-xs ">{atm.bankname}</p>
                      <p className="text-xs font-secondary ">{atm.helplineNo}</p>
                      </div>
                    </div>
                    {/* Atm Details:: End */}
                  </div>
                );
              })}
          </div>
        )}
        {/* End :: Product Section */}
      </div>
    </div>
  );
};

export default AtmList;
