/* eslint-disable no-alert */
/* eslint-disable react/jsx-closing-bracket-location */
/* eslint-disable react/jsx-indent-props */
/* eslint-disable comma-dangle */
/* eslint-disable object-curly-newline */
/* eslint-disable react/jsx-indent */
import { Box, Button, TextField, Typography } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function RegisterPage() {
    const [inputs, setInputs] = useState({
        name: '',
        email: '',
        password: ''
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
            const { data } = await axios.post('http://localhost:8080/api/v1/user/register', { userName: inputs.name, email: inputs.email, password: inputs.password });
            if (data.success) {
                alert('User Register Successfully');
                navigate('/login');
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <Box
                maxWidth={450}
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                margin="auto"
                marginTop={5}
                boxShadow="10px 10px 20px #ccc"
                borderRadius={5}
                padding={3}>
                <Typography variat="h4" fontWeight="bold" padding={2}>
                    Register
                </Typography>
                <TextField name="name" margin="normal" type="text" label="Name" variant="outlined" value={inputs.name} onChange={handleChange} required />
                <TextField name="email" margin="normal" type="email" label="Email" variant="outlined" value={inputs.email} onChange={handleChange} required />
                <TextField name="password" margin="normal" type="password" label="Password" variant="outlined" value={inputs.password} onChange={handleChange} required />

                <Button variant="contained" type="submit" color="success" sx={{ borderRadius: 3 }}>
                    Register
                </Button>
                <Button LinkComponent={Link} to="/login" sx={{ marginTop: 2, border: '1px solid gray' }}>
                    Already Register? Please Login!!
                </Button>
            </Box>
        </form>
    );
}

export default RegisterPage;
