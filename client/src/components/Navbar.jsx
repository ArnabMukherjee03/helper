import React, { useEffect } from "react";
import { logOutAsync, selectUser } from "../features/auth/authSlice";
import { useSelector, useDispatch } from "react-redux";
import { NavLink,useLocation} from "react-router-dom";
import { userAsync } from "../features/user/userSlice";


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

const Navbar = () => {
  
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
 
  useEffect(()=>{
    dispatch(userAsync())
  },[dispatch]);


  const logout = () => {
    dispatch(logOutAsync());
  };

  const location = useLocation();

  const isAuthPage = location.pathname === '/login' || location.pathname === '/signup' || location.pathname === "/forgetpassword" || location.pathname.includes('/resetpassword/') || location.pathname.includes('/verify/');

  if (isAuthPage) {
    return null;
  }


  return (
    <nav className="w-full px-[20px] lg:px-[40px]">
      <div className="flex h-[60px] mt-2 justify-between">
        <NavLink to="/" className="my-auto">
          <div className="font-logo text-[20px] lg:text-[30px] leading-[1]">Helper.</div>
          <div className="flex gap-1">
          <div className="font-sublogo text-[10px] leading-[1]">COMPANY</div>
          <span className="bg-black h-2 w-1"></span>
          </div>
        </NavLink>
        <div className="flex w-[70%] gap-4 items-center justify-end text-xs font-heading">
          <div className="w-[50%] flex items-center gap-4">
            {/* City */}
            <div className="hidden lg:block w-[30%] relative items-center border-[1.3px] border-[#3cb878] px-4 py-2 rounded-lg">
              <div className="absolute w-[14%] left-[6px]  top-[50%] translate-y-[-50%]">
              <i className="fa-solid fa-location-dot"></i>
              </div>
              <select
                className="w-full font-secondary cursor-pointer pl-2 outline-none font-heading text-xs text-[#757575]"
                name="city"
                id=""
              >
                {city.map((city) => {
                  return <option value={city.value}>{city.name}</option>;
                })}
              </select>
            </div>
            {/* Location */}
            <div className="hidden lg:flex items-center border-[#3cb878] w-[70%] border-[1.3px] px-4 py-2 gap-2 rounded-lg">
              <div className="w-5 h-5">
              <i className="fa-solid fa-magnifying-glass"></i>
              </div>
              <input
                type="text"
                placeholder="Search your Nearest Atms"
                className="w-[80%] outline-none font-secondary text-xs"
              />
            </div>
          </div>
          {user ? (
            <>
              <NavLink to="/account" className="cursor-pointer font-secondary text-[10px] lg:text-xs rounded-[4px] py-3 px-4 bg-yellow-400 lg:w-[120px] text-center">Account</NavLink>
              <div className="cursor-pointer font-secondary text-[10px] lg:text-xs rounded-[4px] py-3 px-4 border-[1px] border-yellow-400 w-auto  lg:w-[120px] text-center" onClick={logout}>
                Logout
              </div>
            </>
          ) : (
            <NavLink to="/login" className="cursor-pointer font-secondary text-[10px] lg:text-xs rounded-[4px] py-3 px-4 bg-yellow-400 w-auto lg:w-[120px] text-center">
              Log in/Sign up
            </NavLink>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
