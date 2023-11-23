import React, {  useEffect, useState } from 'react'
// import Helper from "../../../Image/Helper.png";
import {useDispatch, useSelector} from "react-redux";
import { loginAsync,redirectToLogin,selectisSuccess,selectError, clearError, Status} from '../authSlice';
import {useNavigate} from "react-router-dom";
import { NavLink } from 'react-router-dom';
import toast from 'react-hot-toast';

const Login = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isSuccess = useSelector(selectisSuccess);
  const error = useSelector(selectError);
  const status = useSelector(Status);

  

  const [signupData,setSignupData] = useState({
    email: '',
    password: ''
  });

  const handleInputChange = (event)=>{
    const { name, value } = event.target; 
    setSignupData({ ...signupData, [name]: value });
  }

  const handleSubmit = (e)=>{
    e.preventDefault();
    dispatch(loginAsync(signupData));
  }

  useEffect(()=>{
    if (isSuccess) {
      dispatch(redirectToLogin());
      navigate("/");
    }
  },[dispatch,isSuccess,navigate])

  
  useEffect(()=>{
    if(error && error !== "Unauthorized"){
         toast.error(error);
         dispatch(clearError())
    }
   
  },[error,dispatch])
  

  return (
    <div className="">
    <div className='flex lg:flex-row-reverse md:flex-col h-screen '>
      <div className="hidden lg:w-[70%] md:h-1/2 lg:h-auto md:w-full md:flex  lg:flex flex-col relative items-center justify-center bgSignup">
         <h1 className='text-3xl z-10 text-white font-primary'>Welcome Back Dear!</h1>
         <p className='text-xl  text-white z-10  font-primary'>Making a Difference: Your Journey Begins Now</p>
      </div>
      {/* Form Section: Start */}
      <div className="lg:w-1/2 w-full flex flex-col gap-[30px] items-center justify-center py-[80px]">
       <div className="">
        {/* Logo:: Start */}
       <NavLink to="/">
       <div  className="my-auto mx-auto w-1/2">
          <div className="font-logo text-[30px] leading-[1]">Helper.</div>
          <div className="flex gap-1">
          <div className="font-sublogo text-[10px] leading-[1]">COMPANY</div>
          <span className="bg-black h-2 w-1"></span>
          </div>
       </div>
       </NavLink>
       {/* Logo:: End */}
        <h3 className="text-base mt-2 text-center  font-primary"><span className='text-[#3cb878]'>Log in</span> to your Account!</h3>
        </div> 
       <form className='flex flex-col w-full items-center justify-center gap-4' onSubmit={handleSubmit}>
       <input placeholder='Enter Your email' className='font-thin placeholder:tracking-[0.5px] w-[80%] lg:w-1/2 pb-2 font-secondary text-black text-xs outline-none border-black border-b-[1px]' type="email" name='email' id='email' onChange={handleInputChange}/>
       <input placeholder='Enter Your password' className='font-thin placeholder:tracking-[0.5px] w-[80%] lg:w-1/2 pb-2 font-secondary text-black text-xs outline-none border-black border-b-[1px]' type="password" name='password' id='password' onChange={handleInputChange}/>
       <div className="w-full flex gap-2 items-center justify-center flex-col">
       <p className='text-right w-1/2 font-secondary text-xs text-red-500 cursor-pointer'><NavLink to="/forgetpassword">Forget Password?</NavLink></p>
       <button type="submit" className={`w-[80%] lg:w-1/2 py-3 mt-4 bg-yellow-400  font-secondary ${status==="loading"?"bg-gray-200 cursor-not-allowed":""}`}>Login</button>
       </div>
       <p className='text-center  font-secondary tracking-wide text-sm'><NavLink to="/signup">Don't Have an Account?</NavLink></p>
       </form>
       </div>
       </div>
    </div>
  )
}

export default Login;
