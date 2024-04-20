import { IAnalyzer } from './analyzer.interface';
import { TextAnalyzer } from './analyzer.model';
import {
  analyzeTextInChunks,
  countCharacters,
  countParagraphs,
  countSentences,
  countWords, elapsedTime,
  findLongestWords
} from './analyzer.utils';
import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';

const CHUNK_SIZE  = 10000;

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
  const startTime = performance.now();
  const text = await getSingleText(id);
  if (text) {
    let count;
    console.log(text.text.length, "text.text.length");
    if (text.text.length > CHUNK_SIZE) {
      count = await analyzeTextInChunks(text.text, CHUNK_SIZE, "countWords");
    } else {
      count = countWords(text.text);
    }

    return {
      text,
      count,
      analysisTime: elapsedTime(startTime)
    };
  } else {
    throw new ApiError(httpStatus.BAD_REQUEST, 'No text found');
  }
};

const countCharactersFromDB = async (id: string) => {
  const startTime = performance.now();
  const text = await getSingleText(id);
  if (text) {
    let count;
    console.log(text.text.length, "text.text.length");
    if (text.text.length > CHUNK_SIZE) {
      count = await analyzeTextInChunks(text.text, CHUNK_SIZE, "countCharacters");
    } else {
      count = countCharacters(text.text);
    }

    return {
      text,
      count,
      analysisTime: elapsedTime(startTime)
    };
  } else {
    throw new ApiError(httpStatus.BAD_REQUEST, 'No text found');
  }
};

const countSentencesFromDB = async (id: string) => {
  const startTime = performance.now();
  const text = await getSingleText(id);
  if (text) {
    let count;
    console.log(text.text.length, "text.text.length");
    if (text.text.length > CHUNK_SIZE) {
      count = await analyzeTextInChunks(text.text, CHUNK_SIZE, "countSentences");
    } else {
      count = countSentences(text.text);
    }

    return {
      text,
      count,
      analysisTime: elapsedTime(startTime)
    };
  } else {
    throw new ApiError(httpStatus.BAD_REQUEST, 'No text found');
  }
};

const countParagraphsFromDB = async (id: string) => {
  const startTime = performance.now();
  const text = await getSingleText(id);
  if (text) {
    let count;
    console.log(text.text.length, "text.text.length");
    if (text.text.length > CHUNK_SIZE) {
      count = await analyzeTextInChunks(text.text, CHUNK_SIZE, "countParagraphs");
    } else {
      count = countParagraphs(text.text);
    }

    return {
      text,
      count,
      analysisTime: elapsedTime(startTime)
    };
  } else {
    throw new ApiError(httpStatus.BAD_REQUEST, 'No text found');
  }
};

const countLongestWordsFromDB = async (id: string) => {
  const startTime = performance.now();
  const text = await getSingleText(id);
  if (text) {
    let longestWords;
    console.log(text.text.length, "text.text.length");
    if (text.text.length > CHUNK_SIZE) {
      longestWords = await analyzeTextInChunks(text.text, CHUNK_SIZE, "findLongestWords");
    } else {
      longestWords = findLongestWords(text.text);
    }

    return {
      text,
      longestWords,
      analysisTime: elapsedTime(startTime)
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