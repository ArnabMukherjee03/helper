import React, { useContext, useEffect, useState } from "react";
import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Star from "../../Star/Star";
import {useSelector,useDispatch} from "react-redux";
import {useParams} from "react-router-dom";
import { fetchAtmByIdAsync, selectCurrentAtm, selectStatus } from "../atmSlice";
import {getStatusAsync, selectLoading, selectcashStatus, updateStatusAsync } from "../statusSlice";
import io from "socket.io-client";
import { MutatingDots } from "react-loader-spinner";
import { selectUser } from "../../auth/authSlice";
import { atmContext } from "../../../context/AtmContext";

const Atm = () => {
  const socket = io.connect('http://localhost:5000');
  const {setPopup} = useContext(atmContext);

  const [atm,setAtm] = useState([]);
  const [cashStatus,setcashStatus]= useState([]);

  const dispatch = useDispatch();
  const {id} = useParams();
  const currentAtm = useSelector(selectCurrentAtm);
  const loading = useSelector(selectLoading);
  const cashstatus = useSelector(selectcashStatus);
  const status = useSelector(selectStatus);
  const isUser = useSelector(selectUser);

  useEffect(()=>{
    setAtm(currentAtm);
    setcashStatus(cashstatus)
  },[currentAtm,cashstatus]);
 
  useEffect(()=>{
    socket.on("updateAtm", ({ updateAtm , savedStatus}) => {
       console.log("Hello:: ",updateAtm);
       setAtm(updateAtm);
       setcashStatus((cashStatus)=>[...cashStatus,savedStatus]);
    });
    
    return () => {
      socket.off("updateAtm");
    };
  },[socket])


  useEffect(()=>{
      dispatch(fetchAtmByIdAsync(id))
      dispatch(getStatusAsync(id));
  },[dispatch,id])


const handleItemButtonClick = () => {
    const updateData = {
      status: !atm.cashstatus,
      atmId: id
    }
    dispatch(updateStatusAsync(updateData));
};


if(status === "loading"){
   return <div className="h-[80vh] w-full flex justify-center items-center">
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
}



  return (
    // Main Div
    <div className="mx-[30px] lg:mx-[70px]">
      {/* Banner:: Start */}
      <div className='mt-3 h-[15vh] lg:h-[30vh] flex flex-col justify-center items-center'>
        <div className="text-[10px] lg:text-xs pb-2 font-secondary"> <i class="fa-solid fa-house-chimney"></i> / ATMs / {atm && atm.name}</div>
        <p className='font-primary leading-[1.2] text-base lg:text-[25px]'><span className="text-[#3cb878]">Find ATM's</span> Near You</p>
        <p className='font-secondary pt-2 leading-[1.2] tracking-wide text-[10px] lg:text-sm'>Keep the community informed about cash availability status.</p>
      </div>
      {/* Banner:: End */}
      {/* Top Section: Start */}
      <div className="w-full flex flex-col  justify-between gap-[20px] lg:gap-[40px] mt-[30px] h-auto lg:h-[70vh] md:flex-row">
        {/* Atm Images */}
        <div className="relative w-full md:w-[50%]">
          <div className="w-full absolute top-[-20px] lg:top-[-30px] left-[-20px] lg:left-[-30px] bg-yellow-400 h-[32vh] md:h-[23vh] lg:h-[72vh]"></div>
          <Swiper
            className="w-full"
            slidesPerView={1}
            modules={[Autoplay, Navigation]}
            navigation={{
              prevEl: ".prev",
              nextEl: ".next",
            }}
            autoplay={{
              delay: 3000, // Delay between slides in milliseconds
              disableOnInteraction: false, // Allow autoplay to continue even when user interacts with swiper
            }}
            loop={true}
          >
            {atm.image && atm.image.length!==0? atm.image.map(image =>{
                 return <SwiperSlide className="w-full">
                      <img src={image} className="w-full" alt="" srcset="" />
                 </SwiperSlide>
            }):
            <SwiperSlide className="w-full">
                      <img src="https://images.unsplash.com/photo-1592509083886-55ee55e6afcc?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" className="w-full" alt="" srcset="" />
            </SwiperSlide>
          }
          </Swiper>
          <div className="flex absolute z-40 bottom-2 right-2 text-white justify-start mr-4 ">
          <button class="prev rounded-l-full border-r bg-gray-100 text-gray-500 focus:outline-none hover:text-indigo-500 font-bold w-12 h-10">
            ←
          </button>
          <button class="next rounded-r-full bg-gray-100 text-gray-500 focus:outline-none hover:text-indigo-500 font-bold w-12 h-10">
            →
          </button>
          </div>
        </div>
        {/* Atm Details */}
        <div className="w-full md:w-[50%] h-full">
            <p className="font-primary text-[25px] md:text-[28px] lg:text-[30px]">{atm && atm.name}</p>
            <p className="pt-2 font-secondary text-sm w-[80%]">{atm && atm.address}, {atm && atm.city}, {atm && atm.state} - {atm && atm.postalcode}</p>
            <div className="flex items-center gap-4 pt-2">
            <div className="bg-green-400 font-secondary rounded-sm text-white text-xs py-1 px-2 mt-1">{atm && atm.rating && atm.rating.rate.toFixed(1)}</div>
            <Star rate={atm && atm.rating && atm.rating.rate}/>
            <div className="text-sm font-secondary pt-2">{atm && atm.rating && atm.rating.count} Rating</div>
            </div>
            <div className="flex gap-4">
            {
               isUser?
               <button disabled={loading} onClick={handleItemButtonClick} className={`mt-8 font-secondary text-xs rounded-[4px] py-2 px-4 ${atm && atm.cashstatus?"bg-green-400":"bg-red-500"} text-white  w-[140px] text-center ${loading?"bg-green-300 cursor-not-allowed":"cursor-pointer"}`}>Update Status</button>
               :
               <p className="text-red-500 mt-8 font-secondary text-xs">Please Login to Update Status</p>
            }
            <div onClick={e=>{setPopup(true)}} className="mt-8 font-secondary text-xs rounded-[4px] py-2 px-4  text-white  w-[140px] text-center bg-yellow-500 cursor-pointer">Tap to Rate</div>
            </div>
            {/* Cash Status:: Start */}
            <div className="font-primary mt-5 leading-[1.2] relative yellowLine pl-[50px]">Currently {atm && atm.cashstatus ? <span className="text-[#3cb878]">Cash Available</span>:<span className="text-red-500">Cash Not Available</span>}</div>
            <div className="flex flex-col mt-4 gap-2">
              {
                 cashStatus && [...cashStatus]
                 .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                 .slice(0,4)
                 .map(cash => {
                   const time = new Date(cash && cash.createdAt);
                    return(
                      <div className="text-[10px]  lg:text-xs font-secondary">last Updated by <span className="text-[#3cb878] font-primary">{cash && cash.userId.name}</span> at {time.toLocaleString()}</div>
                    )
                 })
              }
            </div>
        </div>
      </div>
      {/* Top Section: Close */}
      {/* Atm Section: Start */}
      <div className="flex relative justify-center mt-6 lg:mt-14">
      <div className="bg-[#3cb878] w-[300px] md:w-[720px] lg:w-[800px] h-[300px] absolute right-[35px] md:right-[40px] lg:right-[90px] top-[-10px] lg:top-[-20px]"></div>
      <iframe className="z-40" title="v" src={atm && atm.map} width="900" height="300" style={{border:0}} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
      </div>
      {/* Atm section close */}
    </div>
  );
};

export default Atm;
