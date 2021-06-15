import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import FormContainer from "../components/FormContainer";
import { listProductDetails, createProduct } from "../actions/productActions";
import {  PRODUCT_CREATE_RESET } from "../constans/productConstants";

function ProductEditScreen({ history }) {


  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [brand, setBrand] = useState("")
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [countInStock, setCountInStock] = useState("");
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();


  const productCreate = useSelector((state) => state.productCreate);
  const { error, loading, success } = productCreate;
 
  useEffect( () => {

    if (success) {
        dispatch({type:PRODUCT_CREATE_RESET})
        history.push("/admin/productlist")
    }

  }, [dispatch, history, success]);

  const submitHandler = (e) => {
    e.preventDefault();
    
       dispatch(createProduct({
        name,
        image,
        brand,
        category,
        description,
        price,
        countInStock,
    }))
  };

  return (
    <div>
        <Link to="/admin/productlist">
        Go Back
        </Link>
      <FormContainer>
        <h1>Create Product</h1>
        {message && <Message>{message}</Message>}
        {error && <Message>{error}</Message>}
        {loading ? (
          <Loader></Loader>
        ) : (
          <Form onSubmit={submitHandler}>
           
            <Form.Group controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control
                type="text"
                placeholder="Enter Name of the product"
                value={name}
                onChange={(e) => setName(e.target.value)}
                ></Form.Control>
            </Form.Group>

            <Form.Group controlId="brand">
                <Form.Label>Brand</Form.Label>
                <Form.Control
                type="text"
                placeholder="Enter Brand"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                ></Form.Control>
            </Form.Group>

            <Form.Group controlId="category">
                <Form.Label>Category</Form.Label>
                <Form.Control
                type="text"
                placeholder="Enter Category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                ></Form.Control>
            </Form.Group>
            
            <Form.Group controlId="description">
                <Form.Label>Description</Form.Label>
                <Form.Control
                type="text"
                placeholder="Enter Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                ></Form.Control>
            </Form.Group>

            <Form.Group controlId="image">
                <Form.Label>Image</Form.Label>
                <Form.File
                type="image"
                placeholder="Choose image"
                filename={image}

                onChange={(e) => setImage(e.target.value)}
                ></Form.File>
            </Form.Group>

            <Form.Group controlId="price">
                <Form.Label>Price</Form.Label>
                <Form.Control
                type="text"
                placeholder="Enter Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                ></Form.Control>
            </Form.Group>
              
            <Form.Group controlId="countInStock">
                <Form.Label>Count In Stock</Form.Label>
                <Form.Control
                type="slider"
                placeholder="Enter Count In Stock"
                value={countInStock}
                onChange={(e) => setCountInStock(e.target.value)}
                ></Form.Control>
            </Form.Group>
         
         
             
            <Form.Group>
              <Button className="btn btn-block" type="submit" variant="primary">
                Create 
              </Button>
            </Form.Group>
          </Form>
        )}
      </FormContainer>
    </div>
  );
}

export default ProductEditScreen;
