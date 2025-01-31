import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import BlogHelmet from "./BlogHelmet";
import useAuth from "../hooks/useAuth";
import { toast } from "sonner";
import { FcGoogle } from "react-icons/fc";
import { PiSpinnerGapLight } from "react-icons/pi";

const Login = () => {
  const [view, setView] = useState(true);
  const [loading, setLoading] = useState(false);
  const { login, googleLogin } = useAuth();
  const navigateTo = useNavigate();
  const location = useLocation();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      await login(email, password);
      toast.success("Logged in successfully");
      navigateTo(location?.state || "/");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
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
    <div className="flex items-center justify-center py-4 md:py-8 bg-[#111111]">
      <BlogHelmet title="Login" />
      <div className="w-full sm:w-96 bg-[#18181b] p-8 rounded-lg space-y-6">
        <h1 className="text-2xl font-semibold text-center text-white">Login</h1>
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-2">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-400"
            >
              Your Email
            </label>
            <input
              type="email"
              name="email"
              required
              placeholder="Your Email"
              className="w-full px-3 py-2 rounded-lg border border-gray-600 bg-gray-700 text-white focus:ring-1 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <div className="space-y-2 relative">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-400"
            >
              Password
            </label>
            <input
              type={view ? "password" : "text"}
              name="password"
              placeholder="Password"
              required
              className="w-full px-3 py-2 rounded-lg border border-gray-600 bg-gray-700 text-white focus:ring-1 focus:ring-blue-500 focus:outline-none"
            />
            <span
              className="absolute top-10 transform -translate-y-1/2 right-2 cursor-pointer"
              onClick={() => setView(!view)}
            >
              {view ? (
                <FaRegEyeSlash className="text-gray-400" />
              ) : (
                <FaRegEye className="text-gray-400" />
              )}
            </span>
            <div className="flex justify-end text-xs text-blue-500">
              <a href="#">Forgot Password?</a>
            </div>
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-[#3f3f46] text-white rounded-xl transition duration-200"
          >
            {loading ? (
              <div className="flex justify-center">
                <PiSpinnerGapLight className="animate-spin text-xl my-[2px]" />
              </div>
            ) : (
              "Login"
            )}
          </button>
        </form>
        <div className="text-center text-sm text-gray-400">
          <p>Or login with</p>
          <button
            onClick={handleGoogleLogin}
            aria-label="Log in with Google"
            className="flex items-center justify-center gap-2 bg-[#3f3f46] text-white px-4 py-2 rounded-lg mx-auto mt-4 transition duration-200"
          >
            <FcGoogle className="text-2xl" />
            <span>Continue with Google</span>
          </button>
        </div>
        <div className="text-center text-xs text-gray-400">
          <p>
            Don’t have an account?{" "}
            <Link
              state={location.state}
              to={"/register"}
              className="underline text-blue-500 hover:text-blue-600"
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
