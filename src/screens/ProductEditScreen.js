import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import FormContainer from "../components/FormContainer";
import { listProductDetails, updateProduct } from "../actions/productActions";
import {  PRODUCT_UPDATE_RESET } from "../constans/productConstants";
import axios from 'axios'
function ProductEditScreen({ match, history }) {
  const productId = match.params.id;


  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [brand, setBrand] = useState("")
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [countInStock, setCountInStock] = useState(0);
  const [uploading, setUploading] = useState(false);

  const dispatch = useDispatch();


  const productDetails = useSelector((state) => state.productDetails);
  const { error, loading, product } = productDetails;

  const productUpdate = useSelector((state) => state.productUpdate);
  const { error:errorUpdate, loading:loadingUpdate, success } = productUpdate;
 
   useEffect( () => {

    if (success) {
        dispatch({type:PRODUCT_UPDATE_RESET})
        history.push("/admin/productlist")
    } else 
       if (!product || !product.name || product._id !== Number(productId)) {

       dispatch(listProductDetails(productId))
    } else {
        setName(product.name)
        setImage(product.image)
        setBrand(product.brand)
        setImage(product.image)
        setCategory(product.category)
        setDescription(product.description)
        setPrice(product.price)
        setCountInStock(product.countInStock)
}
  }, [dispatch, product, productId, history, success]);

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0]
    const formData = new FormData()
    formData.append("image",file)
    formData.append("product_id",productId)
    setUploading(true)
    try {
        const config = {
            headers: {
                'Content-Type':"multipart/form-data"
            }

        }

        const {data} = await axios.post('/api/products/upload/', formData, config)
        setImage(data)
        setUploading(false)

    }
    catch(error) {
        setUploading(false)

    }

  }

  const submitHandler = (e) => {
    e.preventDefault();
    
       dispatch(updateProduct({_id: product._id,
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
        <h1>Edit Product</h1>
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
                
                <Form.Control
                type="text"
                placeholder={image}
                value={image}
                disabled
                
                ></Form.Control>
                <Form.File
                id="image-file"
                label="Choose Image"
                custom 
                onChange = {(e) => uploadFileHandler(e)}
                >

                </Form.File>
                {uploading && <Loader/>}
            </Form.Group>

            <Form.Group controlId="price">
                <Form.Label>Price</Form.Label>
                <Form.Control
                type="number"
                placeholder="Enter Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                ></Form.Control>
            </Form.Group>
              
            <Form.Group controlId="countInStock">
                <Form.Label>Count In Stock</Form.Label>
                <Form.Control
                type="number"
                placeholder="Enter Count In Stock"
                value={countInStock}
                onChange={(e) => setCountInStock(e.target.value)}
                ></Form.Control>
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

export default ProductEditScreen;
