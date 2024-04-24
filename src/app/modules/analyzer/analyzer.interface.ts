import { textAnalyzerSchema } from './analyzer.model';
import { Model, InferSchemaType } from 'mongoose';

export type IAnalyzer = InferSchemaType<typeof textAnalyzerSchema>;

export type AnalyzerModel = Model<IAnalyzer, Record<string, unknown>>;
