import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux';
// import { login } from '../redux/actions/userActions';
import 'bootstrap/dist/css/bootstrap.min.css';
import { login } from '../store/User/Action';

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.user);
  

  const [values, setValues] = useState({
    username: "",
    password: "",
  });

  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  useEffect(() => {
    if (userState.isAuthenticated) {
      navigate('/');
    }
  }, [userState, navigate]);

  const handleValidation = () => {
    const { password, username } = values;
    if (password === "") {
      toast.error("Password is required.", toastOptions);
      return false;
    } else if (username === "") {
      toast.error("Username is required.", toastOptions);
      return false;
    }
    return true;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (handleValidation()) {
      dispatch(login(values));
    }
  };

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  return (
    <>
      <div className="container d-flex flex-column justify-content-center align-items-center vh-100">
        <form className="p-4 p-md-5 bg-dark text-white rounded" onSubmit={(event) => handleSubmit(event)}>
          <div className="text-center mb-4">
            <h1>WhatsApp</h1>
          </div>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Username"
              name="username"
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              name="password"
              onChange={(e) => handleChange(e)}
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">Login</button>
          <div className="text-center mt-3">
            <span>
              Don't have an account? <Link to="/register" className="text-primary">Register</Link>
            </span>
          </div>
        </form>
      </div>
      <ToastContainer />
    </>
  );
}

export default Login;
