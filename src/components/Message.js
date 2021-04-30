import React from "react";
import { Alert } from "react-bootstrap";

const Message = ({ message, variant = "danger" }) => {
  return (
    <Alert variant={variant}>
      <Alert.Heading>There was an issue...</Alert.Heading>
      <p>{message}</p>
    </Alert>
  );
};

export default Message;
