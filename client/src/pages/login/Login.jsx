import React from "react";
import "../login/Login.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { useRef } from "react";
import { useContext } from "react";
import { Context } from "../../context/Context";

const api = axios.create({
  baseURL: `http://localhost:5001/api/`,
});

const Login = () => {
  const userRef = useRef();
  const passwordRef = useRef();
  const {user, dispatch, isFetching} = useContext(Context);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await api.post("/auth/login", {
        username: userRef.current.value,
        password: passwordRef.current.value,
      });
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE" });
      console.log(err);
    }
  };

  return (
    <div className="login container-fluid">
      <h1 className="loginTitle">Login</h1>
      <form action="" className="loginForm" onSubmit={handleSubmit}>
        <label htmlFor="">Username</label>
        <input
          type="text"
          className="loginInput"
          placeholder="enter your username..."
          ref={userRef}
        />

        <label htmlFor="">Password</label>
        <input
          type="password"
          className="loginInput"
          placeholder="enter your password..."
          ref={passwordRef}
        />

        <button className="loginBtn" type="submit" disabled={isFetching}>
          Login
        </button>
      </form>
      <button className="loginRegisterBtn">
        <Link to="/register" className="link">
          Register
        </Link>
      </button>
    </div>
  );
};

export default Login;
