import PopularBlogs from "../Pages/PopularBlogs";
import Banner from "./Banner";
import CallToAction from "./CallToAction";
import Features from "./Features";
import LatestNews from "./LatestNews";
import Testimonials from "./Testimonial";

const Home = () => {
  return (
    <div>
      <Banner />
      <PopularBlogs />
      <LatestNews />
      <Features />
      <Testimonials />
      <CallToAction />
    </div>
  );
};

export default Home;
