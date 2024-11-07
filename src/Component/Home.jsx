import { useState } from "react";
import HomeBlogs from "../Pages/HomeBlogs";
import BlogHelmet from "./BlogHelmet";
import StartBlogging from "./StartBlogging";
import LatestNews from "./LatestNews";
import SearchBlog from "./SearchBlog";

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <>
      <div className="max-w-[1200px] mx-auto">
        <BlogHelmet title="Home" />
        <SearchBlog onSearch={handleSearch} />
        <HomeBlogs searchTerm={searchQuery} />
        <LatestNews />
      </div>
      <StartBlogging />
    </>
  );
};

export default Home;
