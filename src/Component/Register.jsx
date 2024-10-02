import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { TbFidgetSpinner } from "react-icons/tb";
import BlogHelmet from "./BlogHelmet";
import useAuth from "../hooks/useAuth";
import toast from "react-hot-toast";

const Register = () => {
  const [view, setView] = useState(true);
  const { createUser, profileUpdate, loading } = useAuth();
  const navigateTo = useNavigate();
  const location = useLocation();

  const handleRegister = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const confirmPassword = form.confirmPassword.value;

    if (password !== confirmPassword) {
      return toast.error("Passwords do not match!");
    }

    try {
      await createUser(email, password);
      await profileUpdate(name, "");
      toast.success("Registered successfully");
      navigateTo(location?.state || "/");
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="my-5 space-y-3 rounded-xl lg:w-1/2 mx-2 md:mx-auto">
      <BlogHelmet title={"Register"} />
      <h1 className="text-2xl font-semibold text-center">Register</h1>
      <form onSubmit={handleRegister} className="space-y-5">
        <div className="space-y-1 text-sm">
          <label htmlFor="Your Name" className="block dark:text-gray-600">
            Name
          </label>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            className="w-full px-4 py-3 rounded-xl border"
            style={{ outline: "none" }}
          />
        </div>
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
        <div className="space-y-1 text-sm">
          <label htmlFor="password" className="block dark:text-gray-600">
            Password
          </label>
          <input
            type={view ? "password" : "text"}
            name="password"
            required
            placeholder="Password"
            className="w-full px-4 py-3 rounded-xl border"
            style={{ outline: "none" }}
          />
        </div>
        <div className="space-y-1 text-sm relative">
          <label htmlFor="confirmPassword" className="block dark:text-gray-600">
            Confirm Password
          </label>
          <input
            type={view ? "password" : "text"}
            name="confirmPassword"
            required
            placeholder="Confirm Password"
            className="w-full px-4 py-3 rounded-xl border"
            style={{ outline: "none" }}
          />
          <span
            className="absolute top-[36px] right-3 cursor-pointer"
            onClick={() => setView(!view)}
          >
            {view ? <FaRegEyeSlash /> : <FaRegEye />}
          </span>
        </div>
        <button
          type="submit"
          className="block w-full p-3 text-center rounded-xl dark:text-gray-50 dark:bg-redBlog"
        >
          {loading ? (
            <div className="flex justify-center">
              <TbFidgetSpinner className="animate-spin text-xl my-[2px]" />
            </div>
          ) : (
            "Register"
          )}
        </button>
      </form>
      <p className="text-xs text-center sm:px-6 dark:text-gray-600">
        Already have an account?{" "}
        <Link
          state={location.state}
          to={"/login"}
          rel="noopener noreferrer"
          className="underline dark:text-redBlog"
        >
          Login
        </Link>
      </p>
    </div>
  );
};

export default Register;
