import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import { Store } from "../Store";
import axios from "axios";

export default function LoginPage() {
  const { state, dispatch } = useContext(Store);
  const { userInfo } = state;

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [wait, setWait] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setWait(true);
    if (email == "" || password == "") {
      alert("Please enter your email and password!!");
      setWait(false);
      return;
    }
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/user/sign-in`,
        {
          email: email,
          password: password,
        },
      );
      dispatch({ type: "LOGIN", payload: data });
      localStorage.setItem("userInfo", JSON.stringify(data));
      navigate("home");
      //console.log(data);
    } catch (e) {
      alert(e.response?.data.message || e.message);
      setWait(false);
    }
  };

  return (
    <div
      className="container mt-5 pt-5 d-flex justify-content-center border rounded bg-light align-items-center"
      style={{ width: "30rem" }}
    >
      <form>
        <h3 className="mb-3">Sign In</h3>

        <div className="mb-3">
          <label className="mb-1"> Enter your Email:</label>
          <input
            style={{ width: "24rem" }}
            type="email"
            className="form-control"
            placeholder="example@email.com"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="mb-1"> Enter your Password:</label>
          <input
            type="password"
            className="form-control"
            placeholder="*************"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="d-grid justify-content-center my-4">
          <button
            style={{ width: "12rem" }}
            type="submit"
            className="btn btn-primary"
            onClick={handleSubmit}
          >
            {wait ? (
              <>
                <Spinner animation="border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
              </>
            ) : (
              "Login"
            )}
          </button>
        </div>
        <p className="d-flex justify-content-center">
          <Link to="forgot-password"> Forgot password?</Link>
        </p>

        <p className="d-flex justify-content-center">
          New Here... <Link to="register"> Register</Link>
        </p>
      </form>
    </div>
  );
}
