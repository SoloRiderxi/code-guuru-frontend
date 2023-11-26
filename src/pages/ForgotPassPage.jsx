import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import axios from "axios";
import { Store } from "../Store";

export default function ForgotPassPage() {
  const { dispatch } = useContext(Store);

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [wait, setWait] = useState(false);

  const handleRequest = async (e) => {
    e.preventDefault();
    setWait(true);
    if (email == "") {
      alert("Please enter your email!!");
      setWait(false);
      return;
    }

    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/user/forgot-password`,
        {
          email: email,
        },
      );
      if (data.ok) {
        setWait(false);
        dispatch({
          type: "PassState",
          payload: { status: "waitingForCode", email: email },
        });
        alert("We have send you a rest code on your email");

        navigate("/rest-password");
      } else {
        alert("Something went wrong");
      }
    } catch (e) {
      setWait(false);
      alert(e.response?.data.message || e.message);
    }
  };

  return (
    <div className="container mt-5 py-5 d-flex justify-content-center border rounded bg-light">
      <form>
        <h3 className="mb-3">Forgot Password:</h3>

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
            "Request The Code"
          )}
        </button>
        <p className="mt-3 mx-3">
          <Link to="/">Go Back</Link>
        </p>
      </form>
    </div>
  );
}
