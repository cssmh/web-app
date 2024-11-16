import axios from "axios";
import { clearCookie, userLogout } from "./auth";
import { toast } from "sonner";

const axiosSecure = axios.create({
  baseURL: import.meta.env.VITE_server_URL,
  withCredentials: true,
});
axiosSecure.interceptors.response.use(
  (response) => response,
  async (error) => {
    // console.log("error in interceptor", error);
    if (error.response.status === 401 || error.response.status === 403) {
      toast.info("Your session has expired. Please log in again to continue");
      await clearCookie();
      await userLogout();
      history.push("/login");
    }
    return Promise.reject(error);
  }
);

export default axiosSecure;
