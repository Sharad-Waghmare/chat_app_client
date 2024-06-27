import React, { useEffect, useRef } from 'react';
import { Container, Row, Col, Image, ListGroup } from 'react-bootstrap';
import Logout from './Logout';
import ChatInput from './ChatInput';
import { v4 as uuidv4 } from 'uuid';

const ChatContainer = ({ currentChat, currentUser, socket, messages, sendMessage }) => {
  const scrollRef = useRef();

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMsg = (msg) => {
    const messageData = {
      from: currentUser._id,
      to: currentChat._id,
      message: msg,
    };
    sendMessage(messageData);
    socket.current.emit('send-msg', messageData);
  };

  return (
    <>
      {currentChat && (
        <Container fluid className="d-flex flex-column h-100">
          <Row className="bg-dark text-white align-items-center p-3">
            <Col className="d-flex align-items-center">
              <Image src={`data:image/svg+xml;base64,${currentChat.avatar}`} roundedCircle height="40" />
              <h5 className="ms-3">{currentChat.username}</h5>
            </Col>
            <Col className="text-end">
              <Logout />
            </Col>
          </Row>
          <Row className="flex-grow-1 overflow-auto bg-secondary">
            <Col>
              <ListGroup className="h-100">
                {messages.map((message) => (
                  <ListGroup.Item
                    key={uuidv4()}
                    className={`d-flex ${message.fromSelf ? 'justify-content-end' : 'justify-content-start'}`}
                    ref={scrollRef}
                  >
                    <div className={`p-2 rounded ${message.fromSelf ? 'bg-primary text-white' : 'bg-light'}`}>
                      <p className="mb-0">{message.message}</p>
                    </div>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Col>
          </Row>
          <Row className="p-3 bg-dark text-white">
            <Col>
              <ChatInput handleSendMsg={handleSendMsg} />
            </Col>
          </Row>
        </Container>
      )}
    </>
  );
};

export default ChatContainer;
