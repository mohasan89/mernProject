import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";

import { Form, Button, Row, Col, Table } from "react-bootstrap";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { myorders } from "../store/actions/orderActions";
import { getDetails, updateDetails } from "../store/actions/userActions";

const FromScreen = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [username, setUsername] = useState("");
  const [readOnly, setReadOnly] = useState("true");

  const dispatch = useDispatch();

  const user = useSelector((state) => state.detailsUser);
  const orders = useSelector((state) => state.myOrders);

  const { loading: orderLoading, error, myorders: allOrders } = orders;

  const userLogin = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(myorders());
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (user.user) {
      setUsername(user.user.name);
      setEmail(user.user.email);
    }
  }, [user.user]);

  useEffect(() => {
    if (!userLogin.user.token) {
      history.push("/login");
    } else {
      if (!user.user.token) {
        dispatch(getDetails());
      }
    }
  }, [history, dispatch, userLogin, user.user.token]);

  let successUpdatedMessage = user.successUpdatedMessage;
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateDetails(
        { name: username, email, password, password2, token: user.user.token },
        setReadOnly
      )
    );
  };

  const { loading, err } = user;
  return (
    <React.Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Row>
          <Col md={3}>
            <h2>Profile </h2>
            {successUpdatedMessage && <Message variant="success">{successUpdatedMessage}</Message>}
            {err && <Message variant="danger">{err}</Message>}
            <Form onSubmit={submitHandler}>
              <Form.Group controlId="username">
                <Form.Label>Name:</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="enter your name"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  readonly={readOnly}
                />
              </Form.Group>
              <Form.Group controlId="email">
                <Form.Label>Email address:</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  readonly={readOnly}
                />
              </Form.Group>
              <Form.Group controlId="password">
                <Form.Label>Password:</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="enter new password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  readonly={readOnly}
                />
              </Form.Group>
              <Form.Group controlId="password2">
                <Form.Label>Reapet your password:</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="enter new password"
                  value={password2}
                  onChange={(e) => setPassword2(e.target.value)}
                  readonly={readOnly}
                />
              </Form.Group>
              {readOnly === "true" && (
                <Button
                  className="bg-dark border-dark my-3"
                  type="button"
                  onClick={() => {
                    setReadOnly(null);
                  }}
                >
                  Modify
                </Button>
              )}
              {!readOnly && (
                <Button className="bg-dark border-dark my-3" type="submit" onSubmit={submitHandler}>
                  Submit
                </Button>
              )}
            </Form>
          </Col>
          <Col md={9}>
            <h2>Orders</h2>
            {orderLoading && <Loader />}
            {error && <Message variant="danger">{error}</Message>}
            {allOrders && (
              <Table striped bordered hover responsive className="table-sm">
                <thead>
                  <tr>
                    <th></th>
                    <th>Order id</th>
                    <th>Date</th>
                    <th>Total</th>
                    <th>Paid</th>
                    <th>Deliverd</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {allOrders.map((order, iter) => (
                    <tr>
                      <th>{iter + 1}</th>
                      <th>
                        <Link to={`/order/${order._id}`} style={{ color: "black" }}>
                          <p>{order._id}</p>
                        </Link>
                      </th>
                      <th>{order.createdAt.substring(0, 10)}</th>
                      <th>{order.totalPrice}</th>
                      <th>
                        {order.isPaid ? (
                          order.paidAt.substring(0, 10)
                        ) : (
                          <i className="fas fa-times" style={{ color: "darkred" }} />
                        )}
                      </th>
                      <th>
                        {order.isDelivered ? (
                          order.deliveredAt.substring(0, 10)
                        ) : (
                          <i className="fas fa-times" style={{ color: "darkred" }} />
                        )}
                      </th>
                      <th>
                        <LinkContainer to={`/order/${order._id}`}>
                          <Button className="btn bg-dark border-dark">Details</Button>
                        </LinkContainer>
                      </th>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}
          </Col>
        </Row>
      )}
    </React.Fragment>
  );
};

export default FromScreen;
