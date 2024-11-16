import axiosSecure from ".";
import { getAuth, signOut } from "firebase/auth";
import app from "../Shared/firebase.config";
const auth = getAuth(app);

export const userLogout = async () => {
  return await signOut(auth);
};

export const setToken = async (email) => {
  const { data } = await axiosSecure.post("/jwt", { email });
  return data;
};

export const clearCookie = async () => {
  const { data } = await axiosSecure.get("/logout");
  return data;
};