import express, { Router } from 'express';
import { AnalyzerRoutes } from '../modules/analyzer/analyzer.routes';
import { AuthRoutes } from '../modules/auth/auth.routes';

const router = express.Router();

// application routes
const moduleRoutes: { path: string; route: Router }[] = [
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/analyzer',
    route: AnalyzerRoutes
  }
];

moduleRoutes.forEach(route => router.use(route.path, route.route));

export default router;
