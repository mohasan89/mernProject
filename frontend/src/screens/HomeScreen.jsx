import React, { useEffect } from "react";

import Product from "../components/Product";
import { Row, Col, Pagination } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../store/actions/productsActions";
import { LinkContainer } from "react-router-bootstrap";

import Loader from "../components/Loader";
import Message from "../components/Message";
import Carousel from "../components/Carousel";

const HomeScreen = ({ match }) => {
  const keyword = match.params.keyword;
  const page = Number(match.params.numpage) || 1;
  const dispatch = useDispatch();

  const productList = useSelector((state) => state.products);
  const { loading, products, error, page: linkPage, pages } = productList;
  useEffect(() => {
    dispatch(listProducts(keyword, page));
  }, [dispatch, keyword, page, linkPage, pages]);
  return (
    <React.Fragment>
      {!match.params.numpage && !keyword ? <Carousel /> : null}
      <h1>Latest Products</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <React.Fragment>
          <Row>
            {products.map((product) => {
              return (
                <Col sm={12} md={6} lg={4} xl={3} key={product._id}>
                  <Product product={product} />
                </Col>
              );
            })}
          </Row>
          <Row className="my-5 mx-1">
            {pages > 1 && (
              <Pagination>
                <LinkContainer
                  to={
                    keyword && linkPage >= 0
                      ? `/search/${keyword}/page/${linkPage - 1}`
                      : `/page/${linkPage - 1}`
                  }
                >
                  <Pagination.Prev disabled={linkPage === 1 || !linkPage} />
                </LinkContainer>
                {[...Array(pages).keys()].map((p) => (
                  <LinkContainer
                    to={keyword ? `/search/${keyword}/page/${p + 1}` : `/page/${p + 1}`}
                  >
                    {p + 1 === page ? (
                      <Pagination.Item active>{p + 1}</Pagination.Item>
                    ) : (
                      <Pagination.Item>{p + 1}</Pagination.Item>
                    )}
                  </LinkContainer>
                ))}
                <LinkContainer
                  to={
                    keyword && linkPage <= pages
                      ? `/search/${keyword}/page/${linkPage + 1}`
                      : `/page/${linkPage + 1}`
                  }
                >
                  <Pagination.Next disabled={linkPage === pages} />
                </LinkContainer>
              </Pagination>
            )}
          </Row>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default HomeScreen;
