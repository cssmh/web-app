import HomeBlogs from "../Pages/HomeBlogs";
import Banner from "./Banner";
import CallToAction from "./CallToAction";
import Features from "./Features";
import Testimonials from "./Testimonial";

const Home = () => {
  return (
    <div>
      <Banner />
      <HomeBlogs />
      <Features />
      <Testimonials />
      <CallToAction />
    </div>
  );
};

export default Home;
