import React, { useState, useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { listProducts, deleteProduct, createProduct } from "../actions/productActions";

function ProductListScreen({ history }) {
  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin ) {
      dispatch(listProducts());
    } else {
      history.push("/login");
    }
  }, [dispatch, history, userInfo]);

  const deleteHandler = async (id) => {
    console.log("delete: ", id);
    await dispatch(deleteProduct(id));
    await dispatch(listProducts());
  };
  return (
    <div>
      <Row>
        <Col md={9}>
      <h1>Products</h1>
        </Col>
        <Col md={3}>
          <LinkContainer to="/admin/products/create">
          <Button variant="success mt-4">Create New Product</Button>
          </LinkContainer>
        </Col>
      </Row>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message>{error}</Message>
      ) : (
        <Table striped responsive bordered hover className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>IMAGE</th>
              <th>NAME</th>
              <th>BRAND</th>
              <th>CATEGORY</th>
              <th>PRICE</th>
              <th>COUNT IN STOCK</th>
              <th>CREATED AT</th>


              <th></th>
            </tr>
          </thead>
          <tbody>
            {products && products.map((product) => (
              <tr key={product._id}>
                <th>{product._id}</th>
                <th><img src={product.image} className="img-fluid" style={{"height":"5rem"}}/></th>
                <th>{product.name}</th>
                <th>{product.brand}</th>
                <th>{product.category}</th>
                <th>{product.price}</th>
                <th>{product.countInStock}</th>
                <th>{product.createdAt.substring(0,10)}</th>
               
                <th>
                  <LinkContainer className="mx-2" to={`/admin/product/${product._id}`}>
                    <Button variant="light" className="btn-sm">
                      <i className="fas fa-edit"></i>
                    </Button>
                  </LinkContainer>

                  <Button
                    variant="danger"
                    className="btn-sm"
                    onClick={() => deleteHandler(product._id)}
                  >
                    <i className="fas fa-trash"></i>
                  </Button>
                </th>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
}

export default ProductListScreen;
