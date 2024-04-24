import express from 'express';
import { AnalyzerController } from './analyzer.controller';
import validateRequest from '../../middlewares/validateRequest';
import { AnalyzerValidation } from './analyzer.validation';
import auth from "../../middlewares/auth";

const router = express.Router();

router.post(
  '/',
  validateRequest(AnalyzerValidation.insertText),
  auth(),
  AnalyzerController.addText
);

router.get(
  '/',
  auth(),
  AnalyzerController.getAllText
);

router.get(
  '/:id',
  auth(),
  AnalyzerController.getSingleText
);

router.get(
  '/:id/words',
  auth(),
  AnalyzerController.countWords
);

router.get(
  '/:id/characters',
  auth(),
  AnalyzerController.countCharacters
);

router.get(
  '/:id/sentences',
  auth(),
  AnalyzerController.countSentences
);

router.get(
  '/:id/paragraphs',
  auth(),
  AnalyzerController.countParagraphs
);

router.get(
  '/:id/longest-words',
  auth(),
  AnalyzerController.countLongestWords
);

router.delete(
  '/:id',
  auth(),
  AnalyzerController.deleteText
);


export const AnalyzerRoutes = router;