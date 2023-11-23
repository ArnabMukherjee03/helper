import { useLocation } from "react-router-dom";
const Footer = ()=>{
   const location = useLocation();

  const isAuthPage = location.pathname === '/login' || location.pathname === '/signup'|| location.pathname === "/forgetpassword" || location.pathname.includes('/resetpassword/') || location.pathname.includes('/verify/');

  if (isAuthPage) {
    return null;
  }

    return(
       <footer className="my-8 border-y-[1px] ">
          <div className="mx-2  lg:mx-14">
             <div className="flex flex-col gap-8 lg:gap-0 lg:flex-row py-[50px] lg:py-[60px]">
                {/* Address Section :: Start */}
                 <div className="w-full lg:w-[30%] flex justify-center lg:pl-6">
                 <div className="font-secondary  text-center lg:text-left">
                    <div className="text-sm">
                        <span className="text-base lg:text-[24px] text-[#289c28] leading-[1.4]">
                        <i aria-hidden="true" className="fas rotate-90 text-orange-500 fa-phone-alt"></i>  (+91) 8543212987
                        </span>
                        <br/>
                        Bidhannagar, Durgapur - 713212
                    </div>
                 </div>
                 </div>
                 {/* Address Section :: End */}
                 {/* UseFull Link :: Start */}
                 <div className="w-[100%] gap-3 lg:gap-0 lg:w-[70%] flex flex-col lg:flex-row text-center lg:justify-evenly">
                    <div className="">
                        <p className=" mb-6 font-primary text-[#999999] text-lg tracking-wide">Useful Links</p>
                        <div className="flex flex-col gap-2 text-[14px] font-secondary">
                            <li className="">Home</li>
                            <li className="">About</li>
                            <li className="">Contact</li>
                        </div>
                    </div>
                    <div className="">
                        <div className="flex flex-col mt-12 font-secondary gap-2 text-[14px] Merriweather">
                        <li>Terms & Conditions</li>
                        <li className="">FAQ</li>
                        </div>
                    </div>
                    <div className="">
                       <p className=" mb-6 font-primary text-[#999999] text-lg tracking-wide">Follow us</p>
                        <div className="flex justify-center lg:justify-between gap-1 lg:gap-4">
                           <div className="bg-[#289c28] text-white w-10 h-10 rounded-full flex items-center justify-center text-lg cursor-pointer hover:bg-yellow-400"><i class="fab fa-facebook"></i></div>
                           <div className="bg-[#289c28] text-white w-10 h-10 rounded-full flex items-center justify-center text-lg cursor-pointer hover:bg-yellow-400"><i class="fab fa-youtube"></i></div>
                           <div className="bg-[#289c28] text-white w-10 h-10 rounded-full flex items-center justify-center text-lg cursor-pointer hover:bg-yellow-400"><i class="fab fa-twitter"></i></div>
                           <div className="bg-[#289c28] text-white w-10 h-10 rounded-full flex items-center justify-center text-lg cursor-pointer hover:bg-yellow-400"><i class="fab fa-instagram"></i></div>
                        </div>
                    </div>
                 </div>
                 {/* UseFull Link :: End */}
             </div>
          </div>
       </footer>
    )
}

export default Footer;