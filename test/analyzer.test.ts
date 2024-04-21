import request from 'supertest';
import mongoose from 'mongoose';
import { TextAnalyzer } from '../src/app/modules/analyzer/analyzer.model';
import app from '../src/app';

beforeAll(async () => {
  const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/test';
  await mongoose.connect(mongoUri, {});
});

afterEach(async () => {
  await TextAnalyzer.deleteMany({});
});

afterAll(async () => {
  await mongoose.disconnect();
});

describe('Text Analyzer API', () => {
  let textId: string;

  it('should create a new text entry', async () => {
    const res = await request(app)
      .post('/api/v1/analyzer')
      .send({ text: 'The quick brown fox jumps over the lazy dog.' })
      .expect(201);

    expect(res.body.success).toBe(true);
    expect(res.body.data.text).toBe('The quick brown fox jumps over the lazy dog.');
    textId = res.body.data._id;
  });

  it('should get the number of words from a text', async () => {
    const res = await request(app)
      .get(`/api/v1/analyzer/${textId}/words`)
      .expect(200);
    console.log("res:",res);
    expect(res.body.success).toBe(true);
    expect(res.body.data.count).toBe(9);
  });

  it('should get the number of characters from a text', async () => {
    const res = await request(app)
      .get(`/api/v1/analyzer/${textId}/characters`)
      .expect(200);

    expect(res.body.success).toBe(true);
    expect(res.body.data.count).toBe(43);
  });

  it('should get the number of sentences from a text', async () => {
    const res = await request(app)
      .get(`/api/v1/analyzer/${textId}/sentences`)
      .expect(200);

    expect(res.body.success).toBe(true);
    expect(res.body.data.count).toBe(1);
  });

  it('should get the number of paragraphs from a text', async () => {
    const res = await request(app)
      .get(`/api/v1/analyzer/${textId}/paragraphs`)
      .expect(200);

    expect(res.body.success).toBe(true);
    expect(res.body.data.count).toBe(1);
  });

  it('should get the longest words in paragraphs from a text', async () => {
    const res = await request(app)
      .get(`/api/v1/analyzer/${textId}/longest-words`)
      .expect(200);

    expect(res.body.success).toBe(true);
    expect(res.body.data.longestWords).toEqual(['quick', 'brown', 'jumps', 'over', 'lazy']);
  });
});
