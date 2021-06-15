import React, { useState, useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { getOrders, setDelivered } from "../actions/orderActions";

function OrderListScreen({ history }) {
  const dispatch = useDispatch();

  const orderList = useSelector((state) => state.orderList);
  const { loading, error, orders } = orderList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(getOrders());
    } else {
      history.push("/login");
    }
  }, [dispatch, history, userInfo]);

  const deliverHandler = async (id, delivered) => {
    console.log("deliver: ", id);
    await dispatch(setDelivered(id, delivered));
    await dispatch(getOrders());
  };
  return (
    <div>
      <h1>Orders</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message>{error}</Message>
      ) : (
        <Table striped responsive bordered hover className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>USER</th>
              <th>DATE</th>
              <th>PAID</th>
              <th>DELIVERED</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {orders.reverse().map((order) => (
              <tr key={order._id}>
                <th>{order._id}</th>
                <th>{order.user && order.user.name}</th>
                <th>{order.createdAt.substring(0,10)}</th>
                <th>
                  {order.isPaid ? (
                    order.paidAt.substring(0,10)
                  ) : (
                    <i className="fas fa-times"></i>
                  )}
                </th>

                <th>
                  {order.isDelivered ? (
                    order.deliveredAt.substring(0,10)
                  ) : (
                    <i className="fas fa-times"></i>
                  )}
                </th>
                <th>
                  <LinkContainer className="mx-2" to={`/order/${order._id}`}>
                    <Button variant="light" className="btn-sm">
                      <i className="fas fa-edit"></i>
                    </Button>
                  </LinkContainer>

                  {order.isDelivered ? (<Button
                    variant="danger"
                    className="btn-sm"
                    onClick={() => deliverHandler(order._id, false)}

                  >
                    <i className="fas fa-times"></i>
                  </Button>):(
                      <Button
                      
                      variant="success"
                      className="btn-sm"
                      onClick={() => deliverHandler(order._id, true)}
                    >
                      <i className="fas fa-check"></i>
                    </Button>)
                  }
                </th>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
}

export default OrderListScreen;
