import { createContext, useState } from "react";

export const atmContext = createContext();


const AtmProvider = ({children})=>{
    const [atm, setAtm] = useState(false);
    const [popup,setPopup] = useState(false);
    return(
        <atmContext.Provider value={{atm,setAtm,popup,setPopup}}>
            {children}
        </atmContext.Provider>
    )
}


export default AtmProvider;