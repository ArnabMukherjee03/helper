import React, { useEffect, useState } from 'react'
// import Helper from "../../../Image/Helper.png";
import {  useParams } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
import {selectSucess,selectSucessmsg,redirectToLogin,selectError, clearError, resetPassresAsync, selectStatus } from '../resetSlice';
import { useNavigate,NavLink } from 'react-router-dom';
import toast from 'react-hot-toast';


const Resetpassword = () => {
  const {token} = useParams();
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
  const [password,setPassword] = useState('');
  const [confirmPassword,setconfirmPassword] = useState('');

  const handleSubmit = (e)=>{
    e.preventDefault();
    const data = {
      token: token,
      password: password,
      confirmPassword: confirmPassword
    }

    console.log(data)
    dispatch(resetPassresAsync(data));
  }



  return (
    <div className="h-screen flex w-full justify-center items-center">
        
         <div className="w-1/2 flex flex-col gap-[30px] items-center py-[80px]">
       <div className="">
       <NavLink to="/">
       <div  className="my-auto mx-auto w-1/2">
          <div className="font-logo text-[30px] leading-[1]">Helper.</div>
          <div className="flex gap-1">
          <div className="font-sublogo text-[10px] leading-[1]">COMPANY</div>
          <span className="bg-black h-2 w-1"></span>
          </div>
       </div>
       </NavLink>
          <p className="text-base mt-4 text-center  font-primary">Enter your <span className='text-[#289c28]'>New Password</span></p>
        </div> 
       <form className='flex flex-col w-full items-center justify-center gap-4' >
       <input placeholder='Enter Your password' className='font-thin placeholder:tracking-[0.5px] w-1/2 pb-2 font-secondary text-black text-xs outline-none border-black border-b-[1px]' type="password" name='password' id='password' onChange={e=>setPassword(e.target.value)}/>
       <input placeholder='Please rewrite your password' className='font-thin placeholder:tracking-[0.5px] w-1/2 pb-2 font-secondary text-black text-xs outline-none border-black border-b-[1px]' type="password" name='confirmPassword' id='confirmpassword' onChange={e=>setconfirmPassword(e.target.value)}/>
       <button type="submit" className={`w-1/2 py-3  bg-yellow-400  font-secondary ${status==="loading"?"bg-yellow-200 cursor-not-allowed":""}`} onClick={handleSubmit}>Continue</button>
       </form>
       </div>
         
    </div>
  )
}

export default Resetpassword;
