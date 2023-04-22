/* eslint-disable consistent-return */
/* eslint-disable new-cap */
/* eslint-disable new-cap */
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
        const blogs = await blogModel.find().populate('user');
        if (!blogs) {
            return res.status(200).json({
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
          return res.status(400).json({
                message: 'Please fillup the all given fields',
                success: false,
            });
        }

        // find the existing user
        const existingUser = await userModel.findById(user);
        // validation
        if (!existingUser) {
           return res.status(404).json({
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
        
       return res.status(201).json({
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
        const updatedBlog = await blogModel.findByIdAndUpdate(req.params.id, {
            title: req.body.title,
            description: req.body.description,
            image: req.body.image
        }, { new: true });
        
        if (!updatedBlog) {
            return res.status(404).json({
                success: false,
                message: 'Blog not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Blog is updated',
            updatedBlog,
        });
    } catch (error) {
        console.log(error);
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
      const deletedBlog = await blogModel.findByIdAndDelete(req.params.id);
      if (!deletedBlog) {
        return res.status(404).json({
          success: false,
          message: 'Blog not found',
        });
      }
      await userModel.findOneAndUpdate(
        { _id: deletedBlog.user },
        { $pull: { blogs: deletedBlog._id } }
      );
  
      res.status(200).json({
        message: 'Blog is deleted and removed from user',
        success: true,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        success: false,
        message: error,
      });
    }
};

// single user all blogs get
exports.singleUserAllBlog = async (req, res) => {
    try {
        const userBlog = await userModel.findById(req.params.id).populate('blogs');

        if (!userBlog) {
            return res.status(404).json({
                success: false,
                message: 'You have not created Any blogs yet now'
            });
        }

        res.status(200).json({
            success: true,
            message: 'User Blogs',
            userBlog
        });
    } catch (error) {
        return res.status(400).json({
            message: `Single User blog not get${error}`,
            success: false
        });
    }
};
