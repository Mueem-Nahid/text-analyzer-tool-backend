import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { Request, Response } from 'express';
import { AnalyzerService } from './analyzer.service';

const addText = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const email =  req.user;
    const text = req.body.text;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const result = await AnalyzerService.insertText({email, text});

    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: 'Text inserted successfully !',
      data: result
    });
  }
);

const getAllText = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const email =  req.user;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const result = await AnalyzerService.getAllText(email);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'All texts fetched successfully !',
      data: result
    });
  }
);

const getSingleText = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const email =  req.user;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const result = await AnalyzerService.getSingleText(id, email);

    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: 'Text fetched successfully !',
      data: result
    });
  }
);

const countWords = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const email =  req.user;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const result = await AnalyzerService.countWordsFromDB(id, email);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Number of words fetched successfully !',
      data: result
    });
  }
);

const countCharacters = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const email =  req.user;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const result = await AnalyzerService.countCharactersFromDB(id, email);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Number of characters fetched successfully !',
      data: result
    });
  }
);

const countSentences = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const email =  req.user;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const result = await AnalyzerService.countSentencesFromDB(id, email);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Number of sentences fetched successfully !',
      data: result
    });
  }
);

const countParagraphs = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const email =  req.user;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const result = await AnalyzerService.countParagraphsFromDB(id, email);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Number of paragraphs fetched successfully !',
      data: result
    });
  }
);

const countLongestWords = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const email =  req.user;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const result = await AnalyzerService.countLongestWordsFromDB(id, email);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Longest characters fetched successfully !',
      data: result
    });
  }
);

const deleteText = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const email =  req.user;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const result = await AnalyzerService.deleteText(id, email);

    sendResponse(res, {
      statusCode: httpStatus.NO_CONTENT,
      success: true,
      message: 'Text deleted successfully !',
      data: result
    });
  }
);

const getReport = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const email =  req.user;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const result = await AnalyzerService.getReport(id, email);

    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: 'Text fetched successfully !',
      data: result
    });
  }
);

export const AnalyzerController = {
  addText,
  getAllText,
  getSingleText,
  countWords,
  countCharacters,
  countSentences,
  countParagraphs,
  countLongestWords,
  deleteText,
  getReport
};