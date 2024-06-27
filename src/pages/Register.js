import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux';
// import { register } from '../redux/actions/userActions';
import 'bootstrap/dist/css/bootstrap.min.css';
import { register } from '../store/User/Action';

function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.user);
  console.log(userState)

  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
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
    const { password, confirmPassword, username, email } = values;
    if (password !== confirmPassword) {
      toast.error("Password and confirm password should be same.", toastOptions);
      return false;
    } else if (username.length < 3) {
      toast.error("Username should be greater than 3 characters.", toastOptions);
      return false;
    } else if (password.length < 8) {
      toast.error("Password should be equal or greater than 8 characters.", toastOptions);
      return false;
    } else if (email === "") {
      toast.error("Email is required.", toastOptions);
      return false;
    }
    return true;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (handleValidation()) {
      dispatch(register(values));
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
            <h1>watsupp</h1>
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
              type="email"
              className="form-control"
              placeholder="Email"
              name="email"
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
          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              placeholder="Confirm Password"
              name="confirmPassword"
              onChange={(e) => handleChange(e)}
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">Create User</button>
          <div className="text-center mt-3">
            <span>
              Already have an account? <Link to="/login" className="text-primary">Login</Link>
            </span>
          </div>
        </form>
      </div>
      <ToastContainer />
    </>
  );
}

export default Register;
