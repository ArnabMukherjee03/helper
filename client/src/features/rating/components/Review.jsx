import React, { useEffect, useState } from 'react';
import {useSelector,useDispatch} from "react-redux";
import { deleteReviewAsync, getReviewAsync, selectReviews } from '../reviewSlice';
import Star from '../../Star/Star';
import { selectUser } from '../../auth/authSlice';
import io from "socket.io-client";
import { useParams } from 'react-router-dom';

const Review = () => {
    const socket = io.connect('https://helperapi-chi.vercel.app');
    const dispatch = useDispatch();
    const review = useSelector(selectReviews);
    const user = useSelector(selectUser);
    const {id} = useParams();
    const[reviews,setReviews] = useState([]);
    

    useEffect(()=>{
      setReviews(review);
    },[review])
    
    useEffect(()=>{
        dispatch(getReviewAsync(id))
    },[dispatch,id])

    const deleteComment = (id)=>{
        dispatch(deleteReviewAsync(id));
    }

    useEffect(()=>{
      socket.on("new-review", ({savedReview}) => {
         setReviews((reviews)=>[...reviews,savedReview]);
      });
      
      return () => {
        socket.off("new-review");
      };
    },[socket]);


    useEffect(()=>{
      socket.on("delete-review", ({deleteReview}) => {
        const index = reviews.findIndex(
          (item) => item._id === deleteReview._id
        );
        if (index !== -1) {
          const updatedReview = [...reviews];
          updatedReview.splice(index,1)
          setReviews(updatedReview);
        }
      });
      
      return () => {
        socket.off("delete-review");
      };
    },[socket,reviews]);
  
  

  return (
    <div className="flex flex-col mt-4 p-10 ">
      <h1 className="text-2xl font-primary mb-4">Atm <span className='text-[#3cb878]'>Reviews</span></h1>
      <div className="flex flex-wrap gap-4 lg:gap-6 w-full mx-auto">
      {reviews.map((review) => (
        <div className="relative border-[1px]  mb-2 w-full lg:w-[31%]">
        <div className="p-4 flex items-center">
        <div className="flex-shrink-0">
              <img
                className="h-10 w-10 rounded-full object-cover"
                src="https://cdn-icons-png.flaticon.com/512/219/219970.png"
                alt=""
              />
          </div>
          <div className=" mb-4">
            <div className="ml-3">
              <p className="text-sm font-primary text-gray-900">{review && review.userId && review.userId.name}</p>
              <div className="flex items-center gap-2">
                {/* You can customize the star icon based on the rating */}
                 <Star rate={review && review.rate}/>
                <p className="bg-green-400 font-secondary rounded-sm text-white text-xs py-1 px-2 mt-1">{review.rate}/5</p>
              </div>

            </div>
            <p className="ml-3 mt-2 text-sm text-gray-700 font-secondary">{review && review.review}</p>
            {user === review.userId._id?<div onClick={e=>{deleteComment(review._id)}} className="cursor-pointer absolute right-2 font-secondary text-red-500 text-xs">Delete</div>:""}
          </div> 
        </div>
      </div>
      ))}
      </div>
    </div>
  )
}

export default Review
