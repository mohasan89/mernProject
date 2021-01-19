import React, { useState, useEffect } from "react";
import { Row, Col, ListGroup, Image, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { orderDetails } from "../store/actions/orderActions";
import axios from "axios";
import { orderPaymentAction } from "../store/actions/orderActions";
import { PayPalButton } from "react-paypal-button-v2";
import { ORDER_PAYMENT_RESET } from "../store/constants/ordersConstrants";
const OrderScreen = ({ match }) => {
  const orderId = match.params.id;

  const [sdkReady, setSdkReady] = useState(false);
  const [isPaid, setIsPaid] = useState(false);
  const [paidAt, setPaidAt] = useState(null);
  const dispatch = useDispatch();

  const orderDetailsState = useSelector((state) => state.orderDetails);
  const orderPayPal = useSelector((state) => state.orderPayment);

  const { order, loading, error } = orderDetailsState;
  const { loading: loadingPaypal, success: successPaypal } = orderPayPal;

  useEffect(() => {
    const addPayPalScript = async () => {
      const { data: clientId } = await axios.get("/api/config/paypal");
      const script = document.createElement("script");
      script.type = "text/javascript";

      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
      script.setAttribute("async", "true");

      script.onload = () => {
        setSdkReady(true);
      };

      document.body.appendChild(script);
    };

    if (!order || successPaypal) {
      dispatch(orderDetails(orderId));
      dispatch({ type: ORDER_PAYMENT_RESET });
    } else if (!order.isPaid) {
      if (!window.isPaid) {
        addPayPalScript();
      } else {
        setSdkReady(true);
      }
    }
  }, [orderId, dispatch, successPaypal, order]);

  useEffect(
    () => {
      if (order) {
        if (order._id !== orderId) {
          dispatch(orderDetails(orderId));
        }
      }
    }, // eslint-disable-next-line
    [order, orderId]
  );

  useEffect(() => {
    if (successPaypal === true) {
      setIsPaid(true);
      setPaidAt(Date.now());
    }
  }, [successPaypal]);

  const successPaymentHandler = (paymentResults, data) => {
    dispatch(orderPaymentAction(orderId, paymentResults));
  };

  return (
    <React.Fragment>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <React.Fragment>
          <h1>Order: {orderId}</h1>
          <Row>
            <Col md={8}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h2>SHIPPING</h2>
                  <p>
                    <strong>Name: </strong>
                    {order.user.name}
                  </p>
                  <p>
                    <strong>Email: </strong>
                    <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
                  </p>
                  <p>
                    <strong>Address: </strong>
                    {order.shippingAddress.address}, {order.shippingAddress.city},
                    {order.shippingAddress.postalcode}, {order.shippingAddress.country}
                  </p>
                  {order.isDelivered ? (
                    <Message variant="success">Paid on {order.deliveredAt}</Message>
                  ) : (
                    <Message variant="danger">Not delivered yet</Message>
                  )}
                </ListGroup.Item>
                <ListGroup.Item>
                  <h2>PAYMENT METHOD</h2>
                  <p>Method: {order.paymentMethod}</p>
                  {order.paidAt || paidAt ? (
                    <Message variant="success">Paid on {order.paidAt || paidAt}</Message>
                  ) : (
                    <Message variant="danger">Not paid yet</Message>
                  )}
                </ListGroup.Item>

                <ListGroup.Item>
                  <h2>ORDER ITEMS: </h2>
                  {order.orderItems.length === 0 ? (
                    <Message>Order is empty</Message>
                  ) : (
                    <ListGroup variant="flush">
                      {order.orderItems.map((item, index) => (
                        <ListGroup.Item key={orderId + index}>
                          <Row>
                            <Col md={1}>
                              <Image src={item.image} alt={item.name} fluid rounded />
                            </Col>
                            <Col>
                              <Link to={`/product/${item.product}`}>{item.name}</Link>
                            </Col>
                            <Col md={4}>
                              {item.qty} x ${Number(item.Price).toFixed(2)} = $
                              {(Number(item.Price) * item.qty).toFixed(2)}
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
                      <Col>${order.itemsPrice}</Col>
                    </Row>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <Row>
                      <Col>Shipping</Col>
                      <Col>${order.shippingPrice}</Col>
                    </Row>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <Row>
                      <Col>Tax</Col>
                      <Col>${order.taxPrice}</Col>
                    </Row>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <Row>
                      <Col>Total</Col>
                      <Col>${order.totalPrice}</Col>
                    </Row>
                  </ListGroup.Item>

                  <ListGroup.Item style={{ display: (order.isPaid || isPaid) && "none" }}>
                    {(loadingPaypal || !sdkReady) && (!order.isPaid || isPaid) ? (
                      <Loader />
                    ) : (
                      <PayPalButton amount={order.totalPrice} onSuccess={successPaymentHandler} />
                    )}
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

export default OrderScreen;
