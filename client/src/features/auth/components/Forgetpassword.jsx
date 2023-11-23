import React, { useEffect, useState } from 'react'
// import Helper from "../../../Image/Helper.png";
import { NavLink } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
import { resetPassreqAsync,selectSucess,selectSucessmsg,redirectToLogin,selectError, clearError, selectStatus } from '../resetSlice';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';


const Forgetpassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const success = useSelector(selectSucess);
  const successMsg = useSelector(selectSucessmsg);
  const error = useSelector(selectError);
  const status = useSelector(selectStatus);

  useEffect(()=>{
    if(success){
      toast.success(successMsg.message);
      dispatch(redirectToLogin());
      navigate('/login');
  }
  },[success,dispatch,navigate,successMsg])
  
  useEffect(()=>{
    if(error){
      toast.error(error);
      dispatch(clearError())
    }
  },[error,dispatch])



  // EMail 
  const [email,setEmail] = useState('');

  const handleSubmit = (e)=>{
    e.preventDefault();
    dispatch(resetPassreqAsync(email));
  }



  return (
    <div className="h-screen w-full justify-center items-center flex">
      <div className="w-1/2 flex flex-col gap-[30px] items-center py-[80px]">
       <div className="w-1/2">
       <NavLink to="/">
       <div  className="my-auto mx-auto w-[30%]">
          <div className="font-logo text-[30px] leading-[1]">Helper.</div>
          <div className="flex gap-1">
          <div className="font-sublogo text-[10px] leading-[1]">COMPANY</div>
          <span className="bg-black h-2 w-1"></span>
          </div>
       </div>
       </NavLink>
          <p className="text-base mx-auto leading-[1] text-center mt-4 font-primary w-[70%]"><span className='text-[#289c28]'>Enter the email address</span> associated with your account</p>
        </div> 
       <form className='flex flex-col w-full items-center justify-center gap-4' >
       <input placeholder='Enter Your email' className='font-thin placeholder:tracking-[0.5px] w-1/2 pb-2 font-secondary text-black text-xs outline-none border-black border-b-[1px]' type="email" name='email' id='email' onChange={e=>{setEmail(e.target.value)}} />
       <button type="submit" className={` w-1/2 py-3  bg-yellow-400 font-secondary ${status==="loading"?"bg-yellow-200 cursor-not-allowed":""}`} onClick={handleSubmit}>Continue</button>
       <p className='text-center mt-8 font-secondary tracking-wide text-sm'><NavLink to="/signup">Don't Have an Accout? Signup</NavLink></p>
       </form>
       </div>
    </div>
  )
}

export default Forgetpassword;
