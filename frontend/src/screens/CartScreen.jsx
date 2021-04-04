import React, { useEffect } from "react";
import { Link } from "react-router-dom";

import { Row, Col, ListGroup, Image, Form, Button, Card } from "react-bootstrap";
import { addActionItemToCart, removeItemFromCartAction } from "../store/actions/cartAction";

import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";

const CartScreen = (props) => {
  const { match, location, history } = props;
  const productId = match.params.id;

  const qty = location.search && Number(location.search.split("=")[1]);

  const cart = useSelector((state) => state.cart);

  const { cartItems } = cart;

  const dispatch = useDispatch();

  useEffect(() => {
    if (qty && productId) {
      dispatch(addActionItemToCart(productId, qty));
    }
  }, [productId, qty, dispatch]);

  const removeFromCartHandler = (deleted_id) => {
    dispatch(removeItemFromCartAction(deleted_id));
  };

  const changeValueHandler = (e, same_id) => {
    const qty_new = Number(e.target.value);
    dispatch(addActionItemToCart(same_id, qty_new));
  };

  const checkoutHandler = () => {
    history.push("/login?redirect=shipping");
  };

  return (
    <Row>
      <Col md={8}>
        <h1>Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <Message>
            Your cart is empty <Link to="/"> Go Back</Link>
          </Message>
        ) : (
          <ListGroup variant="flush">
            {cartItems.map((item) => {
              return (
                <ListGroup.Item key={item.product}>
                  <Row>
                    <Col md={2}>
                      <Image src={item.image} alt={item.name} fluid rounded />
                    </Col>
                    <Col md={3}>
                      <Link to={`/product/${item.product}`}>{item.name}</Link>
                    </Col>
                    <Col md={2}>${item.Price}</Col>
                    <Col md={2}>
                      <Form.Control
                        as="select"
                        value={item.qty}
                        onChange={(e) => {
                          changeValueHandler(e, item.product);
                        }}
                      >
                        {[...Array(item.countInStock).keys()].map((x) => (
                          <option key={"opt_" + item.product + (x + 1)} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </Form.Control>
                    </Col>
                    <Col md={2}>
                      <Button
                        type="button"
                        variant="light"
                        onClick={(e) => {
                          removeFromCartHandler(item.product);
                        }}
                      >
                        <i className="fas fa-trash"></i>
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              );
            })}
          </ListGroup>
        )}
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)}) items</h2>$
              {cartItems.reduce((acc, item) => acc + item.qty * item.Price, 0).toFixed(2)}
            </ListGroup.Item>
            <ListGroup.Item>
              <Button
                type="button"
                className="bg-dark border-dark btn-block"
                disabled={cartItems.length === 0 ? true : false}
                onClick={checkoutHandler}
              >
                Check out to proceed
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  );
};

export default CartScreen;
