import { createContext, useState } from "react";

export const atmContext = createContext();


const AtmProvider = ({children})=>{
    const [atm, setAtm] = useState(false);
    const [popup,setPopup] = useState(false);
    const [filter, setFilter] = useState({});
    return(
        <atmContext.Provider value={{atm,setAtm,popup,setPopup,filter,setFilter}}>
            {children}
        </atmContext.Provider>
    )
}


export default AtmProvider;