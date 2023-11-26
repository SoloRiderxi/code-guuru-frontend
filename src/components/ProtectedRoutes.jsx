import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { Store } from "../Store";
import { Route } from "react-router-dom";
import LoginPage from "../pages/LoginPage";

export function UserProtectedRoute({ children }) {
  const { state } = useContext(Store);
  const { userInfo } = state;
  return userInfo ? children : <Navigate to="/" />;
}

export function GuestProtectedRoute({ children }) {
  const { state } = useContext(Store);
  const { userInfo } = state;
  return userInfo ? <Navigate to="/home" /> : children;
}
