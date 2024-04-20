import { IAnalyzer } from './analyzer.interface';
import { TextAnalyzer } from './analyzer.model';
import { countCharacters, countParagraphs, countSentences, countWords, findLongestWords } from './analyzer.utils';
import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';

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
  const text = await getSingleText(id);
  if (text) {
    const count = countWords(text.text);
    return {
      text,
      count
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