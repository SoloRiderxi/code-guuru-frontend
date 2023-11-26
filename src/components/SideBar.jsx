import { useState } from "react";
import { Button, Offcanvas } from "react-bootstrap";
import SearchBox from "./SearchBox";

function SideBar() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Search & Filters
      </Button>

      <Offcanvas show={show} onHide={handleClose} className="bg-light">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Search & Filters</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <SearchBox />
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default SideBar;
