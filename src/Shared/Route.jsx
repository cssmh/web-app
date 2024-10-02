import { createBrowserRouter } from "react-router-dom";
import MainLayout from "./MainLayout";
import Home from "../Component/Home";
import Login from "../Component/Login";
import Register from "../Component/Register";
import AllBlogs from "../Pages/AllBlogs";
import Error from "../Component/Error";
import About from "../Pages/About";
import CreateBlog from "../Pages/CreateBlog";
import PrivateRoute from "./PrivateRoute";
import MyProfile from "../Component/MyProfile";
import MyBlogs from "../Pages/MyBlogs";
import BlogDetails from "../Pages/BlogDetails";
import { getBlog } from "../Api/Blog";

const Route = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <Error />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
      { path: "/about", element: <About /> },
      { path: "/all-blogs", element: <AllBlogs /> },
      { path: "/register", element: <Register /> },
      {
        path: "/create-blog",
        element: (
          <PrivateRoute>
            <CreateBlog />
          </PrivateRoute>
        ),
      },
      {
        path: "/blog/:id",
        element: (
          <PrivateRoute>
            <BlogDetails />
          </PrivateRoute>
        ),
        loader: async ({ params }) => await getBlog(params.id),
      },
      {
        path: "/my-profile",
        element: (
          <PrivateRoute>
            <MyProfile />
          </PrivateRoute>
        ),
      },
      {
        path: "/my-blogs",
        element: (
          <PrivateRoute>
            <MyBlogs />
          </PrivateRoute>
        ),
      },
    ],
  },
]);

export default Route;
