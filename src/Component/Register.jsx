import { toast } from "sonner";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { PiSpinnerGapLight } from "react-icons/pi";
import BlogHelmet from "./BlogHelmet";
import useAuth from "../hooks/useAuth";

const Register = () => {
  const [view, setView] = useState(true);
  const [loading, setLoading] = useState(false);
  const { createUser, profileUpdate } = useAuth();
  const navigateTo = useNavigate();
  const location = useLocation();

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    const form = e.target;
    const name = form.name.value || "anonymous";
    const email = form.email.value;
    const password = form.password.value;
    const confirmPassword = form.confirmPassword.value;

    if (password !== confirmPassword) {
      return toast.info("Passwords do not match!");
    }

    try {
      await createUser(email, password);
      await profileUpdate(name, "");
      toast.success("Registered successfully");
      navigateTo(location?.state || "/");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="my-5 space-y-3 rounded-xl max-w-lg mx-2 md:mx-auto pb-6">
      <BlogHelmet title="Register" />
      <h1 className="text-2xl font-semibold text-center text-gray-800">
        Create Account
      </h1>
      <form onSubmit={handleRegister} className="space-y-5 mx-5 md:mx-0">
        <div className="space-y-1 text-sm">
          <label htmlFor="name" className="block text-gray-700">
            Full Name
          </label>
          <input
            type="text"
            name="name"
            placeholder="Your Full Name"
            className="w-full px-3 py-[10px] rounded-lg border border-gray-300 focus:ring-1 focus:ring-blue-500"
            style={{ outline: "none" }}
          />
        </div>
        <div className="space-y-1 text-sm">
          <label htmlFor="email" className="block text-gray-700">
            Email Address
          </label>
          <input
            type="email"
            name="email"
            required
            placeholder="Your Email"
            className="w-full px-3 py-[10px] rounded-lg border border-gray-300 focus:ring-1 focus:ring-blue-500"
            style={{ outline: "none" }}
          />
        </div>
        <div className="space-y-1 text-sm">
          <label htmlFor="password" className="block text-gray-700">
            Password
          </label>
          <input
            type={view ? "password" : "text"}
            name="password"
            required
            placeholder="Password"
            className="w-full px-3 py-[10px] rounded-lg border border-gray-300 focus:ring-1 focus:ring-blue-500"
            style={{ outline: "none" }}
          />
        </div>
        <div className="space-y-1 text-sm relative">
          <label htmlFor="confirmPassword" className="block text-gray-700">
            Confirm Password
          </label>
          <input
            type={view ? "password" : "text"}
            name="confirmPassword"
            required
            placeholder="Confirm Password"
            className="w-full px-3 py-[10px] rounded-lg border border-gray-300 focus:ring-1 focus:ring-blue-500"
            style={{ outline: "none" }}
          />
          <span
            className="absolute top-[34px] right-[10px] cursor-pointer"
            onClick={() => setView(!view)}
          >
            {view ? <FaRegEyeSlash /> : <FaRegEye />}
          </span>
        </div>
        <button
          type="submit"
          className="w-full p-3 text-center text-white rounded-xl bg-blue-600 hover:bg-blue-700 transition-colors duration-200"
        >
          {loading ? (
            <div className="flex justify-center">
              <PiSpinnerGapLight className="animate-spin text-xl my-[2px]" />
            </div>
          ) : (
            "Register"
          )}
        </button>
      </form>
      <p className="text-xs text-center text-gray-600">
        Already have an account?{" "}
        <Link
          state={location.state}
          to={"/login"}
          className="underline text-blue-600"
        >
          Login
        </Link>
      </p>
    </div>
  );
};

export default Register;
