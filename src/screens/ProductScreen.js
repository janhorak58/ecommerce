import React from "react";
import { Link } from "react-router-dom";
import { Row, Col, Image, ListGroup, Button, Card } from "react-bootstrap";
import Rating from "../components/Rating";
import products from "../products";

const ProductScreen = ({ match }) => {
  const product = products.find((p) => p._id == match.params.id);
  return (
    <div>
      <Link to="/" className="btn btn-outline-dark my-3">
        Go Back
      </Link>
      <Row>
        <Col md={6}>
          <Image src={product.image} alt={`${product.name} Image`} fluid />
        </Col>
        <Col md={3}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h3>{product.name}</h3>
            </ListGroup.Item>

            <ListGroup.Item>
              <Rating
                value={product.rating}
                text={`${product.numReviews} Reviews`}
                color={"#f8e825"}
              />
            </ListGroup.Item>

            <ListGroup.Item>{product.description}</ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={3}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <Row>
                  <Col>Price:</Col>

                  <Col>
                    <strong>$ {product.price}</strong>
                  </Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Status:</Col>

                  <Col>
                    {product.countInStock > 0
                      ? `${product.countInStock} In Stock`
                      : "Out of stock"}
                  </Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Button
                    className="btn-block btn-dark"
                    disabled={product.countInStock < 1}
                    type="Button"
                  >
                    Add to Cart
                  </Button>
                </Row>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default ProductScreen;
