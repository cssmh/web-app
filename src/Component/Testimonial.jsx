import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";

const Testimonials = () => {
  const testimonialsData = [
    {
      quote:
        "This platform has transformed the way I share my thoughts with the world. The community is amazing!",
      name: "Mobarok Hossain",
      role: "Blogger",
      image:
        "https://lh3.googleusercontent.com/a/ACg8ocLoLEY-xqWOBY3CVJQ39IxgeH5Pmj1EqnbRJF1ynWiV6_iwx3uvDA=s288-c-no",
    },
    {
      quote:
        "I’ve never felt so connected with fellow bloggers before. The tools provided are excellent!",
      name: "Dia Mirza",
      role: "Content Creator",
      image:
        "https://pbs.twimg.com/profile_images/1615269128209850368/DhVzB23W_400x400.jpg",
    },
    {
      quote:
        "The resources available here have helped me grow my audience significantly. Highly recommend!",
      name: "Md. Momin Hossain",
      role: "Digital Marketer",
      image:
        "https://lh3.googleusercontent.com/a/ACg8ocKK0Zmiiw579ElRkNruYKcz5zPBQltI5ZNFwLgQv5x1142MveY=s288-c-no",
    },
    {
      quote:
        "A fantastic place to learn and collaborate with like-minded individuals. I love it!",
      name: "Prachi Desai",
      role: "Tech Enthusiast",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQt5ovrUWNzHkSdlwTPSaZhXOXqkgm-r9touloPLkoaL-STQtDCyOY-dUHjgA_vStY5dp0&usqp=CAU",
    },
    {
      quote:
        "I saw all the blog and i love it. Very informative and impressive design. Keep it up.",
      name: "Momen Hossain",
      role: "Web Developer",
      image:
        "https://lh3.googleusercontent.com/a/ACg8ocLgiTzZ_IELKZwCFgaVWiPHeuMETB3HchHAGtYVXYO8SeGtd3z4=s96-c",
    },
  ];

  return (
    <div className="bg-gray-50 py-10">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-xl md:text-3xl font-semibold md:mb-12">What Our Users Say</h2>
        <Swiper
          speed={200}
          grabCursor={true}
          autoplay={{
            delay: 1200,
            disableOnInteraction: false,
          }}
          modules={[Pagination, Autoplay]}
          className="mySwiper"
          slidesPerView={1}
          spaceBetween={20}
          breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 30,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 40,
            },
          }}
        >
          {testimonialsData.map((testimonial, index) => (
            <SwiperSlide key={index}>
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <p className="text-gray-600 mb-4">{testimonial.quote}</p>
                <div className="flex items-center justify-center">
                  <img
                    src={testimonial.image}
                    alt="user"
                    className="w-10 rounded-full mr-2"
                  />
                  <div>
                    <h4 className="text-base font-semibold">
                      {testimonial.name}
                    </h4>
                    <div className="text-sm font-medium text-stone-500 hover:text-redBlog">
                      {testimonial.role}
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Testimonials;
