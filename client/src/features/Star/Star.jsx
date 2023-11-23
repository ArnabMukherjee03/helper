import React from "react";


const Star = ({rate}) =>{
    const ratingStar = Array.from({length:5},(elem,index)=>{
        let number = index + 0.5;
        return(
            <span key={index}>
                {
                    rate >= index+1 ?
                    (<i className="fa-solid fa-star" style={{paddingLeft: "4px"}}></i>)
                    : rate >= number ?
                    (<i className="fa-regular fa-star-half-stroke" style={{paddingLeft: "4px"}}></i>)
                    : (<i className="fa-regular fa-star" style={{paddingLeft: "4px"}}></i>)
                }
            </span>
        );
    });
    return(
        <>
            <div className="text-auto text-yellow-400">
                {ratingStar}
            </div>
        </>
    )
}

export default Star;