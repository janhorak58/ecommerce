import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Row,
  Col,
  ListGroup,
  Image,
  Form,
  Button,
  Card,
} from "react-bootstrap";
import Message from "../components/Message";

import Loader  from "../components/Loader";
import { addToCart, removeFromCart } from "../actions/cartActions";

function CartScreen({ match, location, history }) {
  const productId = match.params.id;
  const qty = location.search ? Number(location.search.split("=")[1]) : 1;

  const dispatch = useDispatch();

  const cart = useSelector((state, history) => state.cart);
  const { cartItems } = cart;
  console.log("cartItems: ", cartItems);
  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id))
  };

  const checkoutHandler = () => {
    history.push(`/login?redirect=shipping`);

  }
  return (
    <Row>
      <Col md={8}>
        <h1 className="my-5">Shopping Cart</h1>
        {cartItems.length < 1 ? (
          <Message variant="info">
            {" "}
            You have no product in the cart <Link to="/">Go Shopping</Link>{" "}
          </Message>
        ) : (
          <ListGroup variant="flush">
            {cartItems.map((p) => (
              <ListGroup.Item key={p.product}>
                <Row>
                  <Col md={2}>
                    <Image
                      src={p.image}
                      alt={p.name}
                      rounded
                      className="img-fluid"
                    />
                  </Col>
                  <Col md={4}>
                    <Link to={`/product/${p.product}`}>{p.name}</Link>
                  </Col>
                  <Col md={2}>$ {p.price}</Col>
                  <Col md={2} xs="auto">
                    <Form.Control
                      as="select"
                      value={p.qty}
                      onChange={(e) =>
                        dispatch(addToCart(p.product, Number(e.target.value)))
                      }
                    >
                      {[...Array(p.countInStock).keys()].map((x) => (
                        <option value={x + 1} key={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </Form.Control>
                  </Col>
                  <Col md={1}>
                    <Button
                      type="button"
                      variant="light"
                      onClick={() => removeFromCartHandler(p.product)}
                    >
                      <i className="fas fa-trash"></i>
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>
      <Col md={4}>
        <Card className="my-5">
          <ListGroup variant="flash">
            {/* <ListGroup.Item>
                    <h2>SubTotal: {cartItems.reduce((acc, item) => acc + Number(item.qty), 0)} Items</h2>
                </ListGroup.Item> */}
            <ListGroup.Item>
              <h2>
                SubTotal: ${" "}
                {cartItems
                  .reduce(
                    (acc, item) => acc + Number(item.qty) * Number(item.price),
                    0
                  )
                  .toFixed(2)}
              </h2>
            </ListGroup.Item>
          </ListGroup>
          <ListGroup variant="flash">
            <Button
              className="btn btn-block btn-dark my-2"
              disabled={cartItems.length === 0}
              onClick = {checkoutHandler}
            
            >
              Proceed To Checkout
            </Button>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  );
}

export default CartScreen;
