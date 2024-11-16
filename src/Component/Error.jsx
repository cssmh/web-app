import BlogHelmet from "./BlogHelmet";

const Error = () => {
  return (
    <div className="grid h-screen place-content-center bg-white px-4">
      <BlogHelmet title="Error - Go back" />
      <h1 className="uppercase tracking-widest text-gray-500">
        404 | Not Found
      </h1>
    </div>
  );
};

export default Error;
