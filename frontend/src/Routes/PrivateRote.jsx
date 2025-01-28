import React from "react";
import { Navigate } from "react-router-dom";

export default function PrivateRote({ children }) {
  const isAuth = localStorage.getItem("isAuth");

  if (!isAuth) {
    alert("Please Login First");
    return <Navigate to="/login" />;
  }

  return children;
}
