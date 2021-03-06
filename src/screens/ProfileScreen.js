import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Row, Col, ListGroup, Table } from "react-bootstrap";
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { updateUserProfile, getUserDetails, deleteUser } from "../actions/userActions";
import { USER_UPDATE_PROFILE_RESET } from "../constans/userConstants";
import { getMyOrders } from "../actions/orderActions";

function ProfileScreen({ history }) {
  const [firstname, setFirstname] = useState("");
  const [secondname, setSecondname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { error, loading, user } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success } = userUpdateProfile;

  const MyOrders = useSelector((state) => state.orderListMy);
  const { orders, loading: loadingOrders, error:errorOrders } = MyOrders;

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    } else {
      if (!user || !user.name || success || userInfo._id !== user._id) {
        dispatch({ type: USER_UPDATE_PROFILE_RESET });
        dispatch(getUserDetails("profile"));
        dispatch(getMyOrders());
      } else {
        const fullname = user.name.split(" ");
        setFirstname(fullname[0]);
        setSecondname(fullname[1]);
        setEmail(user.email);
      }
    }
  }, [history, userInfo, user, dispatch]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password != confirmPassword) {
      setMessage("The passwords are not the same...");
    } else {
      const name = firstname + " " + secondname;
      dispatch(
        updateUserProfile({
          id: user._id,
          name: name,
          email: email,
          password: password,
        })
      );
      setMessage("Succesfully Updated");
    }
  };

  return (
    <Row>
      <Col md={3}>
        <h2>User Profile</h2>
        {success && <Message variant="success">Succesfuly updated</Message>}
        {message && <Message variant="info">{message}</Message>}
        {error && <Message>{error}</Message>}
        {loading ? (
          <Loader></Loader>
        ) : (
          <Form onSubmit={submitHandler}>
            <Row>
              <Col>
                <Form.Group controlId="firstname">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your First Name"
                    value={firstname}
                    onChange={(e) => setFirstname(e.target.value)}
                  ></Form.Control>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId="secondname">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your Last Name"
                    value={secondname}
                    onChange={(e) => setSecondname(e.target.value)}
                  ></Form.Control>
                </Form.Group>
              </Col>
            </Row>
            <Form.Group controlId="email">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter your Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="confirmPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Retype your Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group>
              <Button className="btn btn-block" type="submit" variant="primary">
                Update
              </Button>
            </Form.Group>
          </Form>
        )}
      </Col>
      <Col md={9}>
        <h2>My Orders</h2>

        {loadingOrders ? (
          <Loader />
        ) : errorOrders ?
        (
          <Message>{errorOrders}</Message>
        ) :  (
          
            <Table striped responsive className="table-sm">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Date</th>
                  <th>Total</th>
                  <th>Paid</th>
                  <th>Delivered</th>
                </tr>
              </thead>
              <tbody>
              {orders && orders.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.createdAt.substring(0,10)}</td>
                  <td>$ {order.totalPrice}</td>
                  <td>{order.isPaid ? order.paidAt.substring(0,10) : (<i className="fas fa-times"></i>)}</td>
                  <td>{order.isDelivered ? order.deliveredAt.substring(0,10) : (<i className="fas fa-times"></i>)}</td>
                  <td><LinkContainer to={`/order/${order._id}`}><Button className="btn btn-sm">Details</Button></LinkContainer></td>

                </tr>
              ))}
              </tbody>
              
            </Table>
          
        )}
      </Col>
    </Row>
  );
}

export default ProfileScreen;
