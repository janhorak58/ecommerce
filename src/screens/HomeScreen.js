import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import products from "../products";
import Product from "../components/Product";

function HomeScreen() {
  return (
    <div>
      <h1 className="my-5">Latest Products</h1>
      <Row>
        {products.map((product) => (
          <Col key={product._id} sm={12} md={6} lg={4} xl={4}>
            <Product product={product} />
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default HomeScreen;
