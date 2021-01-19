import React from "react";
import { Card } from "react-bootstrap";
import Review from "./Review";
import { Link } from "react-router-dom";
const Prodcut = (props) => {
  const { product } = props;
  return (
    <Card className="my-2 p-3 rounded text-center product-card ">
      <Link to={`/product/${product._id}`}>
        <Card.Img className="h-100" src={product.image} variant="top" />
      </Link>
      <Card.Body>
        <Link style={{ textDecoration: "none", color: "inherit" }} to={`/product/${product._id}`}>
          <Card.Title as="div" variant="top">
            <strong>{product.name}</strong>
          </Card.Title>
        </Link>
        <Card.Text as="div">
          <div className="my-3">
            <Review value={product.rating} text={`${product.numReviews} reviews`} />
          </div>
        </Card.Text>
        <Card.Text as="h3">${product.Price.toFixed(2)}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Prodcut;
