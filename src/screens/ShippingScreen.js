import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/FormContainer";
import CheckoutSteps from "../components/CheckoutSteps";
import { saveShippingAddress } from '../actions/cartActions'

function ShippingScreen({ history }) {

  const cart = useSelector(state => state.cart)
  const { shippingAddress } = cart

  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
  const [country, setCountry] = useState(shippingAddress.country);


  const dispatch = useDispatch()

  function submitHandler(e) {
    e.preventDefault()
    dispatch(saveShippingAddress({
      address, 
      city, 
      postalCode, 
      country
    }))
    history.push("/payment")
  }

  return (
    <FormContainer>
      <CheckoutSteps step1 step2  />
      <Form onSubmit={submitHandler}>
        <h1>Shipping Screen</h1>

        <Form.Group controlId="address">
          <Form.Label>Address</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Enter your Address"
            value={address ? address : ""}
            onChange={(e) => setAddress(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="city">
          <Form.Label>City</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Enter your City"
            value={city ? city : ""}
            onChange={(e) => setCity(e.target.value)}
          ></Form.Control>
        </Form.Group>

        

        <Form.Group controlId="postalCode">
          <Form.Label>PostalCode</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Enter your Postal Code"
            value={postalCode ? postalCode : ""}
            onChange={(e) => setPostalCode(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="country">
          <Form.Label>Country</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Enter your Country"
            value={country ? country : ""}
            onChange={(e) => setCountry(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Button type="submit" variant= "primary" className= "btn btn-block">
            Continue
        </Button>
      </Form>
    </FormContainer>
  );
}

export default ShippingScreen;
