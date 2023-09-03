import express from 'express';

import auth from '../../middlewares/auth.js';
import { CategoryController } from './category.controller.js';

const router = express.Router();

router.post('/', auth('admin'), CategoryController.createCategory);
router.get('/', auth('admin'), CategoryController.getAllCategories);
router.delete('/delete/:id', auth('admin'), CategoryController.deleteCategory);

export const CategoryRoutes = router;
