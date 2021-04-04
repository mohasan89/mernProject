import React from "react";

import { Container, Col, Row } from "react-bootstrap";

const Footer = () => {
  return (
    <footer className="bg-dark text-white">
      <Container>
        <Row>
          <Col className="text-center py-3">Copyright &copy; Shop</Col>
        </Row>
        <Row>
          <Col className="text-center my-3 text-white">
            this is done my Mohamad Hasan, email:{"  "}
            <em>
              <a
                href="mailto:mo-hasan89@hotmail.com"
                style={{ textDecoration: "none", all: "unset", cursor: "pointer" }}
              >
                mo-hasan89@hotmail.com
              </a>
            </em>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
