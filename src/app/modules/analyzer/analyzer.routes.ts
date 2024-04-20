import express from 'express';
import { AnalyzerController } from './analyzer.controller';
import validateRequest from '../../middlewares/validateRequest';
import { AnalyzerValidation } from './analyzer.validation';

const router = express.Router();

router.post(
  '/',
  validateRequest(AnalyzerValidation.insertText),
  AnalyzerController.addText
);

router.get(
  '/',
  AnalyzerController.getAllText
);

router.get(
  '/words',
  AnalyzerController.countWords
)

export const AnalyzerRoutes = router;