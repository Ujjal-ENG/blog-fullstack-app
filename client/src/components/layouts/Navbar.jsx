/* eslint-disable object-curly-newline */
/* eslint-disable react/jsx-indent */
import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material';
import React from 'react';

function Navbar() {
    return (
        <AppBar position="sticky">
            <Toolbar>
                <Typography variant="h4">Blog App</Typography>
                <Box display="flex" marginLeft="auto">
                    <Button sx={{ margin: 1, color: 'white' }}>Login</Button>
                    <Button sx={{ margin: 1, color: 'white' }}>Register</Button>
                    <Button sx={{ margin: 1, color: 'white' }}>Logout</Button>
                </Box>
            </Toolbar>
        </AppBar>
    );
}

export default Navbar;
