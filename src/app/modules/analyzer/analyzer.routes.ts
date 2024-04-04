import express from 'express';
import { AnalyzerController } from './analyzer.controller';
import { keycloak } from '../../../helpers/keycloak';

const router = express.Router();

router.post(
  '/',
  keycloak.protect(),
  AnalyzerController.addText
);

export const AnalyzerRoutes = router;