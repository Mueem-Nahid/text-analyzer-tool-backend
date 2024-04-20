import { model, Schema } from 'mongoose';
import { AnalyzerModel, IAnalyzer } from './analyzer.interface';

export const textAnalyzerSchema = new Schema({
    text: {
      type: String,
      required: true
    },
    /*totalNumberOfWords: {
      type: Number
    },
    totalNumberOfCharacters: {
      type: Number
    },
    totalNumberOfSentences: {
      type: Number
    },
    totalNumberOfParagraphs: {
      type: Number
    },
    longestWordsInParagraphs: {
      type: String,
    }*/
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true
    }
  });

export const TextAnalyzer = model<IAnalyzer, AnalyzerModel>('Analyzer', textAnalyzerSchema);