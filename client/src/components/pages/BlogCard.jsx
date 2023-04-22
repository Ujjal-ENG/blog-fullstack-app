/* eslint-disable no-alert */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable object-curly-newline */
/* eslint-disable comma-dangle */
/* eslint-disable react/jsx-closing-bracket-location */
/* eslint-disable max-len */
/* eslint-disable react/jsx-indent */
/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable react/jsx-indent-props */

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Box } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import axios from 'axios';
import moment from 'moment';
import * as React from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export default function BlogCard({ isUser, data }) {
    const {
        title,
        image,
        description,
        createdAt,
        user: { userName },
        _id
    } = data;

    const navigate = useNavigate();
    const handleClickEdit = () => {
        navigate(`/blog-details/${_id}`);
    };

    const handleClickDelete = async () => {
        try {
            const { data } = await axios.delete(`http://localhost:8080/api/v1/blog/delete-blog/${_id}`);

            if (data?.success) {
                toast.success('Blog was deleted!!');
                window.location.reload();
            }
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <Card
            sx={{
                width: '40%',
                margin: 'auto',
                marginTop: 2,
                padding: 2,
                boxShadow: '5px 5px 10px #ccc'
            }}>
            {isUser && (
                <Box display="flex">
                    <IconButton onClick={handleClickEdit} sx={{ marginLeft: 'auto' }}>
                        <EditIcon color="info" />
                    </IconButton>
                    <IconButton onClick={handleClickDelete}>
                        <DeleteIcon color="error" />
                    </IconButton>
                </Box>
            )}
            <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                        {userName}
                    </Avatar>
                }
                action={<IconButton aria-label="settings" />}
                title={userName}
                subheader={moment(createdAt).format('LLL')}
            />
            <CardMedia component="img" image={image} alt="Paella dish" sx={{ height: 300, width: '100% ' }} />
            <CardContent>
                <Typography variant="h5">
                    Title:
                    {` ${title}`}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    <strong>Description:</strong> {`${description}`}
                </Typography>
            </CardContent>
        </Card>
    );
}
