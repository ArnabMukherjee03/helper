import React from 'react'
import Banner from '../components/Banner';
import Cosection from '../components/Cosection';
import Testimonial from '../components/Testimonial';
import Map from '../components/Map';
import Featured from '../components/Featured';



const HomePage = () => {
  return (
   <div className="">
     <Banner/>
     <Cosection/>
     <Map/>
     <Testimonial/>
     <Featured/>
   </div>
  )
}

export default HomePage
