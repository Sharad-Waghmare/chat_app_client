import React, { useState } from 'react';
import { Form, InputGroup, Button } from 'react-bootstrap';
import Picker from 'emoji-picker-react';
import { IoMdSend } from "react-icons/io";
import { BsEmojiSmileFill } from 'react-icons/bs';

const ChatInput = ({ handleSendMsg }) => {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [msg, setMsg] = useState('');

  const handleEmojiPickerhideShow = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  const handleEmojiClick = (event, emojiObject) => {
    const emoji = emojiObject.emoji;
    setMsg(prevMsg => prevMsg + emoji);
  };

  const sendChat = (event) => {
    event.preventDefault();
    if (msg.length > 0) {
      handleSendMsg(msg);
      setMsg('');
    }
  };

  return (
    <div className="d-flex align-items-center p-3 bg-dark text-white">
      <Button variant="link" onClick={handleEmojiPickerhideShow}>
        <BsEmojiSmileFill size="1.5em" color="#ffff00c8" />
      </Button>
      {showEmojiPicker && <Picker onEmojiClick={handleEmojiClick} />}
      <Form className="flex-grow-1 d-flex" onSubmit={sendChat}>
        <Form.Control
          type="text"
          placeholder="Type your message here"
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
          className="me-2"
        />
        <Button type="submit" variant="primary">
          <IoMdSend size="1.5em" />
        </Button>
      </Form>
    </div>
  );
};

export default ChatInput;
