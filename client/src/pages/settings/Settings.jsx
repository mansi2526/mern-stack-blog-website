import React from 'react';
import '../settings/Settings.css';
// import ProfilePic from '../../assets/profile-photo.webp';
import profilePic from '../../assets/R.png';
import userImg from '../../assets/user.png';
import { useContext } from 'react';
import { Context } from '../../context/Context';
import { useState } from 'react';
import axios from 'axios';

const api = axios.create({
  baseURL: `http://localhost:5001/api/`
})

const Settings = () => {
  const [file, setFile] = useState(null);
  const [username, setUsername] = useState("");
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(false);

  const {user, dispatch} = useContext(Context);
  const PF = "http://localhost:5001/images/";

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({type: "UPDATE_START"})
    const updatedUser = {
      userId: user._id,
      username,
      email,
      password,
    }
    if(file){
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      updatedUser.profilePicture = filename;
      try{
        await api.post("/upload", data);
      }catch(err){
        console.log(err)
      }
    }
    try{
     const res = await api.put("/users/" + user._id, updatedUser);
     setSuccess(true);
    dispatch({type: "UPDATE_SUCCESS", payload: res.data})
    }catch(err){
    dispatch({type: "UPDATE_FAILURE"})
      console.log(err)
    }
  };


  return (
    <div className='settings container-fluid'>
      <div className="settingsWrapper">
        <div className="settingsTitle">
            <span className="settingsUpdateTitle">Update your account</span>
            <span className="settingsDeleteTitle">Delete your account</span>
        </div>
        {success &&
            <div className="success">
              <span>profile has been updated successfully!</span>
            </div>
            }
        <form action="" className="settingsForm" onSubmit={handleSubmit}>
            <label>Profile Pic</label>
            <div className="settingsProPic">
                <img src={file ? URL.createObjectURL(file) : PF + user.profilePicture} alt="" />
                <label htmlFor='fileInput'>
                    <img src={userImg} alt="" className='settingsProPicImg' />
                </label>
                <input type="file" id='fileInput' style={{display: "none"}} onChange={(e)=>setFile(e.target.files[0])}/>
            </div>
            <label htmlFor="">Username</label>
            <input type="text" placeholder={user.username}
            onChange={e=>setUsername(e.target.value)}/>
            <label htmlFor="">Email</label>
            <input type="email" placeholder={user.email}
            onChange={e=>setemail(e.target.value)}/>
            <label htmlFor="">Password</label>
            <input type="password"
            onChange={e=>setPassword(e.target.value)}/>
            <button className='settingsSubmit' type='submit'>Update</button>
            
        </form>
      </div>
    </div>
  )
}

export default Settings
