import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
// import "./App.css";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";
import ForgotPassPage from "./pages/ForgotPassPage";
import RestPassPage from "./pages/RestPassPage";
import AddExpPage from "./pages/AddExpPage";
import EditExpPage from "./pages/EditExpPage";
import SearchPage from "./pages/SearchPage";

import {
  UserProtectedRoute,
  GuestProtectedRoute,
} from "./components/ProtectedRoutes.jsx";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            exact
            path="/"
            element={
              <GuestProtectedRoute>
                <LoginPage />
              </GuestProtectedRoute>
            }
          />
          <Route
            path="/register"
            element={
              <GuestProtectedRoute>
                <RegisterPage />
              </GuestProtectedRoute>
            }
          />

          <Route
            path="/forgot-password"
            element={
              <GuestProtectedRoute>
                <ForgotPassPage />
              </GuestProtectedRoute>
            }
          />
          <Route
            path="/rest-password"
            element={
              <GuestProtectedRoute>
                <RestPassPage />
              </GuestProtectedRoute>
            }
          />
          <Route
            path="/home"
            element={
              <UserProtectedRoute>
                <HomePage />
              </UserProtectedRoute>
            }
          />
          <Route
            path="/add-expenses"
            element={
              <UserProtectedRoute>
                <AddExpPage />
              </UserProtectedRoute>
            }
          />
          <Route
            path="/edit-expenses/:id"
            element={
              <UserProtectedRoute>
                <EditExpPage />
              </UserProtectedRoute>
            }
          />

          <Route
            path="/search"
            element={
              <UserProtectedRoute>
                <SearchPage />
              </UserProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
