import React, { useEffect } from "react";
import { Button, Row, Col, ListGroup, Image, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import CheckoutSteps from "../components/CheckoutSteps";
import { createOrder } from "../store/actions/orderActions";

const PlaceorderScreen = ({ history }) => {
  const dispatch = useDispatch();

  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };

  const cart = useSelector((state) => state.cart);

  cart.itemsPrice = cart.cartItems.reduce((acc, item) => acc + item.Price * item.qty, 0);
  cart.itemsPrice = addDecimals(Number(cart.itemsPrice.toFixed(2)));

  cart.shippingPrice = cart.itemsPrice > 100 ? addDecimals(0) : addDecimals(100);

  cart.taxPrice = addDecimals(Number((cart.itemsPrice * 0.15).toFixed(2)));

  cart.totalPrice = addDecimals(
    Number(cart.taxPrice) + Number(cart.itemsPrice) + Number(cart.shippingPrice)
  );

  const orderCreate = useSelector((state) => state.orderCreate);
  const { order, success, error } = orderCreate;
  useEffect(() => {
    if (success && order) {
      history.push(`/order/${order._id}`);
    }
    // eslint-disable-next-line
  }, [success, history]);

  const clickHandler = (e) => {
    e.preventDefault();
    dispatch(
      createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      })
    );
  };
  return (
    <React.Fragment>
      <CheckoutSteps step1 step2 step3 step4 />
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>SHIPPING</h2>
              <p>
                <strong>Address: </strong>
                {cart.shippingAddress.address}, {cart.shippingAddress.city},{" "}
                {cart.shippingAddress.postalcode}, {cart.shippingAddress.country}
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>PAYMENT METHOD</h2>
              <p>Method: {cart.paymentMethod.paymentMethod}</p>
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>ORDER ITEMS: </h2>
              {cart.cartItems.length === 0 ? (
                <Message>Your cart is empty</Message>
              ) : (
                <ListGroup variant="flush">
                  {cart.cartItems.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={1}>
                          <Image src={item.image} alt={item.name} fluid rounded />
                        </Col>
                        <Col>
                          <Link to={`/product/${item.product}`}>{item.name}</Link>
                        </Col>
                        <Col md={4}>
                          {item.qty} x ${item.Price.toFixed(2)} = $
                          {(item.Price * item.qty).toFixed(2)}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h2>Items</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>${cart.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>${cart.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>${cart.taxPrice}</Col>
                </Row>
              </ListGroup.Item>
            </ListGroup>

            <ListGroup.Item>
              <Row>
                <Col>Total</Col>
                <Col>${cart.totalPrice}</Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item>{error && <Message variant="danger">{error}</Message>}</ListGroup.Item>
            <ListGroup.Item>
              <Button
                type="button"
                className="btn-block bg-dark border-dark"
                onClick={clickHandler}
                disabled={cart.cartItems.length === 0}
              >
                Proceed
              </Button>
            </ListGroup.Item>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default PlaceorderScreen;
