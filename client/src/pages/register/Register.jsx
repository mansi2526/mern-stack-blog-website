import React, { useState } from 'react';
import '../register/Register.css';
import {Link} from 'react-router-dom';
import axios from 'axios';

const api = axios.create({
  baseURL: `http://localhost:5001/api/`
})

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(false);
    try{
      const res = await api.post("/auth/register", {
        username: username,
        email: email,
        password: password
      });
      res.data && window.location.replace("/login");
    }catch(error){
      setError(true);
    }
    console.log(error)
  }

  return (
    <div>
      <div className='register container-fluid'>
      <h1 className='registerTitle'>Register</h1>
      <form action=""
      className="registerForm"
      onSubmit={handleSubmit}>
        <label htmlFor="">Username</label>
        <input type="text"
        className='registerInput'
        placeholder='enter your username...'
        onChange={(event)=>setUsername(event.target.value)}
        />
        
        <label htmlFor="">Email</label>
        <input type="text"
        className='registerInput'
        placeholder='enter your email...'
        onChange={(event)=>setEmail(event.target.value)}
        />
        
        <label htmlFor="">Password</label>
        <input type="password"
        className='registerInput'
        placeholder='enter your password...'
        onChange={(event)=>setPassword(event.target.value)}
        />
        
        <button className='registerBtn'>
          <Link to="/register" className="link">Register</Link>
        </button>
      </form>
      <button className="registerLoginBtn">
        <Link to='/login' className="link">Login</Link>
      </button>
      {error && 
      <span style={{color: "red", marginTop: "10px"}}>something went wrong!</span>
      }
    </div>
    </div>
  )
}

export default Register
