import { parentPort, workerData } from 'worker_threads';
import { countCharacters, countWords, countSentences, countParagraphs, findLongestWords } from './analyzer.utils';

const { text, chunkSize, functionName } = workerData;

const analyzeChunk = (text: string, functionName: string) => {
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

let count = 0;
let str: unknown[];

const promises = [];
for (let i = 0; i < text.length; i += chunkSize) {
  const chunk = text.substring(i, i + chunkSize);
  promises.push(new Promise((resolve) => {
    resolve(analyzeChunk(chunk, functionName));
  }));
}

/*for (let i = 0; i < text.length; i += chunkSize) {
  const chunk = text.substring(i, i + chunkSize);
  if (functionName !== 'findLongestWords') {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    count += analyzeChunk(chunk, functionName);
  } else {
    str = analyzeChunk(chunk, functionName);
  }
}*/

Promise.all(promises)
  .then((results) => {
    if (functionName !== 'findLongestWords') {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      count = results.reduce((acc, cur) => acc + cur, 0); // Sum counts
    } else {
      str = results.flat();
    }
    parentPort?.postMessage(count ? count : str);
  })
  .catch((error) => {
    parentPort?.postMessage({ error });
  });

