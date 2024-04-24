import {model, Schema} from 'mongoose';
import {AnalyzerModel, IAnalyzer} from './analyzer.interface';

export const textAnalyzerSchema = new Schema({
    email: {type: String, required: true},
    text: {
      type: String,
      required: true
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true
    }
  });

export const TextAnalyzer = model<IAnalyzer, AnalyzerModel>('Analyzer', textAnalyzerSchema);