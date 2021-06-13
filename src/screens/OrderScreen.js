

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
import { PayPalButton } from 'react-paypal-button-v2'
import Message from "../components/Message";
import Loader from "../components/Loader";
import {getOrderDetails, payOrder} from '../actions/orderActions'
import { ORDER_PAY_RESET } from '../constans/orderConstants'



function OrderScreen({ history, match }) {
    const orderId = match.params.orderId

  const Order = useSelector(state => state.orderDetails)
  const { order, error, loading} = Order

  const OrderPay = useSelector(state => state.orderPay)
  const { success:successPay, loading:loadingPay} = OrderPay

  const dispatch = useDispatch()

  const [sdkReady, setSdkReady] = useState(false)



  if (!loading && !error && order) {
    order.ItemsPrice = order.orderItems
    .reduce((acc, item) => acc + Number(item.qty) * Number(item.price), 0)
    .toFixed(2);
  }
  

  


  // AQ_AT9zuLm11UvP0rScg_IrXPGQLpEiM4ABqyRnZBPswC7p8PTlgOGgHKohl1QDaP1eGu-4Gm66Ob9F2


  const addPayPalScript = () => {
    const script = document.createElement("script")
    script.type = "text/javascript"
    script.src = "https://www.paypal.com/sdk/js?client-id=AQ_AT9zuLm11UvP0rScg_IrXPGQLpEiM4ABqyRnZBPswC7p8PTlgOGgHKohl1QDaP1eGu-4Gm66Ob9F2"
    script.async = true
    script.unload = () => {
      setSdkReady(true)
    }
    document.body.appendChild(script)
  }


  useEffect(() => {
    if (!order || successPay || order._id!==Number(orderId)) {
      dispatch({type: ORDER_PAY_RESET})

    dispatch(getOrderDetails(orderId))
} else if (!order.isPaid) {
  if (!window.paypal) {
    addPayPalScript()
  } else {
    setSdkReady(true)
  }
}

  }, [order, orderId, dispatch, successPay] )

  const successPaymentHandler = (paymentResult) => {
    dispatch(payOrder(orderId, paymentResult))

  }
  const placeOrderHandler = (e) => {
      history.push("/placeorder")
    
  };
  return loading || !order ? (<Loader/>) : error ? (<Message>{error}</Message>) : (

    <Container>
        <h1> Order: {orderId}</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h2>Shipping</h2>
                <p><strong>Name: </strong>{order.user.name}</p>
                <p><strong>Email: </strong><a href= {`mailto:${order.user.email}`}>{order.user.email}</a></p>
              <p>
                Address: {order && order.shippingAddress.address}, {order && order.shippingAddress.city},{" "}
                {order && order.shippingAddress.postalCode}, {order && order.shippingAddress.country}
              </p>

              {order.isDelivered ? (<Message variant = "success">Order was succesfully delivered on {order.deliveredAt}</Message>) : (<Message variant = "warning">Order wasn't delivered yet</Message>)}

            </ListGroup.Item>


            <ListGroup.Item>
              <h2>Payment</h2>

              <p>{order && order.paymentMethod}</p>
              {order.isPaid ? (<Message variant = "success">Order was succesfully paid on {order.paidAt}</Message>) : (<Message variant = "warning">Order wasn't paid yet</Message>)}
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Order Items</h2>
              <ListGroup variant="flush">
                {order && order.orderItems.map((p) => (
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
                    <strong>$ {order && order.ItemsPrice}</strong>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping Price:</Col>

                  <Col>
                    <strong>$ { order && order.shippingPrice}</strong>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax Price:</Col>

                  <Col>
                    <strong>$ {order && order.taxPrice}</strong>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total Price:</Col>

                  <Col>
                    <strong>$ {order && order.totalPrice}</strong>
                  </Col>
                </Row>
              </ListGroup.Item>

             { !order || !order.isPaid && (
               <ListGroup.Item>
                 {loadingPay && <Loader/>}
                 {!sdkReady ? (
                   <Loader/>
                 ) : (
                  <PayPalButton
                  amount={order.totalPrice}
                  onSuccess = {successPaymentHandler}
                  />
                 )}
               </ListGroup.Item>
             )}

              <ListGroup.Item>
                {error && 
                  <Message>{error}</Message> 
                } 
                {
                    loading && <Loader/>
                }
              </ListGroup.Item> 

            </ListGroup>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
export default OrderScreen

