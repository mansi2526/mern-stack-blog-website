const express = require("express");
const router = express.Router();
const Categories = require("../models/category");

//create a category
router.post("/", async (req, res)=>{
    const newCategory = new Categories(req.body);
    try{
       const savedCategory = await newCategory.save();
       res.status(200).json(savedCategory);
    }catch(error){
        res.status(500).json(error)
    }
});

//get all categories
router.get("/", async (req, res)=>{
    try{
       const cats = await Categories.find();
       res.status(200).json(cats);
    }catch(error){
        res.status(500).json(error)
    }
});

module.exports = router;