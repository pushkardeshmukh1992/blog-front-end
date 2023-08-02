import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { userAuth } = useSelector((state) => state?.users);
  const isLogin = userAuth?.userInfo?.token;

  if (!isLogin) {
    console.log("navigateing too login");
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
