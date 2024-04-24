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
  '/:id',
  AnalyzerController.getSingleText
);

router.get(
  '/:id/words',
  AnalyzerController.countWords
);

router.get(
  '/:id/characters',
  AnalyzerController.countCharacters
);

router.get(
  '/:id/sentences',
  AnalyzerController.countSentences
);

router.get(
  '/:id/paragraphs',
  AnalyzerController.countParagraphs
);

router.get(
  '/:id/longest-words',
  AnalyzerController.countLongestWords
);

router.delete(
  '/:id',
  AnalyzerController.deleteText
);


export const AnalyzerRoutes = router;