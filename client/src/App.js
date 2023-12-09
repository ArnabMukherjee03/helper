import {Routes,Route} from "react-router-dom";
import { useContext } from "react";
import { useDispatch } from "react-redux";
import { authAsync } from "./features/auth/authSlice";
import SignupPage from "./pages/SignupPage";
import HomePage from "./pages/HomePage";
import { Toaster } from 'react-hot-toast';
import LoginPage from "./pages/LoginPage";
import { useEffect } from "react";
import User from "./protected/User";
import Forgetpassword from "./features/auth/components/Forgetpassword";
import Resetpassword from "./features/auth/components/Resetpassword";
import VerifyEmail from "./features/auth/components/VerifyEmail";
import AtmPage from "./pages/AtmPage";
import ErrorPage from "./pages/ErrorPage";
import SingleAtmPage from "./pages/SingleAtmPage";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AddAtm from "./features/atm/components/AddAtm";
import { atmContext } from "./context/AtmContext";
import Account from "./features/user/components/Account";
import SearchNav from "./components/SearchNav";


function App() {
  const dispatch = useDispatch();

  const {atm} = useContext(atmContext)

  useEffect(()=>{
    dispatch(authAsync());
  },[dispatch])

  return( 
      <>
      <Toaster position="top-left"/>
      <Navbar/>
      <SearchNav/>
      {atm?<AddAtm/>:""}
       <Routes>
            <Route path="/" Component={HomePage}/>
            <Route path="/account" Component={Account}/>
            <Route path="/signup" element={<User><SignupPage/></User>}></Route>
            <Route path="/login" element={<User><LoginPage/></User>}></Route>
            <Route path="/forgetpassword" Component={Forgetpassword}/>
            <Route path="/resetpassword/:token" Component={Resetpassword}/>
            <Route path="/verify/:token" Component={VerifyEmail}/>
            <Route path="/atms" Component={AtmPage}/>
            <Route path="/atms/:id" Component={SingleAtmPage}/>
            <Route path="*" Component={ErrorPage}/>
       </Routes>
       <Footer/>
      </>
  )
}

export default App;
