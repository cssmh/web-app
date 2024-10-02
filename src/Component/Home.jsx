import PopularBlogs from "../Pages/PopularBlogs";
import Banner from "./Banner";
import BlogHelmet from "./BlogHelmet";
import StartBlogging from "./StartBlogging";
import OurFeatures from "./OurFeatures";
import LatestNews from "./LatestNews";
import Testimonials from "./Testimonial";

const Home = () => {
  return (
    <div>
      <BlogHelmet title="Home" />
      <Banner />
      <PopularBlogs />
      <LatestNews />
      <OurFeatures />
      <Testimonials />
      <StartBlogging />
    </div>
  );
};

export default Home;
