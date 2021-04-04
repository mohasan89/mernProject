import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import { Col, Row, Card, Image, ListGroup, Button, Form } from "react-bootstrap";
import Review from "../components/Review";

import { useDispatch, useSelector } from "react-redux";
import { detailProduct, addReview } from "../store/actions/productsActions";

import Loading from "../components/Loader";
import Message from "../components/Message";
import Meta from "../components/Meta";

import { PRODCUT_REVIEW_RESET } from "../store/constants/productConstraints";
const ProductScreen = (props) => {
  const id = props.match.params.id;

  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState("");
  const [comment, setComment] = useState("");

  const details = useSelector((state) => {
    return state.details;
  });

  const { user } = useSelector((state) => {
    return state.user;
  });

  const { loading: reviewLoading, success: reviewSuccess, error: reviewError } = useSelector(
    (state) => {
      return state.productReview;
    }
  );

  const dispatch = useDispatch();
  useEffect(() => {
    if (!reviewLoading) {
      dispatch(detailProduct(id));
    }
  }, [id, dispatch, reviewLoading]);

  useEffect(() => {
    dispatch({ type: PRODCUT_REVIEW_RESET });
  }, [dispatch]);
  const { product, error, loading } = details;

  const addToCartHandler = (e) => {
    props.history.push(`/cart/${id}?qty=${qty}`);
  };

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(addReview(product._id, { comment, rating: Number(rating) }));
  };
  return (
    <React.Fragment>
      <Meta title={product ? "shop | product: " + product.name : "product"} />
      <Link className="btn btn-light my-3" to="/">
        Go Back
      </Link>
      {loading ? (
        <Loading />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <React.Fragment>
          <Row>
            <React.Fragment>
              <Col md={6}>
                <Row>
                  <Col>
                    <Image src={product.image} alt={product.name} fluid />
                  </Col>
                </Row>
                <Row className="my-3">
                  <Col>
                    <h2>Reviews</h2>
                    {product.reviews.length === 0 ? (
                      <Message variant="dark">No reviews </Message>
                    ) : (
                      <ListGroup>
                        {product.reviews.map((review) => (
                          <ListGroup.Item key={review.user}>
                            <strong>{review.name}</strong>
                            <Review value={review.rating} />
                            <p>{review.createdAt.substring(0, 10)}</p>
                            <p>{review.comment}</p>
                          </ListGroup.Item>
                        ))}
                      </ListGroup>
                    )}
                    {
                      <ListGroup.Item>
                        {reviewSuccess && <Message variant="success">Review created</Message>}
                        {reviewError && <Message variant="danger">{reviewError}</Message>}
                        <h2>Write a customer review</h2>
                        {user._id ? (
                          <Form onSubmit={submitHandler}>
                            <Form.Group controlId="rating">
                              <Form.Label>Rating:</Form.Label>
                              <Form.Control
                                as="select"
                                value={rating}
                                onChange={(e) => setRating(e.target.value)}
                              >
                                <option value="">Select ...</option>
                                <option value="1">1- Poor</option>
                                <option value="2">2- Fail</option>
                                <option value="3">3- Good</option>
                                <option value="4">4- Very Good</option>
                                <option value="5">5- Excellent</option>
                              </Form.Control>
                            </Form.Group>
                            <Form.Group controlId="coment">
                              <Form.Label>Write a review:</Form.Label>
                              <Form.Control
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                as="textarea"
                                rows={3}
                              ></Form.Control>
                            </Form.Group>
                            <Button
                              type="submit"
                              className="btn bg-dark border-dark"
                              disabled={comment === "" || rating === ""}
                            >
                              Submit
                            </Button>
                          </Form>
                        ) : (
                          <Message variant="dark">
                            Please <Link to="/login">sign in</Link> to leave a review
                          </Message>
                        )}
                      </ListGroup.Item>
                    }
                  </Col>
                </Row>
              </Col>
            </React.Fragment>
            <Col md={3}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h4 className="mright-auto">{product.name}</h4>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Review value={product.rating} text={product.numReviews + " reviews"} />
                </ListGroup.Item>
                <ListGroup.Item>Price: ${product.Price}</ListGroup.Item>
                <ListGroup.Item>Description: {product.description}</ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={3}>
              <Card>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <Row>
                      <Col>Price:</Col>
                      <Col>
                        <strong>${product.Price}</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Status:</Col>
                      <Col>{product.countInStock > 0 ? "In stock" : "Out of stock"}</Col>
                    </Row>
                  </ListGroup.Item>

                  {product.countInStock > 0 && (
                    <ListGroup.Item>
                      <Row>
                        <Col>Quantity: </Col>
                        <Col>
                          <Form.Control
                            as="select"
                            value={qty}
                            onChange={(e) => {
                              setQty(e.target.value);
                            }}
                          >
                            {[...Array(product.countInStock).keys()].map((x) => {
                              return (
                                <option key={x + 1} value={x + 1}>
                                  {x + 1}
                                </option>
                              );
                            })}
                          </Form.Control>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )}

                  <ListGroup.Item>
                    <Row>
                      <Button
                        onClick={addToCartHandler}
                        className="btn-block btn-dark"
                        type="button"
                        disabled={product.countInStock === 0}
                      >
                        Add to cart
                      </Button>
                    </Row>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default ProductScreen;
