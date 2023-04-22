/* eslint-disable react/jsx-indent */
/* eslint-disable import/prefer-default-export */
/* eslint-disable comma-dangle */
import { createBrowserRouter } from 'react-router-dom';

import App from '../../App';
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
                element: <MyBlogs />
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
