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
