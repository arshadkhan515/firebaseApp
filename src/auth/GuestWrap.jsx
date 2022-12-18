import React from "react";
import { Navigate } from "react-router-dom";
import { useFirebase } from "../context/Firebase";

const GuestWrap = ({ children }) => {
  const { isLoggedIn } = useFirebase();
  return !isLoggedIn ? children : <Navigate to="/"></Navigate>;
};

export default GuestWrap;
