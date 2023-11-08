import React, { useEffect, useState } from "react";
import { Button, Container, Offcanvas } from "react-bootstrap";
import { makeApiCall } from "./utils";

const Product = (props) => {
  const [productDetails, setProductDetails] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await makeApiCall("/products");
      setProductDetails(response.product);
    };
    fetchData();
  }, []);

  return (
    <Container>
      <Offcanvas show={props.showCanvas} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Offcanvas Example</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <p>This is the content of the offcanvas.</p>
          <Button variant="secondary" onClick={props.handleClose}>
            Close
          </Button>
        </Offcanvas.Body>
      </Offcanvas>
    </Container>
  );
};

export default Product;
