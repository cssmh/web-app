import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { TbFidgetSpinner } from "react-icons/tb";
import BlogHelmet from "./BlogHelmet";
import useAuth from "../hooks/useAuth";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";

const Login = () => {
  const [view, setView] = useState(true);
  const { login, loading, googleLogin } = useAuth();
  const navigateTo = useNavigate();
  const location = useLocation();

  const handleLogin = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      await login(email, password);
      toast.success("Logged in successfully");
      navigateTo(location?.state || "/");
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await googleLogin();
      toast.success("User logged in successfully");
      navigateTo(location?.state || "/");
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="my-8 space-y-3 rounded-xl lg:w-1/2 mx-2 md:mx-auto">
      <BlogHelmet title="Login" />
      <h1 className="text-2xl font-semibold text-center">Login</h1>
      <form onSubmit={handleLogin} className="space-y-5 mx-5 md:mx-0">
        <div className="space-y-1 text-sm">
          <label htmlFor="email" className="block dark:text-gray-600">
            Your Email
          </label>
          <input
            type="email"
            name="email"
            required
            placeholder="Your Email"
            className="w-full px-4 py-3 rounded-xl border"
            style={{ outline: "none" }}
          />
        </div>
        <div className="space-y-1 text-sm relative">
          <label htmlFor="password" className="block dark:text-gray-600">
            Password
          </label>
          <input
            type={view ? "password" : "text"}
            name="password"
            placeholder="Password"
            required
            className="w-full px-4 py-3 rounded-xl border"
            style={{ outline: "none" }}
          />
          <span
            className="absolute top-[36px] right-3 cursor-pointer"
            onClick={() => setView(!view)}
          >
            {view ? <FaRegEyeSlash /> : <FaRegEye />}
          </span>
          <div className="flex justify-end text-xs dark:text-gray-600">
            <a rel="noopener noreferrer" href="#">
              Forgot Password?
            </a>
          </div>
        </div>
        <button
          type="submit"
          className="block w-full p-3 text-center text-white rounded-xl bg-redBlog"
        >
          {loading ? (
            <div className="flex justify-center">
              <TbFidgetSpinner className="animate-spin text-xl my-[2px]" />
            </div>
          ) : (
            "Login"
          )}
        </button>
      </form>
      <p className="px-3 text-sm text-center text-gray-600">
        Login with social accounts
      </p>
      <button
        onClick={handleGoogleLogin}
        aria-label="Log in with Google"
        className="flex items-center gap-2 bg-emerald-100 text-black px-4 py-2 rounded-lg mx-auto mt-4"
      >
        <FcGoogle className="text-2xl" />
        <span>Continue with Google</span>
      </button>
      <p className="text-xs text-center sm:px-6 text-gray-600">
        Do not have an account?{" "}
        <Link
          state={location.state}
          to={"/register"}
          rel="noopener noreferrer"
          className="underline text-red-600"
        >
          Register
        </Link>
      </p>
    </div>
  );
};

export default Login;
