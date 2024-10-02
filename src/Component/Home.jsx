import PopularBlogs from "../Pages/PopularBlogs";
import Banner from "./Banner";
import CallToAction from "./CallToAction";
import Features from "./Features";
import Testimonials from "./Testimonial";

const Home = () => {
  return (
    <div>
      <Banner />
      <PopularBlogs />
      <Features />
      <Testimonials />
      <CallToAction />
    </div>
  );
};

export default Home;
