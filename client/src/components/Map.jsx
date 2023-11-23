import React from 'react'
import map from "../image/map.jpg";

const Map = () => {
  return (
    <div className="mt-4 w-full pt-[20px] ">
      <div className="w-[80%] h-[100px] lg:w-[800px] mx-auto lg:h-[300px] relative ">
      <img className='w-full h-full' src={map} alt="" />
      </div>
     </div>
  )
}

export default Map
