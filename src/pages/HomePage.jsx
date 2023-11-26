import React, { useState, useEffect, useContext } from "react";

import { useNavigate } from "react-router-dom";
import { Container, Table, Button, Spinner } from "react-bootstrap";
import SideBar from "../components/SideBar.jsx";
import { Store } from "../Store";
import axios from "axios";

export default function HomePage() {
  const { state, dispatch } = useContext(Store);
  const { userInfo } = state;
  const navigate = useNavigate();

  const [expences, setExpences] = useState([]);

  const [loading, setLoading] = useState(true);

  const [effectHasRun, setEffectHasRun] = useState(false);

  useEffect(() => {
    if (!effectHasRun) {
      setEffectHasRun(true);
      fetchExp();
    }
  }, []);

  const fetchExp = async () => {
    //console.log(expences.length);
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/expense/get`,
        { headers: { authorization: `Bearer ${userInfo.token}` } },
      );
      setExpences(data);
      //console.log(data);
      setLoading(false);
    } catch (e) {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    localStorage.removeItem("userInfo");
    navigate("/");
  };

  const handleDelete = async (id) => {
    //console.log(id);
    try {
      const { data } = await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/expense/${id}`,

        { headers: { authorization: `Bearer ${userInfo.token}` } },
      );
      navigate("/");
      //console.log(data);
    } catch (e) {
      //console.log(e);
      alert(e?.response?.data?.message || e.message);
    }
  };

  const handleEdit = (id) => {
    navigate(`/edit-expenses/${id}`);
  };
  return (
    <>
      {loading ? (
        <div className="container d-flex justify-content-center mt-5">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      ) : (
        <div className="container mt-5 pt-5 justify-content-center border rounded bg-light">
          <h1>Home Page</h1>
          <div className="d-flex justify-content-between mb-4">
            <SideBar />

            <Button variant="info" onClick={handleLogout}>
              Logout
            </Button>
          </div>
          <h3 className="mb-3">{userInfo.name}'s Expenses</h3>
          {expences.length == 0 ? (
            <h6>No Expences were found!!!</h6>
          ) : (
            <Table bordered hover>
              <thead>
                <tr className="align-items-center">
                  <th>Name of Exp.</th>
                  <th>Category</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              {expences?.map((e) => (
                <tbody key={e._id}>
                  <tr>
                    <td>{e.name}</td>
                    <td>{e.category}</td>
                    <td>{e.date}</td>
                    <td>
                      <div className="d-flex">
                        <Button
                          variant="danger"
                          className="m-1"
                          onClick={() => handleDelete(e._id)}
                        >
                          Delete
                        </Button>
                        <Button
                          variant="secondary"
                          className="m-1"
                          onClick={() => navigate(`/edit-expenses/${e._id}`)}
                        >
                          Edit
                        </Button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              ))}
            </Table>
          )}
          <div className="mb-4">
            {" "}
            <Button onClick={() => navigate("/add-expenses")}>
              Add a new expense
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
