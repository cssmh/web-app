import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../Component/Navbar";
import Footer from "../Component/Footer";
import Spinner from "../Component/Spinner/Spinner";

const MainLayout = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) return <Spinner size="100" />;

  return (
    <div>
      {/* <div className="bg-gray-800 py-[1px]">
        <p className="text-[12px] text-white px-3 md:px-12 py-[1px]">
          Have a story to share? Contact us at +8801767616067 or start writing a
          blog!
        </p>
      </div> */}
      <Navbar />
      <div className="min-h-[76vh]">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;
