import React from "react";
import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";


const sampleData = [
  {
    _id: "1",
    comment:
      "Absolutely love Voice! It&apos;s my go-to source for insightful content. The diverse topics keep me engaged, and the writing style is captivating. Highly recommended for anyone seeking enriching reads!",
    user: "Sarah Taylor",
    image:
      "https://media.istockphoto.com/id/1368424494/photo/studio-portrait-of-a-cheerful-woman.webp?b=1&s=170667a&w=0&k=20&c=VEE1756TeCzYH2uPsFZ_P8H3Di2j_jw8aOT6zd7V8JY=",
  },
  {
    _id: "2",
    comment:
      "Absolutely love Voice! It&apos;s my go-to source for insightful content. The diverse topics keep me engaged, and the writing style is captivating. Highly recommended for anyone seeking enriching reads!",
    user: "Virat Kohli",
    image:
      "data:image/jpeg;base64,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",
  },
  {
    _id: "3",
    comment:
      "Absolutely love Voice! It&apos;s my go-to source for insightful content. The diverse topics keep me engaged, and the writing style is captivating. Highly recommended for anyone seeking enriching reads!",
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
