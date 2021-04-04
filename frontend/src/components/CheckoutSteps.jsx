import React from "react";
import { Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
  return (
    <Nav className="justify-content-between mb-4">
      <Nav.Item className="mx-2 font-weight-bold">
        {step1 ? (
          <LinkContainer to="/login">
            <Nav.Link className="text-dark">Sign In</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>Sign In</Nav.Link>
        )}
      </Nav.Item>

      <Nav.Item className="mx-2 font-weight-bold">
        {step2 ? (
          <LinkContainer to="/shipping">
            <Nav.Link className="text-dark">Shipping</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>Shipping</Nav.Link>
        )}
      </Nav.Item>

      <Nav.Item className="mx-2 font-weight-bold">
        {step3 ? (
          <LinkContainer to="/payment">
            <Nav.Link className="text-dark">Payment</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>Payment</Nav.Link>
        )}
      </Nav.Item>

      <Nav.Item className="mx-2 font-weight-bold">
        {step4 ? (
          <LinkContainer to="/placeorder">
            <Nav.Link className="text-dark">Place Order</Nav.Link>
          </LinkContainer>
        ) : (
          <Nav.Link disabled>Place Order</Nav.Link>
        )}
      </Nav.Item>
    </Nav>
  );
};

export default CheckoutSteps;
