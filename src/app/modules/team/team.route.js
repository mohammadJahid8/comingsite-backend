import express from 'express';

import auth from '../../middlewares/auth.js';
import { TeamController } from './team.controller.js';

const router = express.Router();

router.post('/', auth('admin'), TeamController.createTeamMember);
router.get('/', TeamController.getAllTeamMembers);
router.patch('/update/:id', auth('admin'), TeamController.updateTeamMember);
router.delete('/delete/:id', auth('admin'), TeamController.deleteTeamMember);

export const TeamRoutes = router;
