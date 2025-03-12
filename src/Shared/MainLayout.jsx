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
    }, 1100);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) return <Spinner size="100" />;

  return (
    <>
      <Navbar />
      <div className="min-h-[67vh] max-w-[1240px] 2xl:max-w-[80%] mx-auto">
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default MainLayout;
