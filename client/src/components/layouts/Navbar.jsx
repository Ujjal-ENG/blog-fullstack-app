/* eslint-disable no-alert */
/* eslint-disable object-curly-newline */
/* eslint-disable react/jsx-indent */
import { AppBar, Box, Button, Tab, Tabs, Toolbar, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { authActions } from '../../redux/store';

function Navbar() {
    // maintain the global state
    const isLogin = useSelector((state) => state.isLogin);
    const disPatch = useDispatch();
    const [value, setValue] = useState();
    const navigate = useNavigate();
    const handleLogout = () => {
        try {
            disPatch(authActions.logout());
            alert('Logout SuccessFully!!');
            navigate('/login');
            localStorage.clear('userId');
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <AppBar position="sticky">
            <Toolbar>
                <Typography variant="h4">Blog App</Typography>
                {isLogin && (
                    <Box display="flex" marginLeft="auto" marginRight="auto">
                        <Tabs textColor="inherit" value={value} onChange={(e, val) => setValue(val)}>
                            <Tab label="Blogs" LinkComponent={Link} to="/blogs" />
                            <Tab label="My Blogs" LinkComponent={Link} to="/my-blogs" />
                        </Tabs>
                    </Box>
                )}
                <Box display="flex" marginLeft="auto">
                    {!isLogin && (
                        <>
                            <Button LinkComponent={Link} to="/login" sx={{ margin: 1, color: 'white' }}>
                                Login
                            </Button>
                            <Button LinkComponent={Link} to="/register" sx={{ margin: 1, color: 'white' }}>
                                Register
                            </Button>
                        </>
                    )}
                    {isLogin && (
                        <>
                            <Button LinkComponent={Link} to="/create-blog" sx={{ margin: 1, color: 'white' }}>
                                Create Blog
                            </Button>
                            <Button sx={{ margin: 1, color: 'white' }} onClick={handleLogout}>
                                Logout
                            </Button>
                        </>
                    )}
                </Box>
            </Toolbar>
        </AppBar>
    );
}

export default Navbar;
