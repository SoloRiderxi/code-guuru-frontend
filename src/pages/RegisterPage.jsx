import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import axios from "axios";

export default function RegisterPage() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [wait, setWait] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setWait(true);
    if (name == "" || email == "" || password == "") {
      alert("Please enter your info!!");
      setWait(false);
      return;
    }
    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      setWait(false);
      return;
    }
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/user/register`,
        {
          name: name,
          email: email,
          password: password,
        },
      );
      //console.log(data);
      alert(data.message);
      navigate("/");
      //console.log(data);
    } catch (e) {
      setWait(false);
      alert(e.response?.data.message || e.message);
    }
  };

  return (
    <div className="container mt-5 pt-5 d-flex justify-content-center border rounded bg-light">
      <form>
        <h3 className="mb-3">Register</h3>

        <div className="mb-3">
          <label className="mb-1"> Enter your Name:</label>
          <input
            style={{ width: "24rem" }}
            type="email"
            className="form-control"
            placeholder="John Doe"
            onChange={(e) => setName(e.target.value)}
          />
        </div>

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
          <label className="mb-1"> Enter a Password:</label>
          <input
            type="password"
            className="form-control"
            placeholder="************"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="mb-1"> Confirm the Password:</label>
          <input
            type="password"
            className="form-control"
            placeholder="*************"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>

        <div className="d-grid mx-5 my-4 align-c">
          <button
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
              "Register"
            )}
          </button>
        </div>

        <p className="d-flex justify-content-center">
          Already Registered... <Link to="/"> Login</Link>
        </p>
      </form>
    </div>
  );
}
