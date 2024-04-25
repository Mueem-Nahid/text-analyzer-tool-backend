import { TextAnalyzer } from './analyzer.model';
import {
  analyzeReport,
  analyzeTextInChunks,
  countCharacters,
  countParagraphs,
  countSentences,
  countWords,
  elapsedTime,
  findLongestWords,
} from './analyzer.utils';
import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';
import NodeCache from "node-cache";

const cache = new NodeCache();
const CHUNK_SIZE = 20000;
const CACHE_TTL = 3600; // 1 hour

const insertText = async (payload: { text: string; email: string }) => {
  return await TextAnalyzer.create(payload);
};

const getAllText = async (email: string) => {
  return TextAnalyzer.find({
    email,
  });
};

const getSingleText = async (id: string, email: string) => {
  const result = TextAnalyzer.findOne({ _id: id, email });
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Text not found.');
  }
  return result;
};

const countWordsFromDB = async (id: string, email: string) => {
  const startTime = performance.now();
  const text = await getSingleText(id, email);
  if (text) {
    let count;
    console.log(text.text.length, 'text.text.length');
    if (text.text.length > CHUNK_SIZE) {
      count = await analyzeTextInChunks(text.text, CHUNK_SIZE, 'countWords');
    } else {
      count = countWords(text.text);
    }

    return {
      text,
      count,
      analysisTime: elapsedTime(startTime),
    };
  } else {
    throw new ApiError(httpStatus.BAD_REQUEST, 'No text found');
  }
};

const countCharactersFromDB = async (id: string, email: string) => {
  const startTime = performance.now();
  const text = await getSingleText(id, email);
  if (text) {
    let count;
    console.log(text.text.length, 'text.text.length');
    if (text.text.length > CHUNK_SIZE) {
      count = await analyzeTextInChunks(
        text.text,
        CHUNK_SIZE,
        'countCharacters'
      );
    } else {
      count = countCharacters(text.text);
    }

    return {
      text,
      count,
      analysisTime: elapsedTime(startTime),
    };
  } else {
    throw new ApiError(httpStatus.BAD_REQUEST, 'No text found');
  }
};

const countSentencesFromDB = async (id: string, email: string) => {
  const startTime = performance.now();
  const text = await getSingleText(id, email);
  if (text) {
    let count;
    console.log(text.text.length, 'text.text.length');
    if (text.text.length > CHUNK_SIZE) {
      count = await analyzeTextInChunks(
        text.text,
        CHUNK_SIZE,
        'countSentences'
      );
    } else {
      count = countSentences(text.text);
    }

    return {
      text,
      count,
      analysisTime: elapsedTime(startTime),
    };
  } else {
    throw new ApiError(httpStatus.BAD_REQUEST, 'No text found');
  }
};

const countParagraphsFromDB = async (id: string, email: string) => {
  const startTime = performance.now();
  const text = await getSingleText(id, email);
  if (text) {
    let count;
    console.log(text.text.length, 'text.text.length');
    if (text.text.length > CHUNK_SIZE) {
      count = await analyzeTextInChunks(
        text.text,
        CHUNK_SIZE,
        'countParagraphs'
      );
    } else {
      count = countParagraphs(text.text);
    }

    return {
      text,
      count,
      analysisTime: elapsedTime(startTime),
    };
  } else {
    throw new ApiError(httpStatus.BAD_REQUEST, 'No text found');
  }
};

const countLongestWordsFromDB = async (id: string, email: string) => {
  const startTime = performance.now();
  const text = await getSingleText(id, email);
  if (text) {
    let longestWords;
    console.log(text.text.length, 'text.text.length');
    if (text.text.length > CHUNK_SIZE) {
      longestWords = await analyzeTextInChunks(
        text.text,
        CHUNK_SIZE,
        'findLongestWords'
      );
    } else {
      longestWords = findLongestWords(text.text);
    }

    return {
      text,
      longestWords,
      analysisTime: elapsedTime(startTime),
    };
  } else {
    throw new ApiError(httpStatus.BAD_REQUEST, 'No text found');
  }
};

const deleteText = async (id: string, email: string) => {
  return TextAnalyzer.deleteOne({ _id: id, email });
};

const getReport = async (id: string, email: string) => {
  const cacheKey = `${email}-${id}`;
  const cachedReport = cache.get(cacheKey);
  console.log("cache: ", cachedReport)
  if (cachedReport) {
    return cachedReport;
  }

  const startTime = performance.now();
  const text = await getSingleText(id, email);

  if (!text) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'No text found');
  }

  const analyzeFunctions = [
    { func: 'countWords', title: 'words' },
    { func: 'countCharacters', title: 'characters' },
    { func: 'countSentences', title: 'sentences' },
    { func: 'countParagraphs', title: 'paragraphs' },
    { func: 'findLongestWords', title: 'longestWords' },
  ];

  const analyzePromises = analyzeFunctions.map(async ({ func, title }) => {
    if (text.text.length > CHUNK_SIZE) {
      const result = await analyzeTextInChunks(text.text, CHUNK_SIZE, func);
      return { [title]: result };
    } else {
      const result = analyzeReport(text.text, func);
      return { [title]: result };
    }
  });

  const results = await Promise.all(analyzePromises);

  const report = {
    ...Object.assign({}, ...results),
    analysisTime: elapsedTime(startTime),
  };

  // Cache the report
  cache.set(cacheKey, report, CACHE_TTL);

  return report;
};

export const AnalyzerService = {
  insertText,
  getAllText,
  getSingleText,
  countWordsFromDB,
  countCharactersFromDB,
  countSentencesFromDB,
  countParagraphsFromDB,
  countLongestWordsFromDB,
  deleteText,
  getReport,
};
