import React from "react";
import "../navbar/Navbar.css";
import { Link } from "react-router-dom";

//logo
import blogLogo from "../../assets/blogger.png";
import ProfileImg from "../../assets/profile-photo.webp";
import { useContext } from "react";
import { Context } from "../../context/Context";

const Navbar = () => {
  const {user, dispatch} = useContext(Context);
  const PF = "http://localhost:5001/images/";

  const handleLogout = () => {
    dispatch({type: "LOGOUT"})
  };

  return (
    <div className="container-fluid p-0">
      <div className="navbar row">
        <div className="col-12 p-4 d-flex justify-content-between align-items-center">
        <a href="">
          <img src={blogLogo} alt="" />
        </a>
        <div className="nav-options">
          <ul className="option d-flex m-0">
            <li className="nav-link active">
              <Link to="/" className="link">HOME</Link>
            </li>
            <li className="nav-link">
              <Link to='/about' className="link">ABOUT US</Link>
            </li>
            <li className="nav-link">
              <Link to='/create' className='link'>CREATE</Link>
            </li>
            <li className="nav-link" onClick={handleLogout}>
              {user && 'LOGOUT'}
            </li>
          </ul>
        </div>
        <div className="nav-profile">
          {user ? 
          <Link to='/settings' className="link">
            <img className="profile-pic" src={PF+user.profilePicture} alt=""/>
          </Link>
          :
              (<ul className="option d-flex">
                <li className="nav-link"><Link to="/login" className="link">LOGIN</Link></li>
                <li className="nav-link"><Link to="/register" className="link">REGISTER</Link></li>
              </ul>)}
          
        </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
