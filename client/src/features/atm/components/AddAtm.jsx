import React,{useContext, useState} from 'react';
import { atmContext } from '../../../context/AtmContext';
import {useDispatch } from "react-redux";
import { addAtmAsync } from '../atmSlice';
const AddAtm = () => {
  const dispatch = useDispatch();
  const {setAtm} = useContext(atmContext);
  const [data,setData] = useState({
    name: "",
    address: "",
    city: "",
    bankname: "SBI",
    helplineNo: 0,    
});

const handleInputChange = (event)=>{
  const { name, value } = event.target; 
  setData({ ...data, [name]: value });
}

  const handleClick = ()=>{
    dispatch(addAtmAsync(data));
    setAtm(false);
  }

  return (
    <div className='bg-white fixed h-[80vh] w-[90%] lg:w-[60%] top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] black z-50 px-10'>
        <div className="h-[24%] lg:h-[40%] flex flex-col items-center justify-center">
            <p className='font-primary text-lg lg:text-[30px] leading-[1]'>Contribute and <span className='text-[#289c28]'>Collaborate</span></p>
            <p className='text-[8px] text-center lg:text-xs font-secondary mt-1'>Join hands with fellow users to ensure accurate and up-to-date ATM information.</p>
        </div>
       <div className="flex flex-col lg:flex-row justify-center items-center gap-2 lg:gap-10">
       <div className="w-full lg:w-1/2">
        <img className='w-full' src="https://images.unsplash.com/photo-1592509083886-55ee55e6afcc?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
       </div>
       <div className="w-full lg:w-1/2 flex gap-4 flex-col">
          <input onChange={handleInputChange} name='name' type="text" placeholder='Enter Atm Title' className='font-thin placeholder:tracking-[0.5px] w-full pb-2 font-secondary text-black text-xs outline-none border-black border-b-[1px]' />
          <input onChange={handleInputChange} name='address' type="text" placeholder='Enter Address' className='font-thin placeholder:tracking-[0.5px] w-full pb-2 font-secondary text-black text-xs outline-none border-black border-b-[1px]' />
          <input onChange={handleInputChange} name='helplineNo' type="text" placeholder='Enter Helpline No' className='font-thin placeholder:tracking-[0.5px] w-full pb-2 font-secondary text-black text-xs outline-none border-black border-b-[1px]' />
          <div className="flex gap-4">
            <select onChange={handleInputChange} name='bankname' className='w-1/2 text-xs font-secondary border-[1px] outline-none border-black py-2'  id="">
                <option value="SBI">SBI</option>
                <option value="PNB">PNB</option>
            </select>
            <input onChange={handleInputChange} name='city' type="text" placeholder='Enter City' className='font-thin placeholder:tracking-[0.5px] w-1/2 pb-2 font-secondary text-black text-xs outline-none border-black border-b-[1px]' />
          </div>
          <div className="flex gap-4">
          <div className="mt-1 cursor-pointer font-secondary text-sm rounded-[4px] py-2 px-4 bg-yellow-400 w-[120px] text-center" onClick={handleClick}>Save</div>
          <div className="mt-1 cursor-pointer font-secondary text-sm rounded-[4px] py-2 px-4 border-[1px] border-yellow-400 w-[120px] text-center" onClick={e=>{setAtm(false)}}>Back</div>
          </div>
       </div>
       </div>
    </div>
  )
}

export default AddAtm
