import express from 'express';
import { AdminController } from './admin.controller.js';
import auth from '../../middlewares/auth.js';

const router = express.Router();

router.post('/', auth('admin'), AdminController.createAdmin);
router.post('/login', AdminController.adminLogin);
router.get('/', auth('admin'), AdminController.getAllAdmins);
router.get('/profile', auth('admin'), AdminController.getAdminProfile);
router.patch('/update/:id', auth('admin'), AdminController.updateAdmin);
router.delete('/delete/:id', auth('admin'), AdminController.deleteAdmin);

export const AdminRoutes = router;
