/* eslint-disable object-curly-newline */
/* eslint-disable no-alert */
/* eslint-disable react/jsx-indent-props */
/* eslint-disable react/jsx-closing-bracket-location */
/* eslint-disable react/jsx-indent */
/* eslint-disable comma-dangle */
import { Box, Button, InputLabel, TextField, Typography } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function CreateBlog() {
    const navigate = useNavigate();
    const id = localStorage.getItem('userId');
    const [inputs, setInputs] = useState({
        title: '',
        description: '',
        image: ''
    });

    const handleChange = (e) => {
        setInputs({
            ...inputs,
            [e.target.name]: e.target.value
        });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post('http://localhost:8080/api/v1/blog/create-blog', { title: inputs.title, description: inputs.description, image: inputs.image, user: id });

            if (data?.success) {
                alert('Blog is Created!!');
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
                    Create Your own Blog here!!
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
                    Create Blog
                </Button>
            </Box>
        </form>
    );
}

export default CreateBlog;
