import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Table, Button } from "react-bootstrap";
import { fetchAllOrders, deliverOrder } from "../store/actions/orderActions";
import Loader from "../components/Loader";
import Message from "../components/Message";

const AdminOrdersScreen = ({ history }) => {
  const { orders, loading, error } = useSelector((state) => state.adminOrders);
  const isAdmin = useSelector((state) => state.user.user.isAdmin);

  const { loading: loadingDeliver, error: erroDeliver } = useSelector(
    (state) => state.adminDeliverOrder
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (isAdmin) {
      if (!loadingDeliver) {
        dispatch(fetchAllOrders());
      }
    } else {
      history.push("/login");
    }
  }, [dispatch, isAdmin, history, loadingDeliver]);

  const deliveredHandler = (id) => {
    dispatch(deliverOrder(id));
  };

  return (
    <React.Fragment>
      <h1>Orders:</h1>
      {loading || loadingDeliver ? (
        <Loader />
      ) : error || erroDeliver ? (
        <Message variant="danger">{error || erroDeliver}</Message>
      ) : (
        orders && (
          <Table bordered hover striped>
            <thead>
              <tr>
                <th>id</th>
                <th>user</th>
                <th>date</th>
                <th>total</th>
                <th>paid</th>
                <th>deliverd</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <th>{order._id}</th>
                  <th>{order.user.name}</th>
                  <th>{String(order.createdAt).substring(0, 10)}</th>
                  <th>{order.totalPrice}</th>
                  <th>
                    {order.isPaid ? (
                      <React.Fragment>
                        <i className="fas fa-check" style={{ color: "green" }} />
                        {"  " + order.paidAt.substring(0, 10)}
                      </React.Fragment>
                    ) : (
                      <i className="fas fa-times" style={{ color: "darkred" }} />
                    )}
                  </th>
                  <th>
                    {order.isDelivered ? (
                      <React.Fragment>
                        <i className="fas fa-check" style={{ color: "green" }} />
                        {"  " + order.deliveredAt.substring(0, 10)}
                      </React.Fragment>
                    ) : (
                      <i className="fas fa-times" style={{ color: "darkred" }} />
                    )}
                  </th>
                  <th>
                    <Link to={`/order/${order._id}`} className="btn bg-dark text-white">
                      Details
                    </Link>
                  </th>
                  <th>
                    <Button
                      className="bg-dark border-dark"
                      onClick={() => deliveredHandler(order._id)}
                      disabled={order.isDelivered}
                    >
                      Mark as delivered
                    </Button>
                  </th>
                </tr>
              ))}
            </tbody>
          </Table>
        )
      )}
    </React.Fragment>
  );
};

export default AdminOrdersScreen;
