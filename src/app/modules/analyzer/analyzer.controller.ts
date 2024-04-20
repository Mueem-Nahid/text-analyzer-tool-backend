import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { Request, Response } from 'express';
import { AnalyzerService } from './analyzer.service';

const addText = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const result = await AnalyzerService.insertText(req.body);

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
    const result = await AnalyzerService.getAllText();

    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: 'All texts fetched successfully !',
      data: result
    });
  }
);

const countWords = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const result = await AnalyzerService.countWordsFromDB();

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Number of words fetched successfully !',
      data: result
    });
  }
);

export const AnalyzerController = {
  addText,
  getAllText,
  countWords,
};