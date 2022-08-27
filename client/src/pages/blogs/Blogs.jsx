import React from "react";
import Blog from "../../components/blog/Blog";
import Category from "../../components/category/Category";
import "../blogs/Blogs.css";

const Blogs = ({posts}) => {
  return (
    <div className="blogs container-fluid">
      <div className="row d-flex justify-content-center">
      <div className="header col-6">
        <h1>Taking control of your daily life is easy when you know how!</h1>
      </div>
      </div>
      <div className="categories">
        <Category/>
      </div>
      <div className="latest-blogs">
        {posts.map(blogPost=>(

        <Blog post={blogPost}/>
        ))}
        
      </div>
    </div>
  );
};

export default Blogs;
