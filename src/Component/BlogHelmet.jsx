import { Helmet } from "react-helmet-async";

const BlogHelmet = ({ title }) => {
  return (
    <Helmet>
      <title>{title} | BlogApp </title>
    </Helmet>
  );
};

export default BlogHelmet;
