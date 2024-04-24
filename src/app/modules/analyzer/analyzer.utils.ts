import { Worker } from 'worker_threads';
import path from 'path';

export const countWords = (text: string): number => {
  return text.split(/\s+/).filter(Boolean).length;
};

export const countCharacters = (text: string): number => {
  return text.replace(/\s+/g, '').length;
};

export const countSentences = (text: string): number => {
  return text.split(/[.!?]+/).filter(Boolean).length;
};

export const countParagraphs = (text: string): number => {
  return text.split(/\n/).filter(Boolean).length;
};

export const findLongestWords = (text: string): string[] => {
  const paragraphs = text.split('\n');
  const longestWords: string[] = [];

  for (const paragraph of paragraphs) {
    const words = paragraph.split(/\s+/);
    let longestWord = '';

    for (const word of words) {
      const cleanedWord = word.replace(/[.,!?]/g, '');
      if (cleanedWord.length > longestWord.length) {
        longestWord = cleanedWord;
      }
    }

    longestWords.push(longestWord);
  }

  return longestWords;
};

export const elapsedTime = (startTime: number) => {
  const elapsedTime = performance.now() - startTime;
  return elapsedTime.toFixed(2);
};

export const analyzeTextInChunks = (text: string, chunkSize: number, functionName: string): Promise<{
  wordCount: number,
  characterCount: number
}> => {
  const workerPath = path.resolve(__dirname, 'analyzer.worker.ts');
  return new Promise((resolve, reject) => {
    const worker = new Worker(workerPath, { workerData: { text, chunkSize, functionName } });

    worker.on('message', (message) => {
      resolve(message);
    });

    worker.on('error', (error) => {
      reject(error);
    });
  });
};

export const analyzeReport = (text: string, functionName: string) => {
  switch (functionName) {
    case 'countWords':
      return countWords(text);
    case 'countCharacters':
      return countCharacters(text);
    case 'countSentences':
      return countSentences(text);
    case 'countParagraphs':
      return countParagraphs(text);
    case 'findLongestWords':
      return findLongestWords(text);
    default:
      throw new Error('Invalid function name');
  }
};