import React, { useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";

const SearchBox = ({ history }) => {
  const [keyword, setKeyword] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      history.push(`/search/${keyword}`);
    } else {
      history.push("/");
    }
  };
  return (
    <Form onSubmit={submitHandler}>
      <Row className="d-flex justify-content-between my-sm-3 my-3">
        <Col xs={9} md={10}>
          <Form.Control
            type="text"
            name="q"
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="search in products ... "
            className="mr-md-2 mr-sm-1 w-100"
          />
        </Col>
        <Col xs={3} md={2} className="text-right">
          <Button type="submit" variant="outline-success" className="px-3 btn">
            Search
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default SearchBox;
