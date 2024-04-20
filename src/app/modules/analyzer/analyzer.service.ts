import { IAnalyzer } from './analyzer.interface';
import { TextAnalyzer } from './analyzer.model';
import {
  analyzeTextInChunks,
  countCharacters,
  countParagraphs,
  countSentences,
  countWords,
  findLongestWords
} from './analyzer.utils';
import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';

const CHUNK_SIZE  = 1000;

const insertText = async (payload: IAnalyzer) => {
  return await TextAnalyzer.create(payload);
};

const getAllText = async () => {
  return TextAnalyzer.find();
};

const getSingleText = async (id: string) => {
  return TextAnalyzer.findById(id);
};

const countWordsFromDB = async (id: string) => {
  const startTime = performance.now(); // Start time
  const text = await getSingleText(id);
  if (text) {
    let count;
    if (text.text.length > CHUNK_SIZE) {
      count = await analyzeTextInChunks(text.text, CHUNK_SIZE, countWords);
    } else {
      count = countWords(text.text);
    }
    const elapsedTime = performance.now() - startTime; // Calculate elapsed time
    return {
      text,
      count,
      analysisTime: elapsedTime.toFixed(2)
    };
  } else {
    throw new ApiError(httpStatus.BAD_REQUEST, 'No text found');
  }
};

const countCharactersFromDB = async (id: string) => {
  const text = await getSingleText(id);
  if (text) {
    const count = countCharacters(text.text);
    return {
      text,
      count
    };
  } else {
    throw new ApiError(httpStatus.BAD_REQUEST, 'No text found');
  }
};

const countSentencesFromDB = async (id: string) => {
  const text = await getSingleText(id);
  if (text) {
    const count = countSentences(text.text);
    return {
      text,
      count
    };
  } else {
    throw new ApiError(httpStatus.BAD_REQUEST, 'No text found');
  }
};

const countParagraphsFromDB = async (id: string) => {
  const text = await getSingleText(id);
  if (text) {
    const count = countParagraphs(text.text);
    return {
      text,
      count
    };
  } else {
    throw new ApiError(httpStatus.BAD_REQUEST, 'No text found');
  }
};

const countLongestWordsFromDB = async (id: string) => {
  const text = await getSingleText(id);
  if (text) {
    const count = findLongestWords(text.text);
    return {
      text,
      count
    };
  } else {
    throw new ApiError(httpStatus.BAD_REQUEST, 'No text found');
  }
};

export const AnalyzerService = {
  insertText,
  getAllText,
  getSingleText,
  countWordsFromDB,
  countCharactersFromDB,
  countSentencesFromDB,
  countParagraphsFromDB,
  countLongestWordsFromDB
};