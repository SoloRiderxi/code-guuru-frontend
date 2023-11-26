import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Form, Spinner } from "react-bootstrap";
import { Store } from "../Store";
import axios from "axios";

export default function AddExpPage() {
  const { state } = useContext(Store);
  const { userInfo } = state;

  const { id } = useParams();

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");
  const [wait, setWait] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchExp();
  }, []);

  const fetchExp = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/expense/get/${id}`,
        { headers: { authorization: `Bearer ${userInfo.token}` } },
      );
      //console.log(data);
      setName(data.name);
      setDate(data.date);
      setCategory(data.category);
      setDescription(data.description);
      setLoading(false);
    } catch (e) {
      setLoading(false);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setWait(true);
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/expense/edit/${id}`,
        {
          name: name,
          description: description,
          category: category,
          date: date,
        },
        { headers: { authorization: `Bearer ${userInfo.token}` } },
      );

      //console.log(data);
      alert("Expense Editted successfully!!!");
      navigate("/home");
      setWait(false);
    } catch (e) {
      alert(e.response?.data?.message || e.message);
      setWait(false);
    }
  };

  return (
    <div
      className="container mt-5 pt-5 justify-content-center border rounded bg-light"
      style={{ width: "30rem" }}
    >
      <h3>Editting Expenses:</h3>
      <Form>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Name:</Form.Label>
          <Form.Control
            type="text"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </Form.Group>

        <Form.Group className="mb-4" controlId="exampleForm.ControlTextarea1">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            onChange={(e) => setDescription(e.target.value)}
            value={description}
          />
        </Form.Group>
        <Form.Select
          aria-label="Default select example"
          className="mb-4"
          onChange={(e) => setCategory(e.target.value)}
          value={category}
        >
          <option value="Cate01">Cate01</option>
          <option value="Cate02">Cate02</option>
          <option value="Cate03">Cate03</option>
        </Form.Select>
        <Form.Group className="mb-4" controlId="exampleForm.ControlInput1">
          <Form.Label>Date</Form.Label>
          <Form.Control
            type="date"
            onChange={(e) => setDate(e.target.value)}
            value={date}
          />
        </Form.Group>
      </Form>
      <div className="d-grid justify-content-center my-4">
        <button
          style={{ width: "12rem" }}
          type="submit"
          className="btn btn-primary"
          onClick={handleSave}
        >
          {wait ? (
            <>
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            </>
          ) : (
            "Save"
          )}
        </button>
      </div>
      <p className="d-flex justify-content-center pb-4">
        <Link to="/home"> Go Back</Link>
      </p>
    </div>
  );
}
