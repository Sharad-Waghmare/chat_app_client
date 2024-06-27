import React from 'react';
import { Button } from 'react-bootstrap';
import { BiPowerOff } from "react-icons/bi";
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <Button variant="danger" onClick={handleClick}>
      <BiPowerOff size="1.3em" />
    </Button>
  );
};

export default Logout;
