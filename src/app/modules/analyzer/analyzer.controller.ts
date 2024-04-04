import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { Request, Response } from 'express';

const addText = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    console.log(req.body, "req");
    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: 'Student created successfully !',
      data: {},
    });
  }
);

export const AnalyzerController = {
  addText
};