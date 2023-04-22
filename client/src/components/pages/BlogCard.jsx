/* eslint-disable comma-dangle */
/* eslint-disable react/jsx-closing-bracket-location */
/* eslint-disable max-len */
/* eslint-disable react/jsx-indent */
/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable react/jsx-indent-props */

import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import moment from 'moment';
import * as React from 'react';

export default function BlogCard({ data }) {
    const { title, image, description, createdAt } = data;
    return (
        <Card
            sx={{
                width: '40%',
                margin: 'auto',
                marginTop: 2,
                padding: 2,
                boxShadow: '5px 5px 10px #ccc'
            }}>
            <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                        {image}
                    </Avatar>
                }
                action={<IconButton aria-label="settings" />}
                title={title}
                subheader={moment(createdAt).format('LLL')}
            />
            <CardMedia component="img" height="194" image="/static/images/cards/paella.jpg" alt="Paella dish" />
            <CardContent>
                <Typography variant="body2" color="text.secondary">
                    {description}
                </Typography>
            </CardContent>
        </Card>
    );
}
