import React, { useEffect } from 'react'
import { useState } from 'react';
import '../category/Category.css';
import axios from 'axios';
import { Link } from 'react-router-dom';

const api = axios.create({
  baseURL: `http://localhost:5001/api/`
})

const Category = () => {
  const [categories, setCategory] = useState([]);
  
  useEffect(()=>{
    const getCategory = async ()=>{
      const res = await api.get("/categories");
      setCategory(res.data);
    }
    getCategory();
  },[])

  return (
    <div className='categories'>
      <ul className='d-flex cat'>
        {categories.map((category)=>(
          <>
          {category ? (
          <Link to={`/?category=${category.name}`} className="link">
          <li>{category.name}</li>
          </Link>
          ) : (
            <h1>404 not found</h1>
          )}
          </>
        ))}
        </ul>
    </div>
  )
}

export default Category
