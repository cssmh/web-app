import { Helmet } from "react-helmet-async";

const BlogHelmet = ({ title }) => {
  return (
    <Helmet>
      <title>BlogApp | {title} </title>
    </Helmet>
  );
};

export default BlogHelmet;
