import React from "react";
import "../home/Home.css";

//components
import Blogs from "../../pages/blogs/Blogs";
import { useState } from "react";
import { useEffect } from "react";

import axios from "axios";
import { useLocation } from "react-router-dom";


const api = axios.create({
  baseURL: `http://localhost:5001/api/`
})

const Home = () => {
  const [posts, setPosts] = useState([]);
  const {search} = useLocation();
  console.log(search);

  useEffect(()=>{
    const fetchPosts = async ()=>{
      const res = await api.get('/posts'+ search);
      setPosts(res.data);
    }
    fetchPosts();
  }, [search]);

  return (
    <div className="home">
      <Blogs posts={posts}/>
    </div>
  );
};

export default Home;
