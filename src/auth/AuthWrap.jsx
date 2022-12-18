import React from "react";
import { Navigate } from "react-router-dom";
import { useFirebase } from "../context/Firebase";

const AuthWrap = ({ children }) => {
  const { isLoggedIn } = useFirebase();
  return isLoggedIn ? children : <Navigate to="/login"></Navigate>;
};

export default AuthWrap;
