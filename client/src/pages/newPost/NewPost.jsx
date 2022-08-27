import React from "react";
import "../newPost/NewPost.css";

import Add from "../../assets/plus.png";
import { useState } from "react";
import axios from "axios";
import { useContext } from "react";
import { Context } from "../../context/Context";

const api = axios.create({
  baseURL: `http://localhost:5001/api/`
});

const NewPost = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const {user} = useContext(Context);

  const [tags, setTags] = React.useState([])

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPost = {
      username: user.username,
      title,
      description,
    }
    if(file){
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      newPost.photo = filename;
      try{
        await api.post("/upload", data);
      }catch(err){
        console.log(err)
      }
    }
    try{
      const res = await api.post("/posts", newPost);
      window.location.replace("/posts/" + res.data._id);
    }catch(err){
      console.log(err)
    }
  };


 

  return (
    <div className="newPost">
      {file && 
      <img
      className="writeImg"
        src={URL.createObjectURL(file)}
        alt=""
      />
      }
      
      <form action="" className="writeForm" onSubmit={handleSubmit}>
        <div className="writeFormGroup d-grid">
          <label htmlFor="fileInput">
            <img src={Add} alt="" height="20" style={{ cursor: "pointer" }} />
          </label>
          <input type="file" id="fileInput" style={{ display: "none" }} onChange={(e)=>setFile(e.target.files[0])} />
          <input
            type="text"
            placeholder="Title"
            className="writeInput"
            autoFocus={true}
            onChange={e=>setTitle(e.target.value)}
          />
        </div>
        
        <div className="writeFormGroup ">
          <textarea
            placeholder="tell your story..."
            type="text"
            className="writeInput writeText"
            onChange={e=>setDescription(e.target.value)}
          ></textarea>
        </div>
        
        <button className="writeBtn" type="submit">Publish</button>
      </form>
    </div>
  );
};

export default NewPost;
