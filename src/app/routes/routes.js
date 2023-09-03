import express from 'express';

import { AdminRoutes } from '../modules/admin/admin.route.js';
import { BlogRoutes } from '../modules/blog/blog.route.js';
import { CategoryRoutes } from '../modules/category/category.route.js';
import { PortfolioRoutes } from '../modules/portfolio/portfolio.route.js';
import { ContactRoutes } from '../modules/contact/contact.route.js';
import { TeamRoutes } from '../modules/team/team.route.js';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/admin',
    route: AdminRoutes,
  },
  {
    path: '/blog',
    route: BlogRoutes,
  },
  {
    path: '/category',
    route: CategoryRoutes,
  },
  {
    path: '/portfolio',
    route: PortfolioRoutes,
  },
  {
    path: '/contact',
    route: ContactRoutes,
  },
  {
    path: '/team',
    route: TeamRoutes,
  },
];

moduleRoutes?.forEach(route => router.use(route.path, route.route));

export default router;
