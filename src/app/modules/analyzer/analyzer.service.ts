import {TextAnalyzer} from './analyzer.model';
import {
  analyzeTextInChunks,
  countCharacters,
  countParagraphs,
  countSentences,
  countWords,
  elapsedTime,
  findLongestWords
} from './analyzer.utils';
import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';

const CHUNK_SIZE = 20000;

const insertText = async (payload: { text: string; email: string }) => {
  return await TextAnalyzer.create(payload);
};

const getAllText = async (email: string) => {
  return TextAnalyzer.find({
    email,
  });
};

const getSingleText = async (id: string, email: string) => {
  const result = TextAnalyzer.findOne({_id: id, email});
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, "Text not found.")
  }
  return result;
};

const countWordsFromDB = async (id: string, email: string) => {
  const startTime = performance.now();
  const text = await getSingleText(id, email);
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

const countCharactersFromDB = async (id: string, email: string) => {
  const startTime = performance.now();
  const text = await getSingleText(id, email);
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

const countSentencesFromDB = async (id: string, email: string) => {
  const startTime = performance.now();
  const text = await getSingleText(id, email);
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

const countParagraphsFromDB = async (id: string, email: string) => {
  const startTime = performance.now();
  const text = await getSingleText(id, email);
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

const countLongestWordsFromDB = async (id: string, email: string) => {
  const startTime = performance.now();
  const text = await getSingleText(id, email);
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

const deleteText = async (id: string, email: string) => {
  return TextAnalyzer.deleteOne({_id: id, email});
}

const getReport = async (id: string, email: string) => {
  const startTime = performance.now();
  const text = await getSingleText(id, email);
  if (text) {
    if (text.text.length > CHUNK_SIZE) {
      const words = await analyzeTextInChunks(text.text, CHUNK_SIZE, "countWords");
      const characters = await analyzeTextInChunks(text.text, CHUNK_SIZE, "countCharacters");
      const sentences = await analyzeTextInChunks(text.text, CHUNK_SIZE, "countSentences");
      const paragraphs = await analyzeTextInChunks(text.text, CHUNK_SIZE, "countParagraphs");
      const longestWords = await analyzeTextInChunks(text.text, CHUNK_SIZE, "findLongestWords");
     const longestWordsCount = longestWords.length;

      return {
        words,
        characters,
        sentences,
        paragraphs,
        longestWordsCount,
        analysisTime: elapsedTime(startTime)
      }
    } else {
      const words = countWords(text.text);
      const characters = countCharacters(text.text);
      const sentences = countSentences(text.text);
      const paragraphs = countParagraphs(text.text);
      const longestWords = findLongestWords(text.text)?.length;

      return {
        words,
        characters,
        sentences,
        paragraphs,
        longestWords,
        analysisTime: elapsedTime(startTime)
      }
    }
  } else {
    throw new ApiError(httpStatus.BAD_REQUEST, 'No text found');
  }
}

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
  getReport
};