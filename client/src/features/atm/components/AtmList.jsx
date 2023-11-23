import React, { useEffect, useState } from "react";
import { MutatingDots } from "react-loader-spinner";
import {NavLink} from "react-router-dom";
import Star from "../../Star/Star";
import {useSelector,useDispatch} from "react-redux"
import { fetchAtmsAsync, selectAtms, selectStatus } from "../atmSlice";
import io from "socket.io-client";

const AtmList = () => {
  const dispatch = useDispatch();
  const status = useSelector(selectStatus);
  const Atms = useSelector(selectAtms);
  const socket = io.connect('https://helperapi-chi.vercel.app');
  
  const [filter,setFilter] = useState({});
  const [atms,setAtms] = useState([]);
  const [isNavbarVisible, setIsNavbarVisible] = useState(false);

  const toggleNavbar = () => {
    setIsNavbarVisible(!isNavbarVisible);
  };

  useEffect(()=>{
    setAtms(Atms)
  },[Atms]);


  useEffect(()=>{
    socket.on("updateAtm", ({ updateAtm}) => {
      const index = atms.findIndex(
        (item) => item._id === updateAtm._id
      );
      if (index !== -1) {
        const updatedAtm = [...atms];
        updatedAtm[index] = updateAtm;
        setAtms(updatedAtm);
      }
    });
    
    return () => {
      socket.off("updateAtm");
    };
  },[socket,atms]);


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
    setFilter(newFilter);
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
                  <div key={atm._id} className="flex w-full lg:w-[48%]">
                    <div className={`w-[40%] flex justify-center items-center lg:w-[30%]  ${atm && !atm.cashstatus?"text-red-500":"text-green-500"}`}>
                    <svg
                        className="w-full"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 1024 1024"
                        fill="currentColor"
                        class="icon"
                        version="1.1"
                      >
                        <path
                          d="M360.484 448.004c-4.414 0-8.076-3.578-8.076-8 0-4.42 3.5-8 7.92-8h0.156c4.422 0 8 3.578 8 8 0 4.422-3.578 8-8 8zM392.482 448.004c-4.414 0-8.076-3.578-8.076-8 0-4.42 3.5-8 7.92-8h0.156c4.422 0 8 3.578 8 8 0 4.422-3.578 8-8 8zM424.48 448.004c-4.414 0-8.076-3.578-8.076-8 0-4.42 3.5-8 7.92-8h0.156c4.422 0 8 3.578 8 8 0 4.422-3.578 8-8 8zM456.478 448.004c-4.414 0-8.076-3.578-8.076-8 0-4.42 3.5-8 7.92-8h0.156c4.422 0 8 3.578 8 8 0 4.422-3.578 8-8 8zM360.484 480.002c-4.414 0-8.076-3.578-8.076-8 0-4.42 3.5-8 7.92-8h0.156c4.422 0 8 3.578 8 8 0 4.422-3.578 8-8 8zM392.482 480.002c-4.414 0-8.076-3.578-8.076-8 0-4.42 3.5-8 7.92-8h0.156c4.422 0 8 3.578 8 8 0 4.422-3.578 8-8 8zM424.48 480.002c-4.414 0-8.076-3.578-8.076-8 0-4.42 3.5-8 7.92-8h0.156c4.422 0 8 3.578 8 8 0 4.422-3.578 8-8 8zM456.478 480.002c-4.414 0-8.076-3.578-8.076-8 0-4.42 3.5-8 7.92-8h0.156c4.422 0 8 3.578 8 8 0 4.422-3.578 8-8 8zM488.476 448.004c-4.414 0-8.076-3.578-8.076-8 0-4.42 3.5-8 7.92-8h0.156c4.422 0 8 3.578 8 8 0 4.422-3.578 8-8 8zM488.476 480.002c-4.414 0-8.076-3.578-8.076-8 0-4.42 3.5-8 7.92-8h0.156c4.422 0 8 3.578 8 8 0 4.422-3.578 8-8 8z"
                          fill=""
                        />
                        <path
                          d="M679.988 991.97H168.02a7.994 7.994 0 0 1-7.998-8V8.032c0-4.422 3.578-8 7.998-8h511.968c4.422 0 8 3.578 8 8v975.94a7.994 7.994 0 0 1-8 7.998zM176.02 975.972h495.97V16.03H176.02v959.942z"
                          fill=""
                        />
                        <path
                          d="M855.978 991.97h-175.99a7.994 7.994 0 0 1-7.998-8V8.032c0-4.422 3.578-8 7.998-8h175.99c4.422 0 8 3.578 8 8v975.94a7.994 7.994 0 0 1-8 7.998z m-167.99-15.998h159.99V16.03h-159.99v959.942z"
                          fill=""
                        />
                        <path
                          d="M855.978 112.024H168.02a7.994 7.994 0 0 1-7.998-8c0-4.422 3.578-8 7.998-8h687.958c4.422 0 8 3.578 8 8 0 4.422-3.578 8-8 8zM248.016 192.02a7.976 7.976 0 0 1-5.656-2.344L194.364 141.678a8 8 0 0 1 11.31-11.312l47.998 47.998a8 8 0 0 1-5.656 13.656zM599.994 192.02a8 8 0 0 1-5.656-13.656l47.996-47.998a8 8 0 1 1 11.312 11.312l-47.996 47.998a7.974 7.974 0 0 1-5.656 2.344zM583.994 208.018h-319.98a7.994 7.994 0 0 1-7.998-8c0-4.422 3.578-8 7.998-8h319.98c4.422 0 8 3.578 8 8 0 4.422-3.578 8-8 8z"
                          fill=""
                        />
                        <path
                          d="M599.978 416.006a7.98 7.98 0 0 1-7.954-7.39l-16-207.986a7.976 7.976 0 0 1 7.36-8.578c4-0.766 8.25 2.938 8.578 7.36l16 207.986a7.976 7.976 0 0 1-7.36 8.578c-0.202 0.03-0.404 0.03-0.624 0.03zM248.024 416.006c-0.204 0-0.414 0-0.624-0.032a7.986 7.986 0 0 1-7.36-8.578l16-207.986c0.336-4.406 3.968-8.078 8.592-7.36a7.986 7.986 0 0 1 7.36 8.578l-15.998 207.986a8 8 0 0 1-7.97 7.392z"
                          fill=""
                        />
                        <path
                          d="M599.994 416.006H248.016c-4.422 0-8-3.578-8-8 0-4.42 3.578-8 8-8h351.978c4.422 0 8 3.578 8 8 0 4.422-3.578 8-8 8zM200.01 480.002a7.992 7.992 0 0 1-6.646-12.436l31.998-47.998a7.98 7.98 0 0 1 11.092-2.218 7.992 7.992 0 0 1 2.218 11.092l-31.998 47.998a7.99 7.99 0 0 1-6.664 3.562z"
                          fill=""
                        />
                        <path
                          d="M312.02 496a7.998 7.998 0 0 1-7.766-9.936l16-63.996c1.062-4.296 5.374-6.86 9.694-5.828a8 8 0 0 1 5.82 9.704l-15.998 63.996a7.986 7.986 0 0 1-7.75 6.06zM535.998 496a8 8 0 0 1-7.766-6.062l-15.99-63.996a8.002 8.002 0 0 1 5.818-9.704c4.258-1.016 8.632 1.532 9.696 5.828l16.008 63.996a8.01 8.01 0 0 1-7.766 9.938zM647.99 480.002a7.994 7.994 0 0 1-6.656-3.562l-31.996-47.998a8 8 0 0 1 2.218-11.092c3.638-2.454 8.624-1.468 11.092 2.218l31.998 47.998a8 8 0 0 1-6.656 12.436z"
                          fill=""
                        />
                        <path
                          d="M679.988 512H168.02a7.994 7.994 0 0 1-7.998-8c0-4.42 3.578-8 7.998-8h511.968c4.422 0 8 3.578 8 8 0 4.422-3.578 8-8 8zM280.014 80.026h-79.996a7.994 7.994 0 0 1-7.998-8V40.03c0-4.422 3.578-8 7.998-8h79.996c4.422 0 8 3.578 8 8v31.998a7.994 7.994 0 0 1-8 7.998z m-71.996-15.998h63.996v-16h-63.996v16zM647.99 80.026h-79.994c-4.422 0-8-3.578-8-8V40.03c0-4.422 3.578-8 8-8h79.994c4.422 0 8 3.578 8 8v31.998a7.994 7.994 0 0 1-8 7.998z m-71.996-15.998h63.996v-16h-63.996v16zM519.998 64.028h-191.988a7.994 7.994 0 0 1-7.998-8c0-4.42 3.578-8 7.998-8h191.988c4.422 0 8 3.578 8 8 0 4.422-3.578 8-8 8zM647.99 719.988H200.018c-4.42 0-7.998-3.578-7.998-8s3.578-8 7.998-8h447.972c4.422 0 8 3.578 8 8s-3.578 8-8 8zM504 575.996h-159.99c-4.422 0-8-3.578-8-8v-15.998c0-4.422 3.578-8 8-8s8 3.578 8 8v7.998H496v-7.998c0-4.422 3.578-8 8-8s8 3.578 8 8v15.998c0 4.422-3.578 8-8 8zM823.98 416.006h-111.994c-4.422 0-8-3.578-8-8v-15.998c0-4.422 3.578-8 8-8s8 3.578 8 8v8h95.994v-8c0-4.422 3.578-8 8-8a7.994 7.994 0 0 1 7.998 8v15.998c0 4.422-3.578 8-7.998 8zM312.004 655.992a8.004 8.004 0 0 1-7.688-5.796l-31.998-111.994a7.996 7.996 0 0 1 5.5-9.888c4.226-1.25 8.68 1.234 9.89 5.482l31.998 111.994a8 8 0 0 1-5.5 9.89 7.68 7.68 0 0 1-2.202 0.312zM535.998 655.992a7.78 7.78 0 0 1-2.204-0.312 7.982 7.982 0 0 1-5.484-9.89l31.998-111.994c1.204-4.232 5.578-6.78 9.89-5.482a7.98 7.98 0 0 1 5.482 9.888l-31.996 111.994a7.986 7.986 0 0 1-7.686 5.796zM504 607.994h-159.99c-4.422 0-8-3.578-8-8a7.994 7.994 0 0 1 8-7.998H504c4.422 0 8 3.578 8 7.998 0 4.422-3.578 8-8 8zM535.998 767.984H312.012c-4.422 0-8-3.578-8-8s3.578-8 8-8h223.986c4.422 0 8 3.578 8 8s-3.578 8-8 8z"
                          fill=""
                        />
                        <path
                          d="M312.012 767.984c-4.422 0-8-3.578-8-8v-15.998c0-4.422 3.578-8 8-8s8 3.578 8 8v15.998c0 4.422-3.578 8-8 8zM535.998 767.984c-4.422 0-8-3.578-8-8v-15.998c0-4.422 3.578-8 8-8s8 3.578 8 8v15.998c0 4.422-3.578 8-8 8zM280.014 543.998h-79.996a7.994 7.994 0 0 1-7.998-8 7.994 7.994 0 0 1 7.998-7.998h79.996c4.422 0 8 3.578 8 7.998 0 4.422-3.578 8-8 8zM647.99 543.998h-79.994c-4.422 0-8-3.578-8-8a7.994 7.994 0 0 1 8-7.998h79.994c4.422 0 8 3.578 8 7.998 0 4.422-3.578 8-8 8zM264.014 591.996h-63.996c-4.42 0-7.998-3.578-7.998-8s3.578-8 7.998-8h63.996c4.422 0 8 3.578 8 8s-3.578 8-8 8zM647.99 591.996h-63.996c-4.422 0-8-3.578-8-8s3.578-8 8-8h63.996c4.422 0 8 3.578 8 8s-3.578 8-8 8zM535.998 655.992H312.012c-4.422 0-8-3.578-8-8s3.578-8 8-8h223.986c4.422 0 8 3.578 8 8s-3.578 8-8 8zM216.018 1023.968c-13.234 0-23.998-10.766-23.998-23.998 0-4.422 3.578-8 7.998-8 4.422 0 8 3.578 8 8 0 4.404 3.586 7.998 8 7.998s8-3.594 8-7.998c0-4.422 3.578-8 7.998-8 4.422 0 8 3.578 8 8 0 13.234-10.766 23.998-23.998 23.998zM807.98 1023.968c-13.232 0-23.998-10.766-23.998-23.998 0-4.422 3.578-8 8-8s8 3.578 8 8a8.014 8.014 0 0 0 7.998 7.998c4.406 0 8-3.594 8-7.998 0-4.422 3.578-8 8-8a7.994 7.994 0 0 1 7.998 8c0 13.234-10.764 23.998-23.998 23.998zM855.978 288.014h-175.99a7.994 7.994 0 0 1-7.998-8c0-4.42 3.578-8 7.998-8h175.99c4.422 0 8 3.578 8 8 0 4.422-3.578 8-8 8zM855.978 719.988h-175.99c-4.42 0-7.998-3.578-7.998-8s3.578-8 7.998-8h175.99c4.422 0 8 3.578 8 8s-3.578 8-8 8zM855.978 512h-175.99a7.994 7.994 0 0 1-7.998-8c0-4.42 3.578-8 7.998-8h175.99c4.422 0 8 3.578 8 8 0 4.422-3.578 8-8 8zM807.98 48.028h-79.994c-4.422 0-8-3.578-8-8 0-4.422 3.578-8 8-8h79.994c4.422 0 8 3.578 8 8 0 4.422-3.578 8-8 8zM791.982 80.026h-47.998a7.994 7.994 0 0 1-7.998-8c0-4.422 3.578-8 7.998-8h47.998c4.422 0 8 3.578 8 8 0 4.422-3.578 8-8 8zM727.986 671.99c-4.422 0-8-3.578-8-8v-79.994c0-4.422 3.578-8 8-8s8 3.578 8 8v79.994c0 4.422-3.578 8-8 8zM807.98 671.99a7.994 7.994 0 0 1-7.998-8v-79.994c0-4.422 3.578-8 7.998-8 4.422 0 8 3.578 8 8v79.994c0 4.422-3.578 8-8 8z"
                          fill=""
                        />
                        <path
                          d="M727.986 607.994h-16c-4.422 0-8-3.578-8-8a7.994 7.994 0 0 1 8-7.998h16c4.422 0 8 3.578 8 7.998 0 4.422-3.578 8-8 8zM823.98 607.994h-16a7.994 7.994 0 0 1-7.998-8 7.994 7.994 0 0 1 7.998-7.998h16a7.994 7.994 0 0 1 7.998 7.998c0 4.422-3.578 8-7.998 8zM807.98 671.99h-79.994c-4.422 0-8-3.578-8-8a7.994 7.994 0 0 1 8-7.998h79.994c4.422 0 8 3.578 8 7.998 0 4.422-3.578 8-8 8zM767.982 607.994c-13.232 0-23.998-10.766-23.998-23.998 0-4.422 3.578-8 8-8s8 3.578 8 8c0 4.406 3.594 8 7.998 8 4.406 0 8-3.594 8-8 0-4.422 3.578-8 8-8s8 3.578 8 8c0 13.232-10.766 23.998-24 23.998zM551.996 288.014H296.012a7.994 7.994 0 0 1-7.998-8c0-4.42 3.578-8 7.998-8h255.984c4.422 0 8 3.578 8 8 0 4.422-3.578 8-8 8zM504 336.01h-159.99c-4.422 0-8-3.578-8-8 0-4.422 3.578-8 8-8H504c4.422 0 8 3.578 8 8 0 4.422-3.578 8-8 8z"
                          fill=""
                        />
                      </svg>
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
