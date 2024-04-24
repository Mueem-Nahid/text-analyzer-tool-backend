import express, {Router} from 'express';
import {AnalyzerRoutes} from '../modules/analyzer/analyzer.routes';

const router = express.Router();

// application routes
const moduleRoutes: { path: string; route: Router }[] = [
  {
    path: '/analyzer',
    route: AnalyzerRoutes
  }
];

moduleRoutes.forEach(route => router.use(route.path, route.route));

export default router;
