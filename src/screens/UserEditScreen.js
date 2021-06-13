import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import FormContainer from "../components/FormContainer";
import { getUserDetails, updateUser } from "../actions/userActions";
import { USER_DETAILS_RESET, USER_UPDATE_RESET } from "../constans/userConstants";

function UserEditScreen({ match, history }) {
  const userId = match.params.id;


  


  const [firstname, setFirstname] = useState("");
  const [secondname, setSecondname] = useState("");
  const [isAdmin, setIsAdmin] = useState(false)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();


  const userDetails = useSelector((state) => state.userDetails);
  const { error, loading, user } = userDetails;

  const userUpdate = useSelector((state) => state.userUpdate);
  const { error:errorUpdate, loading:loadingUpdate, success } = userUpdate;
 
   useEffect( () => {

    if (success) {
        dispatch({type:USER_UPDATE_RESET})
        history.push("/admin/userlist")
    } else {
       if (!user.name || user._id !== Number(userId)) {

       dispatch(getUserDetails(userId))
    } else {
        setFirstname(user.name.split(" ")[0])
        setSecondname(user.name.split(" ")[1])
        setIsAdmin(user.isAdmin)
        setEmail(user.email)
    }
}
  }, [dispatch, user, userId, history, success]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password != confirmPassword) {
      setMessage("The passwords are not the same...");
    } else {
      const name = firstname + " " + secondname;
      dispatch(updateUser({_id: user._id, name, email, password, isAdmin}))
    }
  };

  return (
    <div>
        <Link to="/admin/userlist">
        Go Back
        </Link>
      <FormContainer>
        <h1>Edit User</h1>
        {message && <Message>{message}</Message>}
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
            <Form.Group controlId="isadmin">
              <Form.Check
                label="Is Admin"
                type="checkbox"
                placeholder="Is Admin?"
                checked = {isAdmin}
                onChange={(e) => setIsAdmin(e.target.checked)}
              ></Form.Check>
            </Form.Group>
            <Form.Group>
              <Button className="btn btn-block" type="submit" variant="primary">
                Update
              </Button>
            </Form.Group>
          </Form>
        )}
      </FormContainer>
    </div>
  );
}

export default UserEditScreen;
