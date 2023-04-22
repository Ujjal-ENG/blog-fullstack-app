/* eslint-disable indent */
/* eslint-disable prettier/prettier */
const express = require('express');
const {
  getAllBlogs,
    createBlog,
    updateBlog,
    getBlogById,
    deleteBlog,
    singleUserAllBlog,
} = require('../controllers/blogsControllers');

const router = express.Router();

// routes
// get all blogs
router.get('/all-blogs', getAllBlogs);

// create blog
router.post('/create-blog', createBlog);

// update blog
router.patch('/update-blog/:id', updateBlog);

// single blog get
router.get('/get-blog/:id', getBlogById);

// delete blog
router.delete('/delete-blog/:id', deleteBlog);

// single user all blogs get using id
router.get('/user-blog/:id', singleUserAllBlog);

module.exports = router;
