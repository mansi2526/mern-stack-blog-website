const express = require("express");
const router = express.Router();
const Post = require("../models/post");
const User = require("../models/user");

//Create a new post
router.post("/", async (req, res) => {
  const newPost = new Post(req.body);
  try {
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (error) {
    res.status(500).json(error);
  }
});

//update a post
router.put("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.username === req.body.username) {
      try {
        const updatedPost = await Post.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );
        res.status(200).json(updatedPost);
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(401).json("You can update only your post!");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//delete a post
router.delete("/:id", async (req, res) => {
  try {
    const deletePost = await Post.findByIdAndDelete(req.params.id);
    if (deletePost.username === req.body.username) {
      try {
        await deletePost.delete();
        res.status(200).json("The post has been deleted");
      } catch (error) {
        res.status(500).json(error);
      }
    } else {
      res.status(401).json("You can delete only your post!");
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

//Get post
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json(error);
  }
});

//Get all post
router.get("/", async (req,res)=>{
    const username = req.query.user;
    const categoryName = req.query.cartegory;
    try{
        let posts;
        if(username){
            posts = await Post.find({
                username
            })
        } else if(categoryName){
            posts = await Post.find({
                categories: {
                    $in: [categoryName]
                }
            })
        }else{
            posts = await Post.find();
        }
        res.status(200).json(posts);
    }catch(error){
        res.status(500).json(error);
    }
})

module.exports = router;
