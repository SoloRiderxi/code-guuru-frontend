import React, { useState, useEffect, useContext } from "react";

import { useNavigate, useLocation, Link } from "react-router-dom";
import { Container, Table, Button, Spinner } from "react-bootstrap";

import { Store } from "../Store";
import axios from "axios";

export default function SearchPage() {
  const { state } = useContext(Store);
  const { userInfo } = state;
  const navigate = useNavigate();
  const { search } = useLocation();
  const sp = new URLSearchParams(search);

  const category = sp.get("category") || "";
  const query = sp.get("query") || "";
  const description = sp.get("description") || "";
  const date = sp.get("date") || "";
  const [expences, setExpences] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetchExp();
  }, []);

  const fetchExp = async () => {
    try {
      const { data } = await axios.get(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/expense/search?query=${query}&category=${category}&date=${date}&description=${description}`,
        { headers: { authorization: `Bearer ${userInfo.token}` } },
      );
      setExpences(data);
      //console.log(data);
      setLoading(false);
    } catch (e) {
      setLoading(false);
    }
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
          <h3>Search Results</h3>
          <h6 className="mb-3">{userInfo.name}'s Expenses</h6>
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
            <Link to="/home">Go Back</Link>
          </div>
        </div>
      )}
    </>
  );
}
