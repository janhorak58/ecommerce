import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Product from "../components/Product";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../actions/productActions";
import Loader from '../components/Loader'
import Message from '../components/Message'

function HomeScreen() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  const productList = useSelector((state) => state.productList);
  const { error, loading, products } = productList;
  return (
    <div>
      <h1 className="my-5">Latest Products</h1>
      {loading ? (
        <Loader/>
      ) : error ? (
        <Message message = {error}/>
      ) : (
        <Row>
          {products.map((product) => (
            <Col key={product._id} sm={12} md={6} lg={4} xl={4}>
              <Product product={product} />
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
}

export default HomeScreen;
