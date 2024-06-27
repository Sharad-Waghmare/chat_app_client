import React, { useEffect, useState } from 'react';
import { Container, Row, Col, ListGroup, Image } from 'react-bootstrap';

const Contacts = ({ contacts, currentUser, changeChat }) => {
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentUserImage, setCurrentUserImage] = useState(undefined);
  const [currentSelected, setCurrentSelected] = useState(undefined);

  useEffect(() => {
    if (currentUser) {
      setCurrentUserImage(currentUser.avatar);
      setCurrentUserName(currentUser.username);
    }
  }, [currentUser]);

  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index);
    changeChat(contact);
  };

  return (
    <>
      {currentUserImage && currentUserName && (
        <Container fluid className="bg-dark text-white h-100">
          <Row className="align-items-center py-3">
            <Col className="text-center">
              <h3>WhatsApp</h3>
            </Col>
          </Row>
          <Row className="overflow-auto flex-grow-1">
            <ListGroup className="w-100">
              {contacts?.map((contact, index) => (
                <ListGroup.Item
                  action
                  key={index}
                  className={`d-flex align-items-center ${index === currentSelected ? "bg-primary text-white" : "bg-dark text-white"}`}
                  onClick={() => changeCurrentChat(index, contact)}
                >
                  <Image src={`data:image/svg+xml;base64,${contact.avatar}`} roundedCircle height="40" />
                  <h5 className="ms-3">{contact.username}</h5>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Row>
          <Row className="py-3 bg-secondary">
            <Col className="d-flex align-items-center justify-content-center">
              <Image src={`data:image/svg+xml;base64,${currentUserImage}`} roundedCircle height="50" />
              <h4 className="ms-3">{currentUserName}</h4>
            </Col>
          </Row>
        </Container>
      )}
    </>
  );
};

export default Contacts;
