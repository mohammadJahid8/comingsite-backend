import express from 'express';

import auth from '../../middlewares/auth.js';
import { ContactController } from './contact.controller.js';

const router = express.Router();

router.post('/', ContactController.createContact);
router.get('/', ContactController.getAllContacts);

router.delete('/delete/:id', auth('admin'), ContactController.deleteContact);

export const ContactRoutes = router;
