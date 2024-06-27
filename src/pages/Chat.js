import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { io } from 'socket.io-client';
import axios from 'axios';
import { allUsersRoute, host } from '../utils/APIRoutes';
import Contacts from '../components/Contacts';
import Welcome from '../components/Welcome';
import ChatContainer from '../components/ChatContainer';
import { fetchMessages, receiveMessage, sendMessage } from '../store/Message/Action';
import 'bootstrap/dist/css/bootstrap.min.css';

const Chat = () => {
  const socket = useRef();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [contacts, setContacts] = useState([]);
  const [currentChat, setCurrentChat] = useState(undefined);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [isLoaded, setIsLoaded] = useState(false);

  const messagesState = useSelector((state) => state.message);
  console.log(messagesState)

  useEffect(() => {
    async function fetchData() {
      if (!localStorage.getItem('chat-app-user')) {
        navigate('/login');
      } else {
        setCurrentUser(await JSON.parse(localStorage.getItem('chat-app-user')));
        setIsLoaded(true);
      }
    }
    fetchData();
  }, [navigate]);

  useEffect(() => {
    if (currentUser) {
      socket.current = io(host);
      socket.current.emit('add-user', currentUser._id);
    }
  }, [currentUser]);

  useEffect(() => {
    const fetchUserData = async () => {
      if (currentUser) {
        if (currentUser.isAvatarImageSet) {
          const data = await axios.get(`${allUsersRoute}/${currentUser._id}`);
          setContacts(data.data);
        } else {
          navigate('/avatar');
        }
      }
    };
    fetchUserData();
  }, [currentUser, navigate]);

  const handleChatChange = (chat) => {
    setCurrentChat(chat);
    dispatch(fetchMessages(currentUser._id, chat._id));
  };

  useEffect(() => {
    if (socket.current) {
      socket.current.on('msg-recieve', (msg) => {
        dispatch(receiveMessage(msg));
      });
    }
  }, [dispatch]);

  return (
    <>
      <div className="container-fluid vh-100 d-flex flex-column justify-content-center align-items-center bg-dark">
        <div className="row w-100 h-85">
          <div className="col-12 col-md-3">
            <Contacts contacts={contacts} currentUser={currentUser} changeChat={handleChatChange} />
          </div>
          <div className="col-12 col-md-9">
            {isLoaded && currentChat === undefined ? (
              <Welcome currentUser={currentUser} />
            ) : (
              <ChatContainer
                currentChat={currentChat}
                currentUser={currentUser}
                socket={socket}
                messages={messagesState.messages}
                sendMessage={(messageData) => dispatch(sendMessage(messageData))}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Chat;
