import { NextFunction, Request, Response } from 'express';
import ApiError from '../../errors/ApiError';
import httpStatus from 'http-status';

const auth = () => async (req: Request, res: Response, next: NextFunction) => {
  // receiving all the values through rest operator
  try {
    const email: string | undefined = Array.isArray(req.headers?.email)
      ? req.headers?.email[0]
      : req.headers?.email;

    if (!email)
      throw new ApiError(
        httpStatus.UNAUTHORIZED,
        'You are not authorized to perform this action.'
      );

    req.user = email.toString();

    next();
  } catch (error) {
    next(error);
  }
};

export default auth;
