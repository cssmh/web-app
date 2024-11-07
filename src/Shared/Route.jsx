import { createBrowserRouter } from "react-router-dom";
import MainLayout from "./MainLayout";
import Home from "../Component/Home";
import Login from "../Component/Login";
import Register from "../Component/Register";
import Error from "../Component/Error";
import WriteBlog from "../Pages/WriteBlog";
import PrivateRoute from "./PrivateRoute";
import MyProfile from "../Component/MyProfile";
import MyBlogs from "../Pages/MyBlogs";
import BlogDetails from "../Pages/BlogDetails";
import { getBlog } from "../Api/Blog";
import EditBlog from "../Pages/EditBlog";

const Route = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <Error />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
      {
        path: "/write-blog",
        element: (
          <PrivateRoute>
            <WriteBlog />
          </PrivateRoute>
        ),
      },
      {
        path: "/blog/:id",
        element: <BlogDetails />,
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
      {
        path: "/edit-blog/:id",
        element: (
          <PrivateRoute>
            <EditBlog />
          </PrivateRoute>
        ),
        loader: async ({ params }) => await getBlog(params.id),
      },
    ],
  },
]);

export default Route;
