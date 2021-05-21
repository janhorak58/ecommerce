import React, { useState, useEffect } from "react";
import {
  Col,
  Row,
  Container,
  ListGroup,
  Image,
  Card,
  Button,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CheckoutSteps from "../components/CheckoutSteps";
import Message from "../components/Message";
import { createOrder } from '../actions/orderActions'
import { ORDER_CREATE_RESET } from '../constans/orderConstants'

function PlaceOrderScreen({ history }) {

  const orderCreate = useSelector(state => state.orderCreate)
  const { order, error, success} = orderCreate

  const dispatch = useDispatch()
  const cart = useSelector((state) => state.cart);
  const { shippingAddress, cartItems, paymentMethod } = cart;

  if (cartItems.length == 0) {
    history.push("/");
  }
  if (shippingAddress.address === "") {
    history.push("/shipping");
  }
  

  if (paymentMethod === "") {
    history.push("/payment");
  }

  const ItemsPrice = cartItems
    .reduce((acc, item) => acc + Number(item.qty) * Number(item.price), 0)
    .toFixed(2);

  const shippingPrice = ItemsPrice > 200 ? 0 : (7).toFixed(2);
  const taxPrice = (ItemsPrice * 0.082).toFixed(2);
  const totalPrice = (
    Number(ItemsPrice) +
    Number(shippingPrice) +
    Number(taxPrice)
  ).toFixed(2);


  useEffect(() => {
    if (success) {
      history.push(`/order/${order._id}`)
      dispatch({type: ORDER_CREATE_RESET})
    }
  }, [success, history, dispatch])

  const placeOrderHandler = (e) => {
    dispatch(createOrder({
      orderItems:cart.cartItems,
      shippingAddress:cart.shippingAddress,
      paymentMethod:cart.paymentMethod,
      itemsPrice:cart.ItemsPrice,
      shippingPrice:shippingPrice,
      taxPrice:taxPrice,
      totalPrice: totalPrice,
    }))
      history.push("/placeorder")
    
  };
  return (
    <Container>
      <CheckoutSteps step1 step2 step3 step4 />
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping</h2>

              <p>
                Address: {shippingAddress.address}, {shippingAddress.city},{" "}
                {shippingAddress.postalCode}, {shippingAddress.country}
              </p>
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Payment</h2>
              <p>{paymentMethod}</p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Order Items</h2>
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
                      <Col md={6}>
                        <p>{p.name}</p>
                      </Col>
                      <Col md={4}> {p.price} x {p.qty} = <strong>$ {(p.price * p.qty).toFixed(2)}</strong></Col>
                    </Row>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Header>
              <h2>Order Summary</h2>
            </Card.Header>

            <ListGroup variant="flush">
              <ListGroup.Item>
                <Row>
                  <Col>Items Price:</Col>

                  <Col>
                    <strong>$ {ItemsPrice}</strong>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping Price:</Col>

                  <Col>
                    <strong>$ {shippingPrice}</strong>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax Price:</Col>

                  <Col>
                    <strong>$ {taxPrice}</strong>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total Price:</Col>

                  <Col>
                    <strong>$ {totalPrice}</strong>
                  </Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                {error && 
                  <Message>{error}</Message> 
                } 
              </ListGroup.Item> 

              <ListGroup.Item>
                <Row>
                  <Button
                    variant="primary"
                    type="button"
                    className="btn btn-block"
                    onClick={placeOrderHandler}
                  >
                    Place Order
                  </Button>
                </Row>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default PlaceOrderScreen;
