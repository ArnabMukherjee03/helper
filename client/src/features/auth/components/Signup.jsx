import React, {  useEffect, useState } from 'react'
// import Helper from "../../../Image/Helper.png";
import {useDispatch, useSelector} from "react-redux";
import { signupAsync,redirectToLogin,selectisSuccess,selectError,clearError, Status } from '../authSlice';
import {useNavigate} from "react-router-dom";
import toast from 'react-hot-toast';
import { NavLink } from 'react-router-dom';

const Signup = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isSuccess = useSelector(selectisSuccess);
  const error = useSelector(selectError);
  const status = useSelector(Status);

  const [signupData,setSignupData] = useState({
    name:'',
    username:'',
    email: '',
    password: '',
    confirmPassword:''
  });

  const handleInputChange = (event)=>{
    const { name, value } = event.target; 
    setSignupData({ ...signupData, [name]: value });
  }

  const handleSubmit = (e)=>{
    e.preventDefault();
    dispatch(signupAsync(signupData));
  }

  

  useEffect(()=>{
    if (isSuccess) {
      dispatch(redirectToLogin());
      dispatch(clearError());
      navigate("/login");
    }
  },[isSuccess,dispatch,navigate])
  

  useEffect(()=>{
    if(error && typeof(error)==="object"){
      error.map(err=>{
         toast.error(err);
        return<></>
      })
      dispatch(clearError());
  }
  },[error,dispatch]);
  

  return (
    <div className="">
    <div className='flex flex-col h-auto lg:flex-row md:h-screen '>
      <div className="hidden md:flex h-1/2 lg:h-auto md:w-full  lg:w-[70%]  lg:flex flex-col relative items-center justify-center bgSignup">
         <h1 className='text-3xl z-10 text-white  font-primary'>Welcome to Helper Community!</h1>
         <p className='text-xl  text-white z-10  font-primary'>It All Begins with Your Will to Help</p>
      </div>
      {/* Form Section: Start */}
      <div className="w-full lg:w-1/2 flex flex-col gap-[30px] items-center justify-center py-[80px]">
       <div className="">
       <NavLink to="/">
       <div  className="my-auto mx-auto ">
          <div className="font-logo text-[30px] leading-[1]">Helper.</div>
          <div className="flex gap-1">
          <div className="font-sublogo text-[10px] leading-[1]">COMPANY</div>
          <span className="bg-black h-2 w-1"></span>
          </div>
       </div>
       </NavLink>
          <h3 className="text-base text-center mt-2 font-primary"><span className='text-[#3cb878]'>Sign up</span> for free!</h3>
        </div> 
       <form className='flex flex-col w-full items-center justify-center gap-4' onSubmit={handleSubmit}>
       <input placeholder='Enter Your name' className='font-thin placeholder:tracking-[0.5px] w-[80%] lg:w-1/2 pb-2 font-secondary  text-black text-xs outline-none border-black border-b-[1px]' type="text" name='name' id='name' onChange={handleInputChange}/>
       <input placeholder='Enter Your username' className='font-thin placeholder:tracking-[0.5px] w-[80%] lg:w-1/2 pb-2 font-secondary text-black text-xs outline-none border-black border-b-[1px]' type="text" name='username' id='username' onChange={handleInputChange}/>
       <input placeholder='Enter Your email' className='font-thin placeholder:tracking-[0.5px] w-[80%] lg:w-1/2 pb-2 font-secondary text-black text-xs outline-none border-black border-b-[1px]' type="email" name='email' id='email' onChange={handleInputChange}/>
       <input placeholder='Enter Your password' className='font-thin placeholder:tracking-[0.5px] w-[80%] lg:w-1/2 pb-2 font-secondary text-black text-xs outline-none border-black border-b-[1px]' type="password" name='password' id='password' onChange={handleInputChange}/>
       <input placeholder='Please rewrite your password' className='font-thin placeholder:tracking-[0.5px] w-[80%] lg:w-1/2 pb-2 font-secondary text-black text-xs outline-none border-black border-b-[1px]' type="password" name='confirmPassword' id='confirmpassword' onChange={handleInputChange}/>
       <button type="submit" className={`w-[80%] lg:w-1/2 py-3 mt-4 bg-yellow-400 font-secondary ${status==="loading"?"bg-yellow-200 cursor-not-allowed":""}`}>Sign UP</button>
       <p className='text-center  font-secondary tracking-wide text-sm'><NavLink to="/login">Already have an account?</NavLink></p>
       </form>
       </div>
       </div>
    </div>
  )
}

export default Signup
