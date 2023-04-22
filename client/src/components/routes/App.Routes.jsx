/* eslint-disable react/jsx-indent */
/* eslint-disable import/prefer-default-export */
/* eslint-disable comma-dangle */
import { createBrowserRouter } from 'react-router-dom';

import App from '../../App';
import BlogDetails from '../pages/BlogDetails';
import Blog from '../pages/Blogs';
import CreateBlog from '../pages/CreateBlog';
import LoginPage from '../pages/Login&Register/LoginPage';
import RegisterPage from '../pages/Login&Register/RegisterPage';
import MyBlogs from '../pages/MyBlogs';
import PrivateRoute from './PrivateRoute';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                path: '/',
                element: <Blog />
            },
            {
                path: '/blogs',
                element: <Blog />
            },
            {
                path: '/my-blogs',
                element: (
                    <PrivateRoute>
                        <MyBlogs />
                    </PrivateRoute>
                )
            },
            {
                path: '/login',
                element: <LoginPage />
            },
            {
                path: '/register',
                element: <RegisterPage />
            },
            {
                path: '/blog-details/:id',
                element: (
                    <PrivateRoute>
                        <BlogDetails />
                    </PrivateRoute>
                ),
                loader: async ({ params }) => fetch(`https://the-blog-app.onrender.com/api/v1/blog/get-blog/${params.id}`)
            },
            {
                path: '/create-blog',
                element: (
                    <PrivateRoute>
                        <CreateBlog />
                    </PrivateRoute>
                )
            }
        ]
    }
]);
