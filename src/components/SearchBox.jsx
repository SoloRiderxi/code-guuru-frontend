import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";

export default function SearchBox() {
  const [query, setQuery] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    navigate(
      `/search?query=${query}&category=${category}&date=${date}&description=${description}`,
    );
  };

  return (
    <div>
      <p className="mb-3 text-secondary">
        fill only the fields you want to search for
      </p>
      <Form>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Name:</Form.Label>
          <Form.Control
            type="text"
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Enter the name you are looking for"
          />
        </Form.Group>

        <Form.Group className="mb-4" controlId="exampleForm.ControlTextarea1">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter the description you are looking for"
          />
        </Form.Group>
        <p>Category</p>
        <Form.Select
          aria-label="Default select example"
          className="mb-4"
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value=""></option>
          <option value="Cate01">Cate01</option>
          <option value="Cate02">Cate02</option>
          <option value="Cate03">Cate03</option>
        </Form.Select>
        <Form.Group className="mb-4" controlId="exampleForm.ControlInput1">
          <Form.Label>Date</Form.Label>
          <Form.Control type="date" onChange={(e) => setDate(e.target.value)} />
        </Form.Group>
      </Form>
      <button
        style={{ width: "8rem", marginTop: "1rem" }}
        type="submit"
        className="btn btn-primary"
        onClick={handleSearch}
      >
        Search
      </button>
    </div>
  );
}
