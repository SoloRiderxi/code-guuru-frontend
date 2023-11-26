import React, { useState, useEffect, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import { Store } from "../Store";
import axios from "axios";

export default function RestPassPage() {
  const { state, dispatch } = useContext(Store);
  const { userPassState } = state;

  const [email, setEmail] = useState(userPassState?.email || "");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const [wait, setWait] = useState(false);

  const navigate = useNavigate();
  useEffect(() => {
    if (userPassState?.status != "waitingForCode" || !userPassState.email) {
      navigate("/");
    }
  }, []);

  const handleRequest = async (e) => {
    e.preventDefault();
    if (password == "" || code == "") {
      alert("please enter a new password and the sent code");
      return;
    }
    setWait(true);
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/user/reset-password`,
        {
          email: email,
          code: code,
          password: password,
        },
      );
      if (data.ok) {
        setWait(false);
        dispatch({
          type: "ClearPassState",
        });
        alert("Password changed successfully, You can login now!!!");
        navigate("/");
      } else {
        alert(data.error);
        setWait(false);
      }
    } catch (e) {
      setWait(false);
      alert(e.response?.data.message || e.message);
    }
  };
  return (
    <div className="container mt-5 py-5 d-grid justify-content-center border rounded bg-light">
      <h1>Rest Password:</h1>
      <form>
        <div className="mb-3">
          <label className="mb-1"> Your Email:</label>
          <input
            style={{ width: "24rem" }}
            type="email"
            className="form-control"
            placeholder="example@email.com"
            value={email}
            readOnly
          />
        </div>
        <div className="mb-3">
          <label className="mb-1"> Your New Password:</label>
          <input
            style={{ width: "24rem" }}
            type="password"
            className="form-control"
            placeholder="*******"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="mb-1"> The Code:</label>
          <input
            style={{ width: "24rem" }}
            type="text"
            className="form-control"
            placeholder="Check your email for the code..."
            onChange={(e) => setCode(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          onClick={handleRequest}
        >
          {wait ? (
            <>
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            </>
          ) : (
            "Verify The Code"
          )}
        </button>
      </form>
    </div>
  );
}
