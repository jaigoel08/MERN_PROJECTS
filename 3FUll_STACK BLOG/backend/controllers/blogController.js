const Blog = require("../models/Blog");

exports.getBlogs = async (req, res, next) => {
  try {
    const blogs = await Blog.find();
    res.status(200).json({status: "success", blogs});
  } catch (error) {
    res.status(500).json({message: error.message});
  }
}

exports.createBlog = async (req, res, next) => {
  const {title, content, author} = req.body;
  console.log(title, content, author);
  try {
    const blog = new Blog({title, content, author});
    await blog.save();
    res.status(201).json({status: "success", blog});
  } catch (error) {
    res.status(500).json({message: error.message});
  }
}

exports.deleteBlog = async (req, res, next) => {
  const {id} = req.params;
  try {
    await Blog.findByIdAndDelete(id);
    res.status(200).json({status: "success", message: "Blog deleted successfully"});
  } catch (error) {
    res.status(500).json({message: error.message});
  }
}

exports.likeBlog = async (req, res, next) => {
  const {id} = req.params;
  try {
    const blog = await Blog.findById(id);
    if (!blog) {
      return res.status(404).json({status: "error", message: "Blog not found"});
    }
    blog.likes += 1;
    await blog.save();
    res.status(200).json({status: "success", blog});
  } catch (error) {
    res.status(500).json({message: error.message});
  }
}

exports.commentBlog = async (req, res, next) => {
  const {id} = req.params;
  const {username, content} = req.body;
  if (!id || !username || !content) {
    return res.status(400).json({status: "error", message: "Missing required fields"});
  }

  try {
    const blog = await Blog.findById(id);
    if (!blog) {
      return res.status(404).json({status: "error", message: "Blog not found"});
    }
    blog.comments.push({username, content});
    await blog.save();
    res.status(200).json({status: "success", blog});
  } catch (error) {
    res.status(500).json({message: error.message});
  }
}