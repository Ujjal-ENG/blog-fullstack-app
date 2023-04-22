/* eslint-disable indent */
const mongoose = require('mongoose');

const blogModel = require('../model/blogsModel');
// get all blogs
exports.getAllBlogs = (req, res) => {
    res.send('get all blogs');
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
