import React from "react";
import { Navigate } from "react-router-dom";

export default function PrivateRoutUser({ children }) {
  const isAuth = localStorage.getItem("isAuthUser");

  if (!isAuth) {
    alert("Please Login First");
    return <Navigate to="/login" />;
  }

  return children;
}
