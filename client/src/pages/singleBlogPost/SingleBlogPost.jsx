import React from "react";
import "../singleBlogPost/SingleBlogPost.css";
// import ProfileImg from "../../assets/profile-photo.webp";
import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { useContext } from "react";
import { Context } from "../../context/Context";

const api = axios.create({
  baseURL: `http://localhost:5001/api/`,
});

const SingleBlogPost = () => {
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const [post, setPost] = useState({});
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [updateMode, setUpdateMode] = useState(false);
  
  const {user} = useContext(Context);


  //for fetching image on screen
  const PF = "http://localhost:5001/images/";
  

  useEffect(() => {
    const fetchPost = async () => {
      const res = await api.get("/posts/" + path);
      setPost(res.data);
      setTitle(res.data.title);
      setDescription(res.data.description)
    };
    fetchPost();
  }, [path]);

  //delete post
  const handleDelete = async()=>{
    try{
      await api.delete(`/posts/${post._id}`, {
        data: {username: user.username}
      });
     window.location.replace("/");
    }catch(error){
      console.log(error);
    }
  }

  const handleUpdate = async () => {
    try{
      await api.put(`/posts/${post._id}`,
        {username: user.username, title, description}
      );
     setUpdateMode(false);
    }catch(error){
      console.log(error);
    }
  }

  return (
    <div className="singlePost">
      <div className="singlePostWrapper">
        {post.photo && (
          <img src={PF + post.photo} alt="" className="singlePostImg" />
        )}
        <div className="details">
        <span className="singlePostAuthor">
            Auther:
            <Link to={`/?user=${post.username}`} className="link">
              {post.profilePicture && 
            <img src={user.profilePicture} alt="" />
            }
              <b>{post.username}</b>
            </Link>
          </span>
          <span className="singlePostDate">
            Posted on: <b>{new Date(post.createdAt).toDateString()}</b> 
          </span>
        <div className="singlePostInfo">
          
          {post.username === user?.username &&
          <div className="singlePostEdit">
            <span className="singlePostIcon editBtn" onClick={()=>setUpdateMode(true)}>Edit</span>
            <span className="singlePostIcon deleteBtn" onClick={handleDelete}>Delete</span>
          </div>
          }
        </div>
        </div>
        {updateMode ? <input
        type="text"
        value={title}
        className="singlePostTitleInput"
        autoFocus
        onChange={(e)=> setTitle(e.target.value)}
        /> : (
          <>
        <h1 className="singlePostTitle">
          {title}
          </h1>
        
          </>
        )}
        {updateMode ?
        (<textarea className="singlePostDescInput" value={description} onChange={(e)=>setDescription(e.target.value)}/>)
        :
        (
        <p className="singlePostDesc">{description}</p>
        )}
        {updateMode &&
        <button className="singlePostBtn" onClick={handleUpdate}>Update</button>
        }
      </div>
    </div>
  );
};

export default SingleBlogPost;
