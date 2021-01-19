import React, { useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Button, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { listUsers } from "../store/actions/userActions";
import { deleteUser } from "../store/actions/userActions";
const UserListScreen = ({ history }) => {
  const dispatch = useDispatch();

  const listUsersVal = useSelector((state) => state.listUsers);
  const { success: deleteSuccess } = useSelector((state) => state.deleteUser);

  const { user } = useSelector((state) => state.user);

  const { loading, users, error } = listUsersVal;

  const deleteHandler = (id) => {
    if (window.confirm("are you show you want to delete the user")) {
      dispatch(deleteUser(id));
    }
  };
  useEffect(() => {
    if (user.isAdmin) {
      dispatch(listUsers());
    } else {
      history.push("/login");
    }
    // eslint-disable-next-line
  }, [history, deleteSuccess]);
  return (
    <React.Fragment>
      <h1>Users</h1>
      {loading && <Loader />}
      {error && <Message variant="danger">{error}</Message>}
      {users && (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <td>ID</td>
              <td>Name</td>
              <td>Email</td>
              <td>Admin</td>
              <td></td>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>
                  <a href={`mailto:${user.email}`}>{user.email}</a>
                </td>
                <td>
                  {user.isAdmin ? (
                    <i className="fas fa-check" style={{ color: "green" }}></i>
                  ) : (
                    <i className="fas fa-times" style={{ color: "darkred" }}></i>
                  )}
                </td>
                <td>
                  <LinkContainer to={`/admin/user/${user._id}/edit`}>
                    <Button variant="light" className="btn-sm">
                      <i className="fas fa-edit"></i>
                    </Button>
                  </LinkContainer>
                  <Button
                    variant="danger"
                    className="btn-sm"
                    onClick={() => deleteHandler(user._id)}
                  >
                    <i className="fas fa-trash"></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </React.Fragment>
  );
};

export default UserListScreen;
