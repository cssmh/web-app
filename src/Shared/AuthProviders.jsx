import app from "./firebase.config";
import { createContext, useEffect, useState } from "react";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { clearCookie, setToken } from "../api/auth";

export const AuthContext = createContext(null);
const googleProvider = new GoogleAuthProvider();
const auth = getAuth(app);

const AuthProviders = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const googleLogin = async () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  const createUser = async (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const login = async (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const profileUpdate = async (name, image) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: image,
    });
  };

  const logOut = async () => {
    return signOut(auth);
  };

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      const userEmail = currentUser?.email || user?.email;
      try {
        if (userEmail) {
          await setToken(userEmail);
        } else {
          await clearCookie();
        }
      } catch (error) {
        console.log("Error during on auth token", error);
      } finally {
        setLoading(false);
      }
    });

    return () => {
      unSubscribe();
    };
  }, [user]);

  const authInfo = {
    user,
    createUser,
    login,
    logOut,
    loading,
    profileUpdate,
    googleLogin,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProviders;
