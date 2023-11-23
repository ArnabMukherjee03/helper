import React, { useContext, useState } from 'react';
import StarRatings from 'react-star-ratings';
import { atmContext } from '../../../context/AtmContext';
import {useSelector,useDispatch} from "react-redux";
import { selectCurrentAtm } from '../../atm/atmSlice';
import { newReviewAsync } from '../reviewSlice';
import { selectUser } from '../../auth/authSlice';
const Rating = () => {
    const dispatch = useDispatch();

    const user = useSelector(selectUser);
    const atm = useSelector(selectCurrentAtm);
    const {setPopup} = useContext(atmContext);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');

    const addNewReview = ()=>{
      const data={
        atmId: atm._id,
        review: comment,
        rate: rating
      }
      
      dispatch(newReviewAsync(data));
      setRating(0);
      setComment('');
      setPopup(false);
    }
    
  return (
    <div className='fixed p-6 z-50 black top-[240px] left-1/2  translate-x-[-50%] bg-white w-[80%] lg:w-[40%] h-[52vh]'>
      {user?<div className=''>
        <div className="flex flex-col items-center justify-center w-full">
        <label className='font-secondary pb-3'>How would you rate your <span className='text-[#3cb878]'>experience ?</span></label>
        <StarRatings
          rating={rating}
          starRatedColor="orange"
          starHoverColor= "orange"
          changeRating={(newRating) => setRating(newRating)}
          numberOfStars={5}
          starDimension="25px"
        />
        </div>
        <div className="flex flex-col items-center justify-center w-full mt-4">
        <label className='font-secondary pb-3'>Tell us about your experience</label>
        <textarea placeholder='please say a little something about the atm' className='w-[90%] border-[1px] outline-none font-secondary text-xs h-[80px]  p-2' value={comment} onChange={(e) => setComment(e.target.value)} />
        </div>
        <div className="mt-6 flex items-center justify-center gap-2">
        <div onClick={addNewReview} className=" cursor-pointer font-secondary text-sm rounded-[4px] py-2 px-4 bg-yellow-400 w-[120px] text-center">Submit</div>
        <div className=" cursor-pointer font-secondary text-sm rounded-[4px] py-2 px-4 border-[1px] border-yellow-400 w-[120px] text-center" onClick={e=>{setPopup(false)}}>Back</div>
        </div>
        </div>
        :
        <div className='w-full h-full flex flex-col justify-center items-center font-secondary text-red-500'>
          <p>Please login to Rate</p>
          <div className="mt-2 cursor-pointer font-secondary text-sm rounded-[4px] py-2 px-4 border-[1px] border-yellow-400 w-[120px] text-center" onClick={e=>{setPopup(false)}}>Back</div>
          </div>
      }
    </div>
  )
}

export default Rating;
