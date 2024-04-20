import { IAnalyzer } from './analyzer.interface';
import { TextAnalyzer } from './analyzer.model';
import { countWords } from './analyzer.utils';
import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';

const insertText = async (payload: IAnalyzer) => {
  return await TextAnalyzer.create(payload);
};

const getAllText = async () => {
  return TextAnalyzer.findOne();
};

const countWordsFromDB = async () => {
  const text = await getAllText();
  if(text) {
    const count = countWords(text.text);
    return {
      text,
      count
    }
  } else {
    throw new ApiError(httpStatus.BAD_REQUEST, "No text found");
  }
};

export const AnalyzerService = {
  insertText,
  getAllText,
  countWordsFromDB
};