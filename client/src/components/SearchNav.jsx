import React, { useContext } from 'react'
import Search from '../features/search/Search';
import { atmContext } from '../context/AtmContext';
import { useLocation } from 'react-router-dom';

const SearchNav = () => {
    const city = [
        {
          name: "Durgapur",
          value: "Durgapur",
        },
        {
          name: "Kolkata",
          value: "Kolkata",
        },
        {
          name: "Delhi",
          value: "Delhi",
        },
      ];
      
    const {filter, setFilter} = useContext(atmContext);
    const handleFilter = (e, section, option) => {
        const newFilter = {};
        if (e.target.value) {
          if (newFilter[section]) {
            newFilter[section].push(option);
          } else {
            newFilter[section] = [option];
          }
        } else {
          const index = newFilter[section].findIndex((el) => el === option);
          newFilter[section].splice(index, 1);
        }
        setFilter({...filter,...newFilter})
      };

      const location = useLocation();

      const isAuthPage = location.pathname === '/login' || location.pathname === '/signup' || location.pathname === "/forgetpassword" || location.pathname.includes('/resetpassword/') || location.pathname.includes('/verify/');
    
      if (isAuthPage) {
        return null;
      }
    
    

  return (
    <div className="lg:hidden w-full px-[20px] flex items-center gap-2">
            {/* City */}
            <div className=" w-[30%] relative items-center border-[1.3px] border-[#000] px-1 py-1 ">
              <div className="absolute left-[6px]  top-[50%] text-xs translate-y-[-50%]">
              <i className="fa-solid fa-location-dot"></i>
              </div>
              <select
                className=" font-secondary cursor-pointer pl-3 outline-none font-heading text-xs text-[#757575]"
                name="city"
                id=""
                onChange={(e) => handleFilter(e, "city", e.target.value)}
              >
                
                {city.map((city) => {
                  return <option className='p-4' value={city.value}>{city.name}</option>;
                })}
              </select>
            </div>
            {/* Location */}
            <div className=" flex items-center  border-[#000] w-[70%] border-[1.3px] px-1 py-1 gap-2 ">
              <div className="">
              <i className="fa-solid fa-magnifying-glass text-xs"></i>
              </div>
              <Search/>
            </div>
          </div>
  )
}

export default SearchNav
