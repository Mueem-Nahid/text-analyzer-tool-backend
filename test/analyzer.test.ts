// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import request from 'supertest';
import mongoose from 'mongoose';
import app from '../src/app';
import {
  afterAll,
  beforeAll,
  beforeEach,
  describe,
  expect,
  it,
} from '@jest/globals';
import { TextAnalyzer } from '../src/app/modules/analyzer/analyzer.model';

beforeAll(async () => {
  const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/test';
  await mongoose.connect(mongoUri, {});
});

/*afterEach(async () => {
  await TextAnalyzer.deleteMany({});
});*/

afterAll(async () => {
  await mongoose.disconnect();
});

describe('Text Analyzer API', () => {
  let textId: string;
  const mockTexts = [
    {
      text: 'Sample text 1',
      email: 'test1@example.com',
    },
    {
      text: 'Sample text 2',
      email: 'test2@example.com',
    },
  ];

  beforeEach(async () => {
    // await TextAnalyzer.deleteMany({});
    await TextAnalyzer.create(mockTexts);
  });

  it('should get all texts for a user', async () => {
    const res = await request(app)
      .get('/api/v1/analyzer')
      .set('email', 'test1@example.com')
      .expect(200);

    expect(res.body.success).toBe(true);
    expect(res.body.message).toBe('All texts fetched successfully !');
    expect(res.body.data).toHaveLength(1);
    expect(res.body.data[0].text).toBe('Sample text 1');
  });

  it('should return empty array if no texts found for a user', async () => {
    const res = await request(app)
      .get('/api/v1/analyzer')
      .set('email', 'test3@example.com')
      .expect(200);

    expect(res.body.success).toBe(true);
    expect(res.body.message).toBe('All texts fetched successfully !');
    expect(res.body.data).toHaveLength(0);
  });

  it('should create a new text entry', async () => {
    const res = await request(app)
      .post('/api/v1/analyzer')
      .set('email', 'test@example.com')
      .send({
        text: 'The quick brown fox jumps over the lazy dog. The lazy dog slept in the sun.',
      })
      .expect(201);

    expect(res.body.success).toBe(true);
    expect(res.body.data.text).toBe(
      'The quick brown fox jumps over the lazy dog. The lazy dog slept in the sun.'
    );
    textId = res.body.data._id;
  });

  it('should get specific text for user', async () => {
    const res = await request(app)
      .get(`/api/v1/analyzer/${textId}`)
      .set('email', 'test@example.com')
      .expect(200);
    expect(res.body.success).toBe(true);
    expect(res.body.message).toBe('Text fetched successfully !');
    expect(res.body.data.text).toBe(
      'The quick brown fox jumps over the lazy dog. The lazy dog slept in the sun.'
    );
  });

  it('should get the number of words from a text', async () => {
    const res = await request(app)
      .get(`/api/v1/analyzer/${textId}/words`)
      .set('email', 'test@example.com')
      .expect(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.count).toBe(16);
  });

  it('should get the number of characters from a text', async () => {
    const res = await request(app)
      .get(`/api/v1/analyzer/${textId}/characters`)
      .set('email', 'test@example.com')
      .expect(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.count).toBe(60);
  });

  it('should get the number of sentences from a text', async () => {
    const res = await request(app)
      .get(`/api/v1/analyzer/${textId}/sentences`)
      .set('email', 'test@example.com')
      .expect(200);

    expect(res.body.success).toBe(true);
    expect(res.body.data.count).toBe(2);
  });

  it('should get the number of paragraphs from a text', async () => {
    const res = await request(app)
      .get(`/api/v1/analyzer/${textId}/paragraphs`)
      .set('email', 'test@example.com')
      .expect(200);

    expect(res.body.success).toBe(true);
    expect(res.body.data.count).toBe(1);
  });

  it('should get the longest words in paragraphs from a text', async () => {
    const res = await request(app)
      .get(`/api/v1/analyzer/${textId}/longest-words`)
      .set('email', 'test@example.com')
      .expect(200);

    expect(res.body.success).toBe(true);
    expect(res.body.data.longestWords).toEqual(['quick']);
  });
});
