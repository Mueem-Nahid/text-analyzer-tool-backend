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
);

router.get(
  '/characters',
  AnalyzerController.countCharacters
);

router.get(
  '/sentences',
  AnalyzerController.countSentences
);

router.get(
  '/paragraphs',
  AnalyzerController.countParagraphs
);

router.get(
  '/longest-words',
  AnalyzerController.countLongestWords
)


export const AnalyzerRoutes = router;