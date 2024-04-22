import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import {Request, Response} from 'express';
import {AuthService} from "./auth.service";

const signup = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    const {username, email, password} = req.body;
    const result = await AuthService.signup({username, email, password});
    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: 'User created successfully !',
      data: result,
    });
  }
);

const signin = catchAsync(
  async (req: Request, res: Response): Promise<void> => {
    console.log(req.body, "req");
    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: 'User logged in successfully !',
      data: {},
    });
  }
);

export const AuthController = {
  signup,
  signin
};