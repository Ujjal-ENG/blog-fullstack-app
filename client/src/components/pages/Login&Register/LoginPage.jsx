/* eslint-disable no-underscore-dangle */
/* eslint-disable no-alert */
/* eslint-disable react/jsx-closing-bracket-location */
/* eslint-disable react/jsx-indent-props */
/* eslint-disable comma-dangle */
/* eslint-disable object-curly-newline */
/* eslint-disable react/jsx-indent */
import { Box, Button, TextField, Typography } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { authActions } from '../../../redux/store';

function LoginPage() {
    const disPatch = useDispatch();
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
            const { data } = await axios.post('http://localhost:8080/api/v1/user/login', { userName: inputs.name, email: inputs.email, password: inputs.password });
            if (data.success) {
                localStorage.setItem('userId', data.data._id);
                disPatch(authActions.login());
                alert('User Login Successfully');
                navigate('/');
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
                <Typography variant="h4" fontWeight="bold" padding={2}>
                    Login
                </Typography>

                <TextField name="email" margin="normal" type="email" label="Email" variant="outlined" value={inputs.email} onChange={handleChange} required />
                <TextField name="password" margin="normal" type="password" label="Password" variant="outlined" value={inputs.password} onChange={handleChange} required />

                <Button variant="contained" type="submit" color="success" sx={{ borderRadius: 3 }}>
                    Login
                </Button>
                <Button LinkComponent={Link} to="/register" sx={{ marginTop: 2, border: '1px solid gray' }}>
                    Are you new? Please Register!!
                </Button>
            </Box>
        </form>
    );
}

export default LoginPage;
