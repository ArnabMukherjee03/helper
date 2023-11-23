import React, { useContext } from 'react'
import Atm from '../features/atm/components/Atm';
import Rating from '../features/rating/components/Rating';
import { atmContext } from '../context/AtmContext';
import Review from '../features/rating/components/Review';

const SingleAtmPage = () => {
  const {popup} = useContext(atmContext);
  return (
   <div className='relative'>
     {popup?<Rating/>:""}
     <Atm/>
     <Review/>
   </div>
  )
}

export default SingleAtmPage
