import { Helmet } from "react-helmet-async";

const BlogHelmet = ({ title }) => {
  return (
    <Helmet>
      <title>{title} | Blog</title>
    </Helmet>
  );
};

export default BlogHelmet;
