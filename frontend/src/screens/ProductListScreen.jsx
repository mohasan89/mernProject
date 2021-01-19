import React, { useEffect, useState } from "react";
import { Button, Table, Row, Col, Pagination } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import {
  listProducts,
  deleteProduct,
  createProduct,
  editProduct,
} from "../store/actions/productsActions";
import CreateModal from "../components/CreateProductModal";
import {
  PRODCUT_CREATE_RESET,
  PRODCUT_DELETE_RESET,
  PRODCUT_EDIT_RESET,
} from "../store/constants/productConstraints";
import { LinkContainer } from "react-router-bootstrap";

const UserListScreen = ({ history, match }) => {
  const dispatch = useDispatch();
  const page = Number(match.params.page) || 1;

  const [showMoadal, setShowModal] = useState(false);
  const [showEditMoadal, setEditShowModal] = useState(false);
  const [productEditing, setproductEditing] = useState({});

  const { loading, products, pages, page: linkPage, error } = useSelector(
    (state) => state.products
  );

  const { loading: deleteLoading, success: deleteSuccess, error: deleteError } = useSelector(
    (state) => state.productDelete
  );
  const { success: editSuccess, error: editError, loading: editLoading } = useSelector(
    (state) => state.productEdit
  );

  const { loading: creatingLoading, success: creatingSuccess, error: creatingError } = useSelector(
    (state) => state.productCreate
  );

  const { user } = useSelector((state) => state.user);

  const deleteHandler = (id) => {
    if (window.confirm("are you show you want to delete the user")) {
      dispatch({ type: PRODCUT_CREATE_RESET });
      dispatch(deleteProduct(id));
    }
  };

  useEffect(() => {
    if (user.isAdmin) {
      if (products.length === 0 || deleteSuccess || creatingSuccess || editSuccess) {
        dispatch(listProducts("", page));
      } else if (page !== linkPage) {
        console.log("heoll");
        dispatch(listProducts("", page));
      }
    } else {
      history.push("/login");
    }
    if (editLoading || deleteLoading || creatingLoading) {
      dispatch({ type: PRODCUT_CREATE_RESET });
      dispatch({ type: PRODCUT_EDIT_RESET });
      dispatch({ type: PRODCUT_DELETE_RESET });
    }
    // eslint-disable-next-line
  }, [
    history,
    deleteSuccess,
    creatingSuccess,
    editSuccess,
    editLoading,
    creatingLoading,
    deleteLoading,
    page,
    linkPage,
  ]);

  const createProductHandle = () => {
    setShowModal(true);
  };

  const onSubmitHandler = (data) => {
    dispatch(createProduct(data));
    setShowModal(false);
  };

  const onCloseHandler = () => {
    setShowModal(false);
  };

  const onEditSubmitHandler = (id, data) => {
    dispatch(editProduct(id, data));
    setEditShowModal(false);
  };

  const onEditCloseHandler = () => {
    setEditShowModal(false);
  };

  const onEditShowHandler = (product) => {
    setproductEditing(product);
    setEditShowModal(true);
  };

  return (
    <React.Fragment>
      <CreateModal show={showMoadal} onSubmit={onSubmitHandler} onHide={onCloseHandler} />
      <CreateModal
        product={productEditing}
        show={showEditMoadal}
        onSubmit={onEditSubmitHandler}
        onHide={onEditCloseHandler}
      />
      <Row className="align-items-center">
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className="text-right">
          <Button className="my-3 bg-dark border-dark" onClick={createProductHandle}>
            <i className="fas fa-plus" /> Create product
          </Button>
        </Col>
      </Row>
      {(loading || deleteLoading || creatingLoading) && <Loader />}
      {(error || deleteError || creatingError || editError) && (
        <Message variant="danger">{error || deleteError || creatingError || editError}</Message>
      )}
      {deleteSuccess && <Message variant="success">Product Deleted</Message>}
      {creatingSuccess && <Message variant="success">Product Created</Message>}
      {editSuccess && <Message variant="success">Product Updated</Message>}

      {products && (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <td>ID</td>
              <td>Name</td>
              <td>PRICE</td>
              <td>CATEGORY</td>
              <td>BRAND</td>
              <td></td>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td>{product._id}</td>
                <td>{product.name}</td>
                <td>${product.Price.toFixed(2)}</td>
                <td>{product.categroy}</td>
                <td>{product.brand}</td>
                <td>
                  <Button
                    variant="light"
                    className="btn-sm"
                    onClick={() => {
                      onEditShowHandler(product);
                    }}
                  >
                    <i className="fas fa-edit"></i>
                  </Button>
                  <Button
                    variant="danger"
                    className="btn-sm"
                    onClick={() => deleteHandler(product._id)}
                  >
                    <i className="fas fa-trash"></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
      <Row className="my-5 mx-1">
        {pages > 1 && (
          <Pagination>
            <LinkContainer to={`/admin/products/page/${linkPage - 1}`}>
              <Pagination.Prev disabled={linkPage === 1 || !linkPage} />
            </LinkContainer>
            {[...Array(pages).keys()].map((p) => (
              <LinkContainer to={`/admin/products/page/${p + 1}`}>
                {p + 1 === page ? (
                  <Pagination.Item active>{p + 1}</Pagination.Item>
                ) : (
                  <Pagination.Item>{p + 1}</Pagination.Item>
                )}
              </LinkContainer>
            ))}
            <LinkContainer to={`/admin/products/page/${linkPage + 1}`}>
              <Pagination.Next disabled={linkPage === pages} />
            </LinkContainer>
          </Pagination>
        )}
      </Row>
    </React.Fragment>
  );
};

export default UserListScreen;
