import express from 'express';

import auth from '../../middlewares/auth.js';
import { BlogController } from './blog.controller.js';

const router = express.Router();

router.post('/', auth('admin'), BlogController.createBlog);
router.get('/top-blogs/:category', BlogController.topBlogsByView);
router.get('/single/:id', BlogController.getBlogById);
router.get('/:category', BlogController.getAllBlogs);
router.patch('/update/:id', auth('admin'), BlogController.updateBlog);
router.patch('/views/:id', BlogController.increaseBlogView);
router.delete('/delete/:id', auth('admin'), BlogController.deleteBlog);

export const BlogRoutes = router;
