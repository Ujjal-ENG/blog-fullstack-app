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
exports.createBlog = (req, res) => {
    res.send('create blogs');
};
// update blog
exports.updateBlog = (req, res) => {
    res.send('Update Blog');
};

// get blog by id
exports.getBlogById = (req, res) => {
    res.send('get blog by id');
};

// delete blog by id
exports.deleteBlog = (req, res) => {
    res.send('delete blog by id');
};
