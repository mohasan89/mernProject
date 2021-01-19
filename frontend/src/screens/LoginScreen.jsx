import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Message";
import FormContainer from "../components/FormContainer";
import { loginUser } from "../store/actions/userActions";

const LoginScreen = ({ location, history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const userInfo = useSelector((state) => state.user);
  const { loading, err, user } = userInfo;

  let redirect = location.search ? location.search.split("=")[1] : "/";

  useEffect(() => {
    if (user.token) {
      history.push(redirect);
    }
  }, [history, redirect, userInfo, user]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(loginUser(email, password));
  };
  return (
    <FormContainer>
      <h1>Sign In</h1>
      {err && <Message variant="danger">{err}</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="email">
          <Form.Label>Email Address: </Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label>Password: </Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Button className="bg-dark border-dark" type="submit" variant="primary">
          Sign In
        </Button>
        <Row className="py-3">
          <Col>
            New Customer?
            <Link to={redirect ? `/register?redirect=${redirect}` : "/register"}> Register</Link>
          </Col>
        </Row>
      </Form>
    </FormContainer>
  );
};

export default LoginScreen;
