/* eslint-disable no-underscore-dangle */
/* eslint-disable indent */
const mongoose = require('mongoose');

const blogModel = require('../model/blogsModel');
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
        const { title, description, image } = req.body;
        if (!title || !description || !image) {
            res.status(400).json({
                message: 'Please fillup the all given fields',
                success: false,
            });
        }

        // newBlog
        const newBlogs = await blogModel.create(req.body);
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
exports.deleteBlog = (req, res) => {
    res.send('delete blog by id');
};