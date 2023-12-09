import React from "react";
import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";


const sampleData = [
  {
    _id: "1",
    comment:
      "As a user of the ATM Status Project, I'm impressed by its real-time updates and user contributions feature. It has simplified my search for available ATMs, and the interactive map is a game-changer. Kudos to the team for creating a dynamic and user-centric solution",
    user: "Sarah Taylor",
    image:
      "https://media.istockphoto.com/id/1368424494/photo/studio-portrait-of-a-cheerful-woman.webp?b=1&s=170667a&w=0&k=20&c=VEE1756TeCzYH2uPsFZ_P8H3Di2j_jw8aOT6zd7V8JY=",
  },
  {
    _id: "2",
    comment:
      "I had the privilege of contributing to the ATM Status Project, and it's a testament to effective design and robust security. The use of JWT for logins instills confidence, and the seamless user interface makes updating ATM statuses a breeze. An innovative project that sets a new standard!",
    user: "John Doe",
    image:
      "https://wac-cdn.atlassian.com/dam/jcr:ba03a215-2f45-40f5-8540-b2015223c918/Max-R_Headshot%20(1).jpg?cdnVersion=1229",
  },
];

const Testimonial = () => {
  return (
    <div className="z-40 bg-white flex relative flex-col items-center justify-center mt-10 h-auto  lg:h-[70vh]">
      <div className="absolute bottom-8 md:bottom-1/2 left-4 uppercase font-secondary tracking-[2px] leading-[2] border-b-2 border-b-[#3cb878] prev cursor-pointer text-[8px] lg:left-8 md:text-sm">Previous</div>
      <div className="absolute bottom-8 md:bottom-1/2 right-4  uppercase font-secondary tracking-[2px] leading-[2] border-b-2 border-b-[#3cb878] next cursor-pointer text-[8px] md:text-sm">Next</div>
      <div className="">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="text-[#3cb878]  fill-current w-8 h-8 md:w-8 md:h-8"
          viewBox="0 0 24 24"
        >
          <path d="M6.5 10c-.223 0-.437.034-.65.065.069-.232.14-.468.254-.68.114-.308.292-.575.469-.844.148-.291.409-.488.601-.737.201-.242.475-.403.692-.604.213-.21.492-.315.714-.463.232-.133.434-.28.65-.35.208-.086.39-.16.539-.222.302-.125.474-.197.474-.197L9.758 4.03c0 0-.218.052-.597.144C8.97 4.222 8.737 4.278 8.472 4.345c-.271.05-.56.187-.882.312C7.272 4.799 6.904 4.895 6.562 5.123c-.344.218-.741.4-1.091.692C5.132 6.116 4.723 6.377 4.421 6.76c-.33.358-.656.734-.909 1.162C3.219 8.33 3.02 8.778 2.81 9.221c-.19.443-.343.896-.468 1.336-.237.882-.343 1.72-.384 2.437-.034.718-.014 1.315.028 1.747.015.204.043.402.063.539.017.109.025.168.025.168l.026-.006C2.535 17.474 4.338 19 6.5 19c2.485 0 4.5-2.015 4.5-4.5S8.985 10 6.5 10zM17.5 10c-.223 0-.437.034-.65.065.069-.232.14-.468.254-.68.114-.308.292-.575.469-.844.148-.291.409-.488.601-.737.201-.242.475-.403.692-.604.213-.21.492-.315.714-.463.232-.133.434-.28.65-.35.208-.086.39-.16.539-.222.302-.125.474-.197.474-.197L20.758 4.03c0 0-.218.052-.597.144-.191.048-.424.104-.689.171-.271.05-.56.187-.882.312-.317.143-.686.238-1.028.467-.344.218-.741.4-1.091.692-.339.301-.748.562-1.05.944-.33.358-.656.734-.909 1.162C14.219 8.33 14.02 8.778 13.81 9.221c-.19.443-.343.896-.468 1.336-.237.882-.343 1.72-.384 2.437-.034.718-.014 1.315.028 1.747.015.204.043.402.063.539.017.109.025.168.025.168l.026-.006C13.535 17.474 15.338 19 17.5 19c2.485 0 4.5-2.015 4.5-4.5S19.985 10 17.5 10z" />
        </svg>
      </div>
      <div className="font-primary text-[30px] lg:text-[60px] leading-[1.167em] tracking-[-0.25px]">
        <p className="text-center">Testimonials</p>
        <p className="text-xs lg:text-base  leading-[1.167em] text-center">
          <span className="text-[#3cb878]">What Our</span> Customers are saying!
        </p>
      </div>
      <div className="w-full md:w-[80%] lg:w-[70%] text-center flex items-center">
        <Swiper
          slidesPerView={1}
          modules={[Autoplay, Navigation]}
          navigation={{
            prevEl: ".prev",
            nextEl: ".next",
          }}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          loop={true}
        >
          {sampleData.map((user) => {
            return (
              <SwiperSlide key={user._id}>
                <div className="w-full relative px-8">
                  <div className="relative">
                    <div className=" text-gray-600  font-secondary px-2 py-4 text-xs md:text-base md:px-8 md:py-6 lg:px-16 lg:py-8 lg:text-lg">
                      <p className="tracking-wide  text-black">
                        {user && user.comment}
                      </p>
                      <div className="flex flex-col justify-center items-center mt-2 lg:mt-4 gap-4 ">
                        <img
                          src={user && user.image}
                          className="w-8 h-8 md:w-10 md:h-10 lg:w-14 lg:h-14 object-cover rounded-[50%]"
                          alt=""
                        />
                        <p className="text-xs md:text-sm lg:text-base">{user && user.user}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </div>
  );
};

export default Testimonial;
