import React from "react";
import { Link } from "react-router-dom";
import "../blog/Blog.css";

const Blog = ({post}) => {
  const PF = "http://localhost:5001/images/";

  return (
    <div className="blog">
      <Link to={`/posts/${post._id}`} className='link'>
        {post.photo && 
      <img
        className="postImg"
        src={PF + post.photo}
        alt=""
      />
        }
      </Link>
      <div className="postInfo">
        <div className="postCats">
          {post.categories.map((category)=>(
          <span className="postCat">{category.name}</span>
          ))}
        </div>
        {/* <Link to={`post/${post._id}`}></Link> */}
        <span className="postTitle">
          <Link to={`/posts/${post._id}`} className='link'>{post.title}</Link>
        </span>
        <hr />
        <span className="postData">{new Date(post.createdAt).toDateString()}</span>
      </div>
      <p className="postDesc">
        {post.description}
      </p>
    </div>
  );
};

export default Blog;
