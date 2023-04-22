/* eslint-disable react/jsx-indent-props */
/* eslint-disable comma-dangle */
/* eslint-disable react/jsx-closing-bracket-location */
/* eslint-disable react/jsx-indent */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable no-underscore-dangle */
/* eslint-disable import/prefer-default-export */
import { Alert, AlertTitle } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import BlogCard from './BlogCard';

function MyBlogs() {
    const [blogs, setBlogs] = useState([]);

    // get user blogs
    const getUserBlog = async () => {
        try {
            const id = localStorage.getItem('userId');
            const { data } = await axios.get(`http://localhost:8080/api/v1/blog/user-blog/${id}`);
            if (data?.success) {
                setBlogs(data.userBlog.blogs);
            }
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        getUserBlog();
    }, []);

    return (
        <div>
            {blogs && blogs.length > 0 ? (
                blogs.map((el) => <BlogCard key={el._id} data={el} />)
            ) : (
                <Alert
                    severity="warning"
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '100vh'
                    }}>
                    <AlertTitle>Warning</AlertTitle>
                    You have not create <strong>any blog!</strong>
                </Alert>
            )}
        </div>
    );
}
export default MyBlogs;
