import PopularBlogs from "../Pages/PopularBlogs";
import Banner from "./Banner";
import BlogHelmet from "./BlogHelmet";
import CallToAction from "./CallToAction";
import Features from "./Features";
import LatestNews from "./LatestNews";
import Testimonials from "./Testimonial";

const Home = () => {
  return (
    <div>
      <BlogHelmet title="Home" />
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
