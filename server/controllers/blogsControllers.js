/* eslint-disable prettier/prettier */
/* eslint-disable no-trailing-spaces */
/* eslint-disable comma-dangle */
/* eslint-disable no-underscore-dangle */
/* eslint-disable indent */

const mongoose = require('mongoose');
const blogModel = require('../model/blogsModel');
const userModel = require('../model/usersModel');
// get all blogs
exports.getAllBlogs = async (req, res) => {
    try {
        const blogs = await blogModel.find();
        if (!blogs) {
            res.status(200).json({
                message: 'No blogs found!!',
                success: true,
                results: blogs.length,
                data: blogs,
            });
        }
        res.status(200).json({
            message: 'Blogs are founded',
            success: true,
            results: blogs.length,
            data: blogs,
        });
    } catch (error) {
        res.status(500).json({
            message: error,
            success: false,
        });
    }
};
// create blog
exports.createBlog = async (req, res) => {
    try {
        // validation
        const {
 title, description, image, user 
} = req.body;
        if (!title || !description || !image || !user) {
            res.status(400).json({
                message: 'Please fillup the all given fields',
                success: false,
            });
        }

        // find the existing user
        const existingUser = await userModel.findById(user);
        // validation
        if (!existingUser) {
            res.status(404).json({
                success: false,
                message: 'unable to find user'
            });
        }
        
        // newBlog
        const newBlogs = await blogModel.create(req.body);
        const session = await mongoose.startSession();
        session.startTransaction();
        const blogId = newBlogs._id;

  await existingUser.updateOne({ $push: { blogs: blogId } }, { session });

  await session.commitTransaction();
        res.status(201).json({
            message: 'blog is created',
            success: true,
            data: newBlogs,
        });
    } catch (error) {
        res.status(500).json({
            message: error,
            success: false,
        });
    }
};
// update blog
exports.updateBlog = async (req, res) => {
    try {
        const updateBlog = await blogModel.findByIdAndUpdate(req.params.id, {
            new: true,
        });
        res.status(200).json({
            success: true,
            message: 'Blog is Updated',
            updateBlog,
        });
    } catch (error) {
        res.status(500).json({
            message: error,
            success: false,
        });
    }
};

// get blog by id
exports.getBlogById = async (req, res) => {
    try {
        const findOne = await blogModel.findById(req.params.id);
        res.status(200).json({
            success: true,
            message: 'Data is founded',
            findOne,
        });
    } catch (error) {
        res.status(500).json({
            message: error,
            success: false,
        });
    }
};

// delete blog by id
exports.deleteBlog = async (req, res) => {
    try {
        await blogModel.findByIdAndDelete(req.params.id);
        res.status(200).json({
            message: 'blog is deleted',
            success: true,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error,
        });
    }
};
