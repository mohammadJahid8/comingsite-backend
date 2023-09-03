import express from 'express';

import auth from '../../middlewares/auth.js';
import { PortfolioController } from './portfolio.controller.js';

const router = express.Router();

router.post('/', auth('admin'), PortfolioController.createPortfolio);
router.get('/:category', PortfolioController.getAllPortfolio);
router.get('/single/:id', PortfolioController.getPortfolioById);
router.patch('/update/:id', auth('admin'), PortfolioController.updatePortfolio);
router.delete(
  '/delete/:id',
  auth('admin'),
  PortfolioController.deletePortfolio,
);

export const PortfolioRoutes = router;
