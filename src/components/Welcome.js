import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Welcome = ({ currentUser }) => {
  return (
    <Container className="text-center text-white py-5">
      <Row>
        <Col>
          <h1>Welcome, <span className="text-primary">{currentUser.username}</span></h1>
          <h3>Please select a chat to start messaging</h3>
        </Col>
      </Row>
    </Container>
  );
};

export default Welcome;
