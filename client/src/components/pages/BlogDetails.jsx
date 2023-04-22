/* eslint-disable no-underscore-dangle */
/* eslint-disable object-curly-newline */
/* eslint-disable no-alert */
/* eslint-disable react/jsx-indent-props */
/* eslint-disable react/jsx-closing-bracket-location */
/* eslint-disable react/jsx-indent */
/* eslint-disable comma-dangle */

import { Box, Button, InputLabel, TextField, Typography } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useLoaderData, useNavigate } from 'react-router-dom';

function BlogDetails() {
    const loader = useLoaderData();

    const [inputs, setInputs] = useState({
        title: loader.findOne.title,
        description: loader.findOne.description,
        image: loader.findOne.image
    });
    const handleChange = (e) => {
        setInputs({
            ...inputs,
            [e.target.name]: e.target.value
        });
    };
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.patch(`http://localhost:8080/api/v1/blog/update-blog/${loader.findOne._id}`, {
                title: inputs.title,
                description: inputs.description,
                image: inputs.image,
                user: loader.findOne._id
            });
            if (data?.success) {
                toast.success('Blog is updated');
                navigate('/my-blogs');
            }
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <form onSubmit={handleSubmit}>
            <Box width="50%" border={3} borderRadius={10} padding={3} margin="auto" boxShadow="10px 10px 20px #ccc" display="flex" flexDirection="column" marginTop="30px">
                <Typography variant="h2" textAlign="center" fontWeight="bold" color="gray">
                    Update Your Blog here!!
                </Typography>

                <InputLabel
                    sx={{
                        mb: 1,
                        mt: 2,
                        fontSize: '24px',
                        fontWeight: 'bold'
                    }}>
                    Title
                </InputLabel>
                <TextField margin="normal" variant="outlined" value={inputs.title} name="title" onChange={handleChange} />

                <InputLabel
                    sx={{
                        mb: 1,
                        mt: 2,
                        fontSize: '24px',
                        fontWeight: 'bold'
                    }}>
                    Description
                </InputLabel>
                <TextField margin="normal" variant="outlined" value={inputs.description} name="description" onChange={handleChange} />

                <InputLabel
                    sx={{
                        mb: 1,
                        mt: 2,
                        fontSize: '24px',
                        fontWeight: 'bold'
                    }}>
                    Image
                </InputLabel>
                <TextField margin="normal" variant="outlined" value={inputs.image} name="image" onChange={handleChange} />

                <Button type="submit" sx={{ mt: 2 }} variant="contained">
                    Update Blog
                </Button>
            </Box>
        </form>
    );
}

export default BlogDetails;
