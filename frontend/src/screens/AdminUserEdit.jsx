import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

import FormContainer from "../components/FormContainer";
import Loader from "../components/Loader";
import Message from "../components/Message";

import { getUserbyId, updateUserbyId } from "../store/actions/userActions";

const AdminUserEdit = ({ match }) => {
  const id = match.params.id;
  const { user, loading, error } = useSelector((state) => state.editUser);

  const updateUser = useSelector((state) => state.updateUser);
  const { user: updatedUser, loading: updateLoading, error: updateError } = updateUser;

  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [username, setUsername] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    if (
      !user ||
      user._id !== id ||
      (updatedUser._id === id &&
        (user.name !== updatedUser.name ||
          user.isAdmin !== updatedUser.isAdmin ||
          user.email !== updatedUser.email))
    )
      dispatch(getUserbyId(id));
    else {
      setEmail(user.email);
      setIsAdmin(user.isAdmin);
      setUsername(user.name);
    }
  }, [user, dispatch, id, updatedUser]);

  const submitHandler = (e) => {
    e.preventDefault();
    const dataUpdate = { email, isAdmin, name: username };
    dispatch(updateUserbyId(id, dataUpdate));
  };

  return (
    <React.Fragment>
      <Link to="/admin/users" className="btn bg-dark text-white my-3">
        Go back
      </Link>
      {loading || updateLoading ? (
        <Loader />
      ) : (
        <FormContainer>
          {error || (updateError && <Message variant="danger">{error || updateError}</Message>)}
          <Form onSubmit={submitHandler}>
            <h1>Edit User</h1>
            <Form.Group controlId="email">
              <Form.Label>Email address:</Form.Label>
              <Form.Control
                type="email"
                placeholder="enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
            <Form.Group id="isAdmin">
              <Form.Check
                type="checkbox"
                label="Admin"
                checked={isAdmin}
                onChange={() => setIsAdmin(!isAdmin)}
              />
            </Form.Group>
            <Button className="bg-dark border-dark" type="submit" variant="primary">
              Update
            </Button>
          </Form>
        </FormContainer>
      )}
    </React.Fragment>
  );
};

export default AdminUserEdit;
