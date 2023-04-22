/* eslint-disable no-underscore-dangle */
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import BlogCard from './BlogCard';

function Home() {
    const [blogs, setBlogs] = useState([]);

    const getAllBlogs = async () => {
        try {
            const { data } = await axios.get('https://the-blog-app.onrender.com/api/v1/blog/all-blogs');
            if (data?.success) {
                setBlogs(data?.data);
            }
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        getAllBlogs();
    }, []);
    return <div>{blogs && blogs.map((el) => <BlogCard key={el._id} data={el} isUser={localStorage.getItem('userId') === el.user._id} />)}</div>;
}

export default Home;
