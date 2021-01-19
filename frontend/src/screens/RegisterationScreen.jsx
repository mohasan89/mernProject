import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import Loader from "../components/Loader";
import Message from "../components/Message";

import { register } from "../store/actions/userActions";

const RegisterationScreen = ({ location, history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [username, setUsername] = useState("");

  const redirect = location.search ? location.search.split("=")[1] : "/";

  const dispatch = useDispatch();

  const user = useSelector((state) => state.regUser);

  useEffect(() => {
    if (user.user.token) {
      history.push("/");
    }
  }, [history, redirect, dispatch, user]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(register(username, email, password, password2));
  };

  const { loading, err } = user;
  return (
    <React.Fragment>
      {loading ? (
        <Loader />
      ) : (
        <FormContainer>
          {err && <Message variant="danger">{err}</Message>}
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="email">
              <Form.Label>Email address:</Form.Label>
              <Form.Control
                type="email"
                placeholder="enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="password">
              <Form.Label>Password:</Form.Label>
              <Form.Control
                type="password"
                placeholder="enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="password2">
              <Form.Label>Reapet your password:</Form.Label>
              <Form.Control
                type="password"
                placeholder="enter password"
                value={password2}
                onChange={(e) => setPassword2(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="username">
              <Form.Label>Name:</Form.Label>
              <Form.Control
                type="text"
                placeholder="enter your name"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </Form.Group>
            <Button className="bg-dark border-dark" type="submit" variant="primary">
              Register
            </Button>
          </Form>
        </FormContainer>
      )}
    </React.Fragment>
  );
};

export default RegisterationScreen;
