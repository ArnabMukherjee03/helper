import React,{useEffect, useState} from 'react'
import Avatar from "../../../image/Avatar.jpg";
import {useDispatch,useSelector} from "react-redux";
import { selectStatus, selectUpdate, selectCurrentUser, updatePasswordAsync, userAsync } from '../userSlice';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { selectUser } from '../../auth/authSlice';

const Account = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isUser = useSelector(selectUser)
  const user = useSelector(selectCurrentUser);
  const updateStatus = useSelector(selectUpdate);
  const status = useSelector(selectStatus);

  useEffect(()=>{
    if(!isUser){
      navigate("/");
    }
  },[navigate,isUser])
  


  useEffect(()=>{
    dispatch(userAsync());
  },[dispatch])
  
  const[password,setPassword] = useState({
    newPassword:"",
    oldPassword:""
  })


  const[add,setAdd] = useState(false);

  const updatePassword =()=>{
     const data = {
      oldPassword: password.oldPassword,
      newPassword:password.newPassword,
     }
     dispatch(updatePasswordAsync(data));
  }

  useEffect(()=>{
    if(updateStatus){
      toast.success("Password Updated Sucessfully")
      setAdd(false);
  }
  },[updateStatus])

  

  const handlePasswordChange = (event)=>{
    const { name, value } = event.target; 
    setPassword({ ...password, [name]: value });
  }
  
  

  return (
    <div className='lg:h-[80vh] h-auto relative flex flex-col lg:gap-10 mx-10 lg:flex-row'>
       {
          add?
          <div className="fixed flex flex-col justify-center items-center gap-4 top-1/2  left-1/2 bg-white black w-[80%] lg:w-[30%] h-auto py-[40px] px-5 translate-x-[-50%] translate-y-[-50%]">
           <input type="password" name='newPassword' onChange={handlePasswordChange} placeholder='Enter Your New Password' className='text-xs outline-none font-secondary border-b-[1px] border-b-black w-[90%] ' />
           <input type="password" name='oldPassword' onChange={handlePasswordChange} placeholder='Enter Your Old Password' className='text-xs outline-none font-secondary border-b-[1px] border-b-black w-[90%] ' />
           <div className="flex justify-end w-full gap-2">
            <div className={`${status === "loading"?"bg-yellow-200 cursor-not-allowed":"cursor-pointer"} bg-yellow-400 font-secondary text-xs rounded-[4px] py-2 px-4  w-[100px] text-center`} onClick={updatePassword}>Update</div>
            <div className="font-secondary text-xs cursor-pointer rounded-[4px] py-2 px-4 border-[1px] border-yellow-400 w-[100px] text-center" onClick={e=>{setAdd(false)}}>Back</div>
           </div>
         </div>
         :
         ""
       }

        <div className="w-full lg:w-1/2">
           <img className='w-full lg:w-[80%]' src={Avatar} alt="" />
        </div>
        <div className="w-full my-[10px] lg:w-1/2 lg:my-[80px]">
           <p className='text-xl lg:text-[32px] font-primary'>Hiii <span className='text-[#289c28]'>{user && user.name}</span></p>
           <p className='text-sm font-secondary mt-1'><span className='text-[#289c28] font-primary'>Email Id ::</span> {user && user.email}</p>
           <p className='text-sm font-secondary mt-4'><span className='text-[#289c28] font-primary'>Username ::</span> {user && user.username}</p>
           <p className='text-sm font-secondary mt-4'><span className='text-[#289c28] font-primary'>Password ::</span> ***********</p>
            <div className="mt-4 cursor-pointer font-secondary text-sm rounded-[4px] py-2 px-4 bg-yellow-400 w-[180px] text-center" onClick={e=>{setAdd(true)}}>Update Password</div>
        </div>
    </div>
  )
}

export default Account
