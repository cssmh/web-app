import { Helmet } from "react-helmet-async";

const BlogHelmet = ({ title }) => {
  return (
    <Helmet>
      <title>Blog App | {title} </title>
    </Helmet>
  );
};

export default BlogHelmet;
