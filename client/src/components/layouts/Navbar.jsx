/* eslint-disable object-curly-newline */
/* eslint-disable react/jsx-indent */
import { AppBar, Box, Button, Tab, Tabs, Toolbar, Typography } from '@mui/material';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
    const [value, setValue] = useState(0);
    return (
        <AppBar position="sticky">
            <Toolbar>
                <Typography variant="h4">Blog App</Typography>
                <Box display="flex" marginLeft="auto" marginRight="auto">
                    <Tabs textColor="inherit" value={value} onChange={(e, val) => setValue(val)}>
                        <Tab label="Blogs" LinkComponent={Link} to="/blogs" />
                        <Tab label="My Blogs" LinkComponent={Link} to="/my-blogs" />
                    </Tabs>
                </Box>
                <Box display="flex" marginLeft="auto">
                    <Button LinkComponent={Link} to="/login" sx={{ margin: 1, color: 'white' }}>
                        Login
                    </Button>
                    <Button LinkComponent={Link} to="/register" sx={{ margin: 1, color: 'white' }}>
                        Register
                    </Button>
                    <Button sx={{ margin: 1, color: 'white' }}>Logout</Button>
                </Box>
            </Toolbar>
        </AppBar>
    );
}

export default Navbar;
